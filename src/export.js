#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const { getOutput } = require('./output')

const outputPath = process.argv[2],
  dirPath = path.dirname(outputPath)
if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true })
fs.writeFileSync(outputPath, JSON.stringify(getOutput(process.argv[3])))
