const globby = require('globby')
const fs = require('fs')
const tv4 = require('tv4')
const chalk = require('chalk')

const log = console.log //eslint-disable-line

let exitCode = 0

const fn = path => (
  new Promise((resolve, reject) => {
    fs.readFile(path, 'utf-8', (err, data) => {
      if (!err) {
        const isBadCase = path.includes('.bad.')
        const schemaFilePath = `${path.replace(/(\.(good|bad)\..*)?\.json/i, '.schema.json')}`
        const schema = JSON.parse(fs.readFileSync(schemaFilePath, 'utf-8'))
        const result = tv4.validateMultiple(JSON.parse(data), schema)
        if (!isBadCase && !result.valid) {
          exitCode = 1
          log(chalk.red(`${path}`))
          result.errors.forEach((error) => {
            log(chalk.red(`  ${error}`))
            log(chalk.red(`    ${error.schemaPath} | ${JSON.stringify(error.params)}\n`))
          })
          reject('One or more files has a validation issue')
        }
        if (isBadCase && result.valid) {
          exitCode = 1
          log(chalk.red(`${path}`))
          reject('Bad request passed validation which is unexpected')
        }
      } else {
        reject(`File Read Error -> ${path}\n ${err}`)
      }
      resolve('Success')
    })
  })
)

const paths = globby.sync(['src/**/*.json', '!src/**/*.schema.json'])

Promise.all(paths.map(fn))
  .then(() => {
    log(chalk.green('Lint and validation passed'))
    process.exit(exitCode)
  })
  .catch((error) => {
    log(chalk.red(`Lint and validation failed:\n   ${error}\n`))
    process.exit(exitCode)
  })
