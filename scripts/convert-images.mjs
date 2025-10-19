#!/usr/bin/env node
/**
 * Convert large images to optimized WebP format
 * Run with: node scripts/convert-images.mjs
 */

import sharp from 'sharp'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import fs from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const publicDir = join(__dirname, '..', 'public')

const conversions = [
  {
    input: join(publicDir, 'testimonials/profile.svg'),
    output: join(publicDir, 'testimonials/profile.webp'),
    width: 400, // Reasonable size for profile image
  },
  {
    input: join(publicDir, 'testimonials/zorik.png'),
    output: join(publicDir, 'testimonials/zorik.webp'),
    width: 400,
  }
]

async function convertImages() {
  console.log('🖼️  Converting images to WebP...\n')

  for (const { input, output, width } of conversions) {
    if (!fs.existsSync(input)) {
      console.log(`⚠️  Skipping ${input} (not found)`)
      continue
    }

    try {
      const inputStats = fs.statSync(input)
      const inputSizeMB = (inputStats.size / 1024 / 1024).toFixed(2)

      await sharp(input)
        .resize(width, null, {
          withoutEnlargement: true,
          fit: 'inside'
        })
        .webp({ quality: 85 })
        .toFile(output)

      const outputStats = fs.statSync(output)
      const outputSizeMB = (outputStats.size / 1024 / 1024).toFixed(2)
      const reduction = ((1 - outputStats.size / inputStats.size) * 100).toFixed(1)

      console.log(`✅ ${input}`)
      console.log(`   → ${output}`)
      console.log(`   📊 ${inputSizeMB}MB → ${outputSizeMB}MB (${reduction}% reduction)\n`)
    } catch (error) {
      console.error(`❌ Error converting ${input}:`, error.message)
    }
  }

  console.log('✨ Image conversion complete!')
}

convertImages().catch(console.error)
