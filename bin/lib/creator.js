const path = require('path');
const fs = require('fs-extra');
const { join: pathJoin } = require('path');
const { Spinner } = require('cli-spinner');
const inquirer = require('inquirer');
const clear = require('clear');
const chalk = require('chalk');
const helpers = require('../helpers');

async function create(projectName, options) {
  const dir = process.cwd();
  const inCurrent = projectName === '.';
  const targetDir = path.resolve(dir, projectName || '.');

	clear();

  if (fs.existsSync(targetDir)) {
    if (options.force) {
      await fs.remove(targetDir);
      await fs.ensureDir(targetDir);
    } else {
      if (inCurrent) {
        const { ok } = await inquirer.prompt([
          {
            name: 'ok',
            type: 'confirm',
            message: `Generate project in current directory?`,
          },
        ])
        
        if (!ok) {
          return;
        }
      } else {
        const { action } = await inquirer.prompt([
          {
            name: 'action',
            type: 'list',
            message: `Target directory ${chalk.cyan(targetDir)} already exists. Pick an action:`,
            choices: [
              { name: 'Overwrite', value: 'overwrite' },
              { name: 'Merge', value: 'merge' },
              { name: 'Cancel', value: false },
            ],
          },
        ]);
        
        if (!action) {
          return
        } else if (action === 'overwrite') {
          console.log(`\nRemoving ${chalk.cyan(targetDir)}...`);
          await fs.remove(targetDir);
          await fs.ensureDir(targetDir);
        }
      }
    }
  } else {
    await fs.ensureDir(targetDir);
  }

  const { projectType } = await inquirer.prompt([
    {
  	  name: 'projectType',
  	  type: 'list',
  	  message: `Please, pick the project type:`,
  	  choices: [
  	    { name: 'WordPress', value: 'wp' },
  	  ],
    },
  ]);

  console.log('\n' + chalk.cyan('Generating project...') + '\n');
  
  switch(projectType) {
	case 'wp':
    require(`./generators/wp`)(projectName, targetDir);

    const { ok } = await inquirer.prompt([
      {
        name: 'ok',
        type: 'confirm',
        message: `Add a theme for develop?`,
      },
    ]);

    if (!ok) {
      break;
    }

    const { themeType } = await inquirer.prompt([
      {
        name: 'themeType',
        type: 'list',
        message: `Please, chose a theme type:`,
        choices: [
          { name: 'Underscores', value: 'u' },
        ],
      },
    ]);

    const spinner = new Spinner({ text: 'Downloading and installing theme. Please, wait... %s' });
    switch (themeType) {
      case 'u':
        spinner.start();
        try {
          await helpers.getUnderscoresTheme(projectName, pathJoin(targetDir, 'wp-content', 'themes'));
        } catch (error) {
          console.log('\n', chalk.yellow.inverse('!WARNING!'), 'Theme creation wast not successful due to:', chalk.red.inverse(error.message));
        }
        spinner.stop();
        break;
    
      default:
        break;
    }

    break
	default:
	  return;
  }

  console.log('\n' + chalk.green.inverse('DONE!') + '\n');
}

module.exports = create;
