import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {
  checkJava: () => ipcRenderer.invoke('check-java'),
  checkForgeVersion: () => ipcRenderer.invoke('check-forge'),
  openExternal: (url) => ipcRenderer.invoke('open-external', url),
  checkMods: (settings) => ipcRenderer.invoke('check-mods', settings),
  downloadMods: (shareUrl, mods) => ipcRenderer.invoke('download-mods', shareUrl, mods),
  updateMods: (shareUrl, mods) => ipcRenderer.invoke('update-mods', shareUrl, mods),
  launchMinecraft: (options) => ipcRenderer.invoke('launch-minecraft', options),
  isMinecraftInstalled: () => ipcRenderer.invoke('is-minecraft-installed'),
  openMinecraftFolder: () => ipcRenderer.invoke('open-minecraft-folder'),
  exitApp: () => ipcRenderer.invoke('exit-app'),
  onModsDownloadProgress: (cb) => {
    const handler = (_, data) => cb(data)
    ipcRenderer.on('mods-download-progress', handler)
    return () => ipcRenderer.removeListener('mods-download-progress', handler)
  },
  getSystemRAM: () => ipcRenderer.invoke('getSystemRAM'),
  getSettings: () => ipcRenderer.invoke('getSettings'),
  saveSettings: (settings) => ipcRenderer.invoke('saveSettings', settings),
  repairInstallation: () => ipcRenderer.invoke('repair-installation'),
  updateLauncherProfile: (ram) => ipcRenderer.invoke('update-launcher-profile', ram),
  deleteMod: (modPath) => ipcRenderer.invoke('delete-mod', modPath),
  fetchServerStatus: (serverIp, serverPort) =>
    ipcRenderer.invoke('fetch-server-status', serverIp, serverPort),
  // Auto-Updater
  checkForUpdates: () => ipcRenderer.invoke('check-for-updates'),
  quitAndInstall: () => ipcRenderer.invoke('quit-and-install'),
  onUpdateStatus: (cb) => {
    const handler = (_, data) => cb(data)
    ipcRenderer.on('update-status', handler)
    return () => ipcRenderer.removeListener('update-status', handler)
  }
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  window.electron = electronAPI
  window.api = api
}
