import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import { checkJavaVersion, isJavaVersionCompatible } from './java-detector'
import { checkForgeVersion, isForgeVersionCompatible } from './forge-detector'
import { downloadMods } from './mods-downloader'
import { checkMods } from './mods-detector'
import { existsSync, unlinkSync } from 'fs'
import os from 'os'

// Importar Store dinámicamente
let store

async function initStore() {
  const Store = (await import('electron-store')).default
  store = new Store()
}

function getMinecraftPath(...paths) {
  if (process.platform === 'win32') return join(process.env.APPDATA || '', ...paths)
  if (process.platform === 'darwin')
    return join(process.env.HOME || '', 'Library/Application Support/minecraft', ...paths)
  return join(process.env.HOME || '', '.minecraft', ...paths)
}

function sendProgressEvent(channel, payload) {
  try {
    const win = BrowserWindow.getAllWindows()[0]
    if (win?.webContents) win.webContents.send(channel, payload)
  } catch (e) {
    console.error('Progress event failed:', e)
  }
}

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    title: 'Crezty Launcher',
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => mainWindow.show())
  mainWindow.webContents.setWindowOpenHandler((d) => {
    shell.openExternal(d.url)
    return { action: 'deny' }
  })

  if (is.dev && process.env.ELECTRON_RENDERER_URL) {
    mainWindow.loadURL(process.env.ELECTRON_RENDERER_URL)
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

app.whenReady().then(async () => {
  // Inicializar store primero
  await initStore()

  electronApp.setAppUserModelId('com.electron')
  app.on('browser-window-created', (_, window) => optimizer.watchWindowShortcuts(window))

  ipcMain.handle('check-java', async () => {
    const java = await checkJavaVersion()
    return { ...java, compatible: java.installed ? isJavaVersionCompatible(java.version) : false }
  })

  ipcMain.handle('exit-app', () => {
    app.quit()
    return { ok: true }
  })

  ipcMain.handle('check-forge', async () => {
    const forge = await checkForgeVersion()
    return { ...forge, compatible: isForgeVersionCompatible(forge.status) }
  })

  ipcMain.handle('open-external', async (_, url) => {
    try {
      await shell.openExternal(url)
      return { ok: true }
    } catch (e) {
      return { ok: false, error: String(e) }
    }
  })

  ipcMain.handle('check-mods', async (_, s) => checkMods(s))

  ipcMain.handle('update-mods', async (_, shareUrl, items) => {
    const winChannel = 'mods-download-progress'

    const modsDir = getMinecraftPath('mods')

    for (const it of items) {
      if (!it.oldFilename) continue

      const type = it.installType
      const oldPath =
        type === 'shaderpack'
          ? getMinecraftPath('shaderpacks', it.oldFilename)
          : type === 'resourcepack'
            ? getMinecraftPath('resourcepacks', it.oldFilename)
            : join(modsDir, it.oldFilename)

      sendProgressEvent(winChannel, { type: 'delete-start', id: it.id, filename: it.oldFilename })

      if (existsSync(oldPath)) {
        try {
          unlinkSync(oldPath)
          sendProgressEvent(winChannel, {
            type: 'delete-complete',
            id: it.id,
            filename: it.oldFilename,
            ok: true
          })
        } catch (e) {
          sendProgressEvent(winChannel, {
            type: 'delete-complete',
            id: it.id,
            filename: it.oldFilename,
            ok: false,
            error: String(e)
          })
        }
      } else {
        sendProgressEvent(winChannel, {
          type: 'delete-complete',
          id: it.id,
          filename: it.oldFilename,
          ok: true,
          note: 'not-found'
        })
      }
    }

    const downloads = items.map((i) => ({
      id: i.id,
      filename: i.filename,
      installType: i.installType || 'mods'
    }))

    await downloadMods(shareUrl, downloads, (p) => sendProgressEvent(winChannel, p))
    return { ok: true }
  })

  ipcMain.handle('getSettings', () => {
    console.log('store items:', store.get('settings'))
    return store.get('settings')
  })

  ipcMain.handle('saveSettings', (_, settings) => {
    console.log('Saving settings:', settings)
    store.set('settings', settings)
    return { ok: true }
  })

  ipcMain.handle('getSystemRAM', async () => {
    const totalRAM = os.totalmem()
    return Math.round(totalRAM / 1024 ** 3)
  })

  ipcMain.on('ping', () => console.log('pong'))
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
