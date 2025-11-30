import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { autoUpdater } from 'electron-updater'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import { checkJavaVersion, isJavaVersionCompatible } from './java-detector'
import { checkForgeVersion, isForgeVersionCompatible } from './forge-detector'
import { downloadMods } from './mods-downloader'
import { checkMods } from './mods-detector'
import { checkConfigStatus, updateConfig } from './config-manager'
import { existsSync, unlinkSync, rmSync, readdirSync, readFileSync, writeFileSync } from 'fs'
import os from 'os'
import {
  getMinecraftPath as getMinecraftBasePath,
  getPathForInstallType as getInstallPath
} from './utils/paths.js'

// Importar Store dinámicamente
let store

async function initStore() {
  const Store = (await import('electron-store')).default
  store = new Store()
}

function getMinecraftPath(...paths) {
  return getMinecraftBasePath(paths.join('/'))
}

function getPathForInstallType(type, filename) {
  return getInstallPath(type, filename)
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
    icon,
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

// Auto-Updater Events
autoUpdater.on('checking-for-update', () => {
  sendProgressEvent('update-status', { status: 'checking' })
})

autoUpdater.on('update-available', (info) => {
  sendProgressEvent('update-status', { status: 'available', info })
})

autoUpdater.on('update-not-available', (info) => {
  sendProgressEvent('update-status', { status: 'not-available', info })
})

autoUpdater.on('error', (err) => {
  sendProgressEvent('update-status', { status: 'error', error: String(err) })
})

autoUpdater.on('download-progress', (progressObj) => {
  sendProgressEvent('update-status', { status: 'downloading', progress: progressObj })
})

autoUpdater.on('update-downloaded', (info) => {
  sendProgressEvent('update-status', { status: 'downloaded', info })
})

app.whenReady().then(async () => {
  // Inicializar store primero
  await initStore()

  electronApp.setAppUserModelId('com.electron')
  app.on('browser-window-created', (_, window) => optimizer.watchWindowShortcuts(window))

  // IPC for Auto-Updater
  ipcMain.handle('check-for-updates', () => {
    if (is.dev) {
      console.log('Skipping update check in dev mode')
      return { status: 'dev-mode' }
    }
    autoUpdater.checkForUpdatesAndNotify()
    return { status: 'checking' }
  })

  ipcMain.handle('quit-and-install', () => {
    autoUpdater.quitAndInstall()
  })

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

  ipcMain.handle('fetch-server-status', async (_, serverIp, serverPort) => {
    try {
      const https = await import('https')
      const url = `https://api.mcsrvstat.us/3/${serverIp}:${serverPort}`

      const options = {
        headers: {
          'User-Agent': 'Minecraft-Launcher/1.0 (Electron)'
        }
      }

      return new Promise((resolve) => {
        https
          .get(url, options, (res) => {
            let data = ''
            res.on('data', (chunk) => {
              data += chunk
            })
            res.on('end', () => {
              try {
                const parsed = JSON.parse(data)
                resolve({ ok: true, data: parsed })
              } catch (e) {
                console.error('Failed to parse server response. Raw data:', data)
                console.error('Failed to parse server response. Error:', e)
                resolve({
                  ok: false,
                  error: `API returned non-JSON response: ${data.substring(0, 100)}`
                })
              }
            })
          })
          .on('error', (err) => {
            console.error('Server status request error:', err)
            resolve({ ok: false, error: err.message })
          })
      })
    } catch (error) {
      console.error('Server status handler error:', error)
      return { ok: false, error: error.message }
    }
  })

  ipcMain.handle('update-mods', async (_, shareUrl, items) => {
    const winChannel = 'mods-download-progress'

    for (const it of items) {
      if (!it.oldFilename) continue

      const oldPath = getPathForInstallType(it.installType, it.oldFilename)

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

  ipcMain.handle('check-config', async () => {
    return await checkConfigStatus()
  })

  ipcMain.handle('update-config', async () => {
    const winChannel = 'config-update-progress'
    return await updateConfig((p) => sendProgressEvent(winChannel, p))
  })

  ipcMain.handle('getSettings', () => {
    return store.get('settings')
  })

  ipcMain.handle('saveSettings', async (_, settings) => {
    await new Promise((resolve) => {
      store.set('settings', settings)
      resolve()
    })
    return { ok: true }
  })

  ipcMain.handle('getSystemRAM', async () => {
    const totalRAM = os.totalmem()
    return Math.round(totalRAM / 1024 ** 3)
  })

  ipcMain.handle('repair-installation', async () => {
    const dirsToDelete = ['mods', 'config', 'shaderpacks', 'resourcepacks', 'kubejs']
    const minecraftDir = getMinecraftPath()

    // 1. Delete standard directories
    for (const dir of dirsToDelete) {
      const fullPath = join(minecraftDir, dir)
      if (existsSync(fullPath)) {
        try {
          rmSync(fullPath, { recursive: true, force: true })
          console.log('Deleted:', fullPath)
        } catch (e) {
          console.error('Failed to delete:', fullPath, e)
        }
      }
    }

    // 2. Delete Forge versions
    const versionsDir = join(minecraftDir, 'versions')
    if (existsSync(versionsDir)) {
      try {
        const dirs = readdirSync(versionsDir)
        for (const dir of dirs) {
          if (dir.toLowerCase().includes('forge')) {
            const fullPath = join(versionsDir, dir)
            rmSync(fullPath, { recursive: true, force: true })
            console.log('Deleted Forge version:', fullPath)
          }
        }
      } catch (e) {
        console.error('Failed to delete forge versions:', e)
      }
    }

    return { ok: true }
  })

  ipcMain.handle('update-launcher-profile', async (_, ram) => {
    try {
      const profilesPath = getMinecraftPath('launcher_profiles.json')
      if (!existsSync(profilesPath)) return { ok: false, error: 'File not found' }

      const content = JSON.parse(readFileSync(profilesPath, 'utf-8'))
      const profiles = content.profiles || {}

      let updated = false
      for (const key in profiles) {
        const profile = profiles[key]
        // Buscar perfil de Forge (contiene 'forge' en lastVersionId)
        if (profile.lastVersionId && profile.lastVersionId.toLowerCase().includes('forge')) {
          profile.javaArgs = `-Xmx${ram}G -XX:+UnlockExperimentalVMOptions -XX:+UseG1GC -XX:G1NewSizePercent=20 -XX:G1ReservePercent=20 -XX:MaxGCPauseMillis=50 -XX:G1HeapRegionSize=32M`
          updated = true
          console.log(`Updated profile ${key} with RAM ${ram}G`)
        }
      }

      if (updated) {
        writeFileSync(profilesPath, JSON.stringify(content, null, 2))
        return { ok: true }
      }
      return { ok: false, error: 'No Forge profile found' }
    } catch (e) {
      console.error('Error updating launcher profile:', e)
      return { ok: false, error: String(e) }
    }
  })

  ipcMain.handle('delete-mod', async (_, modPath) => {
    try {
      if (existsSync(modPath)) {
        unlinkSync(modPath)
        console.log('Deleted mod:', modPath)
        return { ok: true }
      }
      return { ok: false, error: 'File not found' }
    } catch (e) {
      console.error('Error deleting mod:', e)
      return { ok: false, error: String(e) }
    }
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
