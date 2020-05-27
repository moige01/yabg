#!/usr/bin/env node

const program = require('commander');
const chalk = require('chalk');
const minimist = require('minimist');

const { version: VERSION } = require('../package');
const { kebabCase } = require('./helpers');

program
	.name('yabg')
	.version(VERSION, '-v, --version')
	.usage('<command> [options]');

program
	.command('create <app-name>')
	.description('Initialize new project')
	.option('-f, --force', 'Force project creation on non-empty directory')
	.action(async (name, cmd) => {
		const kebabName = name === '.' ? '.' : kebabCase(name);

		if (minimist(process.argv.slice(3))._.length > 1) {
		  console.log(chalk.yellow.inverse('\n Info: You provided more than one argument. The first one will be used as the app\'s name, the rest are ignored. '));
		}
		
		try {
			await require('./lib/creator')(kebabName, cmd);
		} catch (error) {
			console.error(error);
		}
	});

program
	.arguments('<command>')
	.action((cmd) => {
		console.log(`     ` + chalk.red(`Unknown command ${chalk.yellow(cmd)}`));
		console.log();
		program.outputHelp();
		process.exit(1);
	});


program.parse(process.argv);

if (!process.argv.slice(2).length) {
	program.outputHelp();
	process.exit(1);
}

