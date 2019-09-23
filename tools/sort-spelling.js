const fs = require('fs')
const text = String(fs.readFileSync('.spelling'))
const file = fs.createWriteStream('.spelling')
const textByLine = text.split('\n')
const arr = textByLine.sort()

file.on('error', function(err) { /* error handling */ })
arr.filter(
    function(v) { return v.length > 1; }
).forEach(
    function(v) { file.write(v + '\n') }
)
file.end()
