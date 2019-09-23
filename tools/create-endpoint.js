const fs = require('fs')
const inquirer = require('inquirer')
const chalk = require('chalk')
const mkdirp = require('mkdirp')

const log = console.log // eslint-disable-line

log(chalk.blue('Creating new endpoint!'))

const kebabCase = string => string.replace(/([a-z])([A-Z])/g, '$1-$2').replace(/\s+/g, '-').toLowerCase()

inquirer.prompt([
  {
    type: 'input',
    name: 'name',
    message: 'Name of endpoint (what does this endpoint do?)\n eg. Sign In, Create API Key \n\n',
  },
  {
    type: 'input',
    name: 'endpoint',
    message: 'Endpoint Path (full path from root, no trailing slash)\n eg. /iam/user/login\n\n',
    validate: input => /^(\/\w+)+(\.)?\w+(\?(\w+=[\w\d]+(&\w+=[\w\d]+)*)+){0,1}$/.test(input),
  },
  {
    type: 'list',
    name: 'type',
    message: 'HTTP method',
    choices: [
      'GET',
      'POST',
      'PUT',
      'PATCH',
      'DELETE',
    ],
  },
]).then(({ endpoint, type, name }) => {
  const dir = `./src${endpoint}`
  const kebabName = kebabCase(name)
  if (!fs.existsSync(dir)) {
    log(chalk.green('Creating Directory'))
    mkdirp.sync(dir)
  } else {
    log(chalk.blue('Directory already exists, continuing....'))
    // throw new Error('Directory already exists')
  }
  log(chalk.green('Creating main file'))

  const files = {
    [`${kebabName}-response-200.json`]: `{
  "success": true
}`,
    [`${kebabName}-response-200.schema.json`]: `{
  "type": "object",
  "required": [
    "success"
  ],
  "properties": {
    "success": {
      "type": "boolean"
    }
  }
}`,
    [`${kebabName}-response-400.json`]: `[
  {
    "error": true
  }
]`,
    [`${kebabName}-response-400.schema.json`]: `{
  "type": "array",
  "required": [
    "error"
  ],
  "properties": {
    "error": {
      "type": "boolean"
    }
  }
}`,
  }

  if (type !== 'GET') {
    files[`${kebabName}.apib`] = `#### ${name} [${type}]

This is a description for this endpoint

+ Request (application/json)

    + Headers

            Accept: application/json

    + Body

            <!-- include(${kebabName}-request-body.json) -->

    + Schema

            <!-- include(${kebabName}-request-body.schema.json) -->

+ Response 200 (application/json)

            <!-- include(${kebabName}-response-200.json) -->

+ Response 400 (application/json)

            <!-- include(${kebabName}-response-400.json) -->`
    files[`${kebabName}-request-body.json`] = `{
  "request": true
}`
    files[`${kebabName}-request-body.schema.json`] = `{
  "type": "object",
  "required": [
    "request"
  ],
  "properties": {
    "request": {
      "type": "boolean"
    }
  }
}`
  } else {
    files[`${kebabName}.apib`] = `#### ${name} [${type}]

This is a description for this endpoint

+ Response 200 (application/json)

            <!-- include(${kebabName}-response-200.json) -->

+ Response 400 (application/json)

            <!-- include(${kebabName}-response-400.json) -->`
  }

  Object.keys(files).forEach((key) => {
    fs.writeFile(`${dir}/${key}`, files[key], (mainError) => {
      if (mainError) {
        throw new Error(mainError)
      }
      log(chalk.green(`${dir}/${key} created`))
    })
  })
})