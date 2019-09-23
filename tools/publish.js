require('dotenv').config()
const chalk = require('chalk')
const fs = require('fs')
const fetch = require('node-fetch')

const log = console.log // eslint-disable-line

log(chalk.blue('Publishing API Spec to APIary...\n'))

fetch('https://api.apiary.io/blueprint/publish/masterpublicdocumentation', {
  method: 'POST',
  headers: {
    Accept: 'text/html',
    'Content-Type': 'application/json',
    Authentication: `Token ${process.env.APIARY_TOKEN}`,
  },
  body: JSON.stringify({
    code: fs.readFileSync('build/index.apib', 'utf-8'),
    messageToSave: 'Published from local repository',
  }),
})
  .then((response) => {
    if (response.status === 200 || response.status === 201) {
      log(chalk.green('API Successfuly published'))
      process.exit(0)
    } else {
      log(chalk.red('❌  Error publishing API:\n'))
      log(chalk.red(JSON.stringify(response)))
      process.exit(1)
    }
  })
  .catch((error) => {
    log(chalk.red(JSON.stringify(error)))
    process.exit(1)
  })
