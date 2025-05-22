#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const { getOutput } = require('./output')

const distDir = process.argv[2]
if (!fs.existsSync(distDir)) fs.mkdirSync(distDir, { recursive: true })
fs.writeFileSync(
  path.join(distDir, 'jp.deck.json'),
  JSON.stringify(getOutput(process.argv[3]))
)
