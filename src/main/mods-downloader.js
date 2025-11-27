import { createWriteStream, existsSync, mkdirSync, statSync } from 'fs'
import { join } from 'path'
import http from 'http'
import https from 'https'

function getModsDir() {
  if (process.platform === 'win32') return join(process.env.APPDATA || '', '.minecraft', 'mods')
  if (process.platform === 'darwin')
    return join(process.env.HOME || '', 'Library/Application Support/minecraft', 'mods')
  return join(process.env.HOME || '', '.minecraft', 'mods')
}

function getDirForInstallType(type) {
  if (type === 'shaderpack') {
    if (process.platform === 'win32') return join(process.env.APPDATA || '', '.minecraft', 'shaderpacks')
    if (process.platform === 'darwin') return join(process.env.HOME || '', 'Library/Application Support/minecraft', 'shaderpacks')
    return join(process.env.HOME || '', '.minecraft/shaderpacks')
  }
  if (type === 'resourcepack') {
    if (process.platform === 'win32') return join(process.env.APPDATA || '', '.minecraft', 'resourcepacks')
    if (process.platform === 'darwin') return join(process.env.HOME || '', 'Library/Application Support/minecraft', 'resourcepacks')
    return join(process.env.HOME || '', '.minecraft/resourcepacks')
  }
  return getModsDir()
}

function followRedirects(url, max = 5) {
  return new Promise((resolve, reject) => {
    const lib = url.startsWith('https') ? https : http
    const req = lib.request(url, { method: 'HEAD' }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location && max > 0) {
        resolve(followRedirects(res.headers.location, max - 1))
      } else {
        resolve(url)
      }
    })
    req.on('error', reject)
    req.end()
  })
}

function httpDownload(url, destPath, onProgress) {
  return new Promise((resolve, reject) => {
    followRedirects(url)
      .then((finalUrl) => {
        const lib = finalUrl.startsWith('https') ? https : http
        lib
          .get(finalUrl, (res) => {
            if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
              // redirect handled by followRedirects, but fallback
              return httpDownload(res.headers.location, destPath, onProgress)
                .then(resolve)
                .catch(reject)
            }

            if (res.statusCode !== 200) {
              return reject(new Error(`Download failed with status ${res.statusCode}`))
            }

            const total = parseInt(res.headers['content-length'] || '0', 10)
            let downloaded = 0
            const fileStream = createWriteStream(destPath)
            res.on('data', (chunk) => {
              downloaded += chunk.length
              if (total) onProgress((downloaded / total) * 100)
            })
            res.pipe(fileStream)
            fileStream.on('finish', () => {
              fileStream.close(() => resolve({ ok: true, path: destPath }))
            })
            fileStream.on('error', (err) => reject(err))
          })
          .on('error', reject)
      })
      .catch(reject)
  })
}

/**
 * Descarga una lista de mods desde un Nextcloud compartido públicamente.
 * shareUrl: URL de la carpeta compartida (ej: https://cloud.crezty.com/index.php/s/WGFJgMTYRRMBFSB)
 * mods: Array de objetos { id, filename }
 * sendProgress: callback para emitir eventos de progreso ({type, id, filename, percent, ok, path, error})
 */
export async function downloadMods(shareUrl, mods, sendProgress = () => {}) {
  // Ensure each target directory exists when needed

  // Normalize share URL to a base usable for direct downloads
  // Try variants: /s/.../download?files=FILENAME
  let base = shareUrl
  if (shareUrl.includes('/index.php/')) base = shareUrl.replace('/index.php', '')

  for (const mod of mods) {
    try {
      sendProgress({ type: 'start', id: mod.id, filename: mod.filename })

      // candidate URLs
      const candidates = [
        `${base}/download?files=${encodeURIComponent(mod.filename)}`,
        `${shareUrl}/download?files=${encodeURIComponent(mod.filename)}`,
        `${base}/download?path=/${encodeURIComponent(mod.filename)}`,
        `${shareUrl}/download?path=/${encodeURIComponent(mod.filename)}`
      ]

      let lastErr = null
      let downloaded = false
      const installType = mod.installType || 'mods'
      const destDir = getDirForInstallType(installType)
      if (!existsSync(destDir)) mkdirSync(destDir, { recursive: true })
      const destPath = join(destDir, mod.filename)

      for (const c of candidates) {
        try {
          await httpDownload(c, destPath, (percent) => {
            sendProgress({ type: 'progress', id: mod.id, filename: mod.filename, percent })
          })
          downloaded = true
          break
        } catch (err) {
          lastErr = err
        }
      }

      if (!downloaded) {
        sendProgress({
          type: 'complete',
          id: mod.id,
          filename: mod.filename,
          ok: false,
          error: lastErr?.message
        })
        continue
      }

      // Optionally return file size
      const size = statSync(destPath).size
      sendProgress({
        type: 'complete',
        id: mod.id,
        filename: mod.filename,
        ok: true,
        path: destPath,
        size
      })
    } catch (err) {
      sendProgress({
        type: 'complete',
        id: mod.id,
        filename: mod.filename,
        ok: false,
        error: String(err)
      })
    }
  }

  sendProgress({ type: 'done' })
  return { ok: true }
}

export default { downloadMods }
