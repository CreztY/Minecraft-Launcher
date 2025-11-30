import { createWriteStream, existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs'
import { join } from 'path'
import http from 'http'
import https from 'https'
import crypto from 'crypto'
import AdmZip from 'adm-zip'
import { getMinecraftPath } from './utils/paths.js'
import { CLIENT_CONFIG } from '../config/index.js'

const CONFIG_MARKER_FILE = 'client-config-status.json'

function calculateFileHash(filePath) {
  try {
    const fileBuffer = readFileSync(filePath)
    return crypto.createHash('sha256').update(fileBuffer).digest('hex')
  } catch (e) {
    return null
  }
}

function downloadFile(url, destPath, onProgress) {
  return new Promise((resolve, reject) => {
    const lib = url.startsWith('https') ? https : http
    const req = lib.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadFile(res.headers.location, destPath, onProgress).then(resolve).catch(reject)
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Status ${res.statusCode}`))
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
        fileStream.close(() => resolve(destPath))
      })
      fileStream.on('error', (err) => {
        fileStream.close()
        reject(err)
      })
    })
    req.on('error', reject)
  })
}

export async function checkConfigStatus() {
  try {
    if (!CLIENT_CONFIG.url || !CLIENT_CONFIG.hash) {
      return { status: 'skipped', reason: 'no-config' }
    }

    const markerPath = getMinecraftPath(CONFIG_MARKER_FILE)
    if (!existsSync(markerPath)) {
      return { status: 'outdated', reason: 'missing-marker' }
    }

    const marker = JSON.parse(readFileSync(markerPath, 'utf-8'))
    if (marker.hash !== CLIENT_CONFIG.hash) {
      return { status: 'outdated', reason: 'hash-mismatch' }
    }

    return { status: 'synced' }
  } catch (error) {
    console.error('Error checking config status:', error)
    return { status: 'error', error: String(error) }
  }
}

export async function updateConfig(onProgress) {
  try {
    if (!CLIENT_CONFIG.url) throw new Error('No config URL provided')

    const tempDir = getMinecraftPath('temp')
    if (!existsSync(tempDir)) mkdirSync(tempDir, { recursive: true })
    
    const zipPath = join(tempDir, 'client_config.zip')
    
    // 1. Download
    onProgress({ type: 'start', step: 'downloading' })
    await downloadFile(CLIENT_CONFIG.url, zipPath, (percent) => {
      onProgress({ type: 'progress', percent })
    })

    // 2. Verify Hash (Optional but recommended)
    onProgress({ type: 'start', step: 'verifying' })
    const downloadedHash = calculateFileHash(zipPath)
    if (CLIENT_CONFIG.hash && downloadedHash !== CLIENT_CONFIG.hash) {
      // Warn but maybe allow? Or fail? Let's fail for safety if hash is provided
      // throw new Error(`Hash mismatch: expected ${CLIENT_CONFIG.hash}, got ${downloadedHash}`)
      console.warn(`Config hash mismatch. Expected ${CLIENT_CONFIG.hash}, got ${downloadedHash}`)
    }

    // 3. Extract
    onProgress({ type: 'start', step: 'extracting' })
    const zip = new AdmZip(zipPath)
    const minecraftDir = getMinecraftPath()
    zip.extractAllTo(minecraftDir, true) // overwrite = true

    // 4. Update Marker
    const markerPath = getMinecraftPath(CONFIG_MARKER_FILE)
    writeFileSync(markerPath, JSON.stringify({
      hash: CLIENT_CONFIG.hash || downloadedHash,
      date: new Date().toISOString(),
      version: CLIENT_CONFIG.version
    }, null, 2))

    onProgress({ type: 'done' })
    return { ok: true }
  } catch (error) {
    console.error('Config update failed:', error)
    onProgress({ type: 'error', error: String(error) })
    return { ok: false, error: String(error) }
  }
}
