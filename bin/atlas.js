#!/usr/bin/env node

const {join} = require('path')
const execa = require('execa')
const meow = require('meow')

const commands = ['dev', 'start']

const cli = meow(
  `
  Usage
    $ atlas <command>

  Available Commands
    ${commands.join(', ')}

  Examples
    $ atlas dev
    $ atlas start

  For more information run a command with the --help flag
      $ atlas dev --help
`,
  {autoHelp: false}
)

const cmd = cli.input[0]

if (!cmd || !commands.includes(cmd)) {
  cli.showHelp(2)
}

const args = process.argv.slice(3)

const bin = join(__dirname, `atlas-${cmd}.js`)

execa(bin, args, {stdio: 'inherit'})
