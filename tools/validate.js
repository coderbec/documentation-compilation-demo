const chalk = require('chalk')
const fs = require('fs')
const drafter = require('drafter.js')

const log = console.log // eslint-disable-line

log(chalk.blue('Validating API Spec\n'))

const validation = drafter.validateSync(fs.readFileSync('build/index.apib', 'utf-8'), {
  requireBlueprintName: false,
  generateSourceMap: true,
})

if (validation === null) {
  log(chalk.green('Validation passed.\n'))
  process.exit(0)
} else {
  log(chalk.red('Validation failed:\n'))
  log(validation)
  validation.content.forEach((issue) => {
    log(issue.meta, issue.attributes.sourceMap[0].content)
    log(chalk.red(`* ${issue.content}\n`))
  })
  process.exit(1)
}