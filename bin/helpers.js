const { writeFileSync, readFileSync } = require('fs');
const { join: pathJoin, sep: pathSep } = require('path');
const { sync: mkdirpSync } = require('mkdirp');
const { render: ejsRender } = require('ejs');
const { inspect: utilInspect } = require('util');
const noCase = require('no-case');

const MODE_0666 = parseInt('0666', 8);
const MODE_0755 = parseInt('0755', 8);
const MODE_0744 = parseInt('0744', 8);
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

function getUnderscoresTheme(themeName, outputPath) {
  return new Promise(async function (resolve, reject) {
    const http = require("https");
    const querystring = require('querystring');
    const tmp = require('tmp');
    const unzip = require('extract-zip');
    const tmpobj = tmp.fileSync({ mode: 0o644, prefix: 'theme', postfix: '.zip' });
    const { createWriteStream } = require('fs');
  
    const tempStream = createWriteStream(tmpobj.name);
  
    const query = querystring.stringify({
      underscoresme_generate: 1,
      underscoresme_name: themeName,
      underscoresme_slug: '',
      underscoresme_author: '',
      underscoresme_author_uri: '',
      underscoresme_description: '',
      underscoresme_generate_submit: 'Generate',
    });
  
    var options = {
      host: 'underscores.me',
      path: '/',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': query.length
      }
    };
  
    const req = http.request(options, function (res) {
      res.pipe(tempStream);
  
      res.on('end', async function () {
        tempStream.close();
  
        try {
          await unzip(tmpobj.name, { dir: outputPath });
          resolve()
        } catch (error) {
          tmpobj.removeCallback();
          reject(error);
        }
      });
  
      res.on('error', function (err) {
        tmpobj.removeCallback();
        reject(err);
      })
    });
  
  
    req.on('error', function (err) {
      tmpobj.removeCallback();
      reject(err);
    });
  
    req.write(query);
    req.end();
  });
}

module.exports = {
	write,
	mkdir,
	kebabCase,
	loadTemplate,
	copyTemplate,
	MODE_0744,
	MODE_0755,
  MODE_0666,
  getUnderscoresTheme,
}
