#!/usr/bin/env node

import { readFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import Blorg from '../lib/blorg.js'

function printUsage () {
  console.error('Usage: blorg <config file>')
  process.exit(1)
}

async function main () {
  const configPath = process.argv[2]
  if (!configPath) {
    printUsage()
  }

  let configFile
  try {
    configFile = await readFile(configPath, 'utf8')
  } catch {
    console.error(`Error: Could not read config file: ${configPath}`)
    printUsage()
  }

  let config
  try {
    config = JSON.parse(/** @type {string} */ (configFile))
  } catch (e) {
    console.error('Error parsing JSON:', e instanceof Error ? e.message : e)
    printUsage()
  }

  const root = dirname(resolve(configPath))
  const blorg = new Blorg(root, config)

  try {
    await blorg.run()
  } catch (err) {
    console.error(err instanceof Error ? err.stack : err)
    process.exit(1)
  }
}

main()
