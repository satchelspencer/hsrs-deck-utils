const fs = require('fs')
const path = require('path')
const _ = require('lodash')

function getOutput(srcDir) {
  const output = { type: 'deck', elements: {}, _v: 1 }

  fs.readdirSync(srcDir, { recursive: true }).forEach((file) => {
    if (file.endsWith('.json')) {
      const filePath = path.join(srcDir, file),
        element = JSON.parse(fs.readFileSync(filePath, 'utf8'))
      output.elements[element._id] = _.omit(element, '_id')
    }
  })

  function name2id(name, deck) {
    for (const id in deck.elements) {
      if (deck.elements[id].name === name) return id
    }
    return name
  }

  for (const elId in output.elements) {
    const element = output.elements[elId]

    element.parents = element.parents.map((n) => name2id(n, output))
    if (element.params)
      element.params = _.mapValues(element.params, (n) => name2id(n, output))
  }
  return output
}

module.exports.getOutput = getOutput
