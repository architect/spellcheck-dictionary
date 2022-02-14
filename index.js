let { join } = require('path')
let { readFileSync } = require('fs')
let dictRaw = readFileSync(join(__dirname, 'dictionary.txt'))
let upper = /[A-Z]/

/**
 * `spellcheck-cli` isn't (yet) smart enough to recognize when a known word is used at the beginning of a sentence, so disable case-sensitivity if it's strictly lower-case
 * Similarly, disable possessives, plurals, and usage of the word at the end of a sentence
 */
let dict = dictRaw.toString().split('\n').map(word => {
  let re = `^${word}('s|s)?\\.?$`
  if (word.match(upper)) return new RegExp(re)
  return new RegExp(re, 'i')
})

module.exports = dict
