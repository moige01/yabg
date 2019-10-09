const { writeFileSync, readFileSync } = require('fs');
const { join: pathJoin, sep: pathSep } = require('path');
const { sync: mkdirpSync } = require('mkdirp')
const { render: ejsRender } = require('ejs');
const { inspect: utilInspect } = require('util');
const noCase = require('no-case')

const MODE_0666 = parseInt('0666', 8);
const MODE_0755 = parseInt('0755', 8);
const TEMPLATE_DIR = pathJoin(__dirname, '..', 'templates');

function write(file, str, mode) {
	writeFileSync(file, str, { mode: mode || MODE_0666 });
	console.log('   \x1b[36mcreate\x1b[0m : ' + file);
}

function copyTemplate(from, to) {
	write(to, readFileSync(pathJoin(TEMPLATE_DIR, from), 'utf-8'));
}

function mkdir(base, dir) {
  const loc = pathJoin(base, dir);

  console.log('   \x1b[36mcreate\x1b[0m : ' + loc + pathSep);
  mkdirpSync(loc, MODE_0755);
}

function loadTemplate(name) {
  const contents = readFileSync(pathJoin(__dirname, '..', 'templates', (name + '.ejs')), 'utf-8');
  const locals = Object.create(null);

  function render() {
    return ejsRender(contents, locals, {
      escape: utilInspect,
    });
  }

  return {
    locals,
    render,
  }
}

function kebabCase(str) {
	return noCase(str, null, '-');
}

module.exports = {
	write,
	mkdir,
	kebabCase,
	loadTemplate,
	copyTemplate,
}
