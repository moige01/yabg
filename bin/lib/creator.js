const helpers = require('../helpers');
const path = require('path');
const fs = require('fs-extra');
const inquirer = require('inquirer');
const clear = require('clear');
const chalk = require('chalk');

async function create(projectName, options) {
  const dir = process.cwd();
  const inCurrent = projectName === '.';
  const name = inCurrent ? path.relative('../', dir) : projectName;
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
	    { name: 'Wordpress', value: 'wp' },
	  ],
    },
  ]);

  console.log('\n' + chalk.cyan('Generating project...') + '\n');
  
  switch(projectType) {
	case 'wp':
	  const { withSage } = await inquirer.prompt([
		{
		  name: 'withSage',
		  type: 'confirm',
		  message: `Create Wordpress project with Roots Sage?`,
		},
	  ]);

	  const finalCreator = withSage ? 'wp-sage' : 'wp';
	
	  require(`./generators/${finalCreator}`)(projectName, targetDir);
	  break;
	default:
	  return;
  }

  console.log('\n' + chalk.green.inverse('DONE!') + '\n');
}

module.exports = create;
