const helpers = require('../../helpers');
const { join: pathJoin } = require('path');

function createWPApplication(name, dir) {
  const docker = helpers.loadTemplate(pathJoin('wp', 'docker-compose.yaml'));
  const readme = helpers.loadTemplate(pathJoin('wp', 'README.md'));
  const control = helpers.loadTemplate(pathJoin('wp', 'control.sh'));

  docker.locals.name = name;
  readme.locals.name = name;
  control.locals.name = name;

  helpers.write(pathJoin(dir, 'docker-compose.yaml'), docker.render());
  helpers.write(pathJoin(dir, 'README.md'), readme.render());
  helpers.write(pathJoin(dir, `${name}.sh`), control.render(), helpers.MODE_0744);

  helpers.mkdir(dir, pathJoin('wp-content', 'themes'));
  helpers.mkdir(dir, pathJoin('wp-content', 'mu-plugins'));

  const wpContent = pathJoin(dir, 'wp-content');
  const themePath = pathJoin(dir, 'wp-content', 'themes');
  const pluginsPath = pathJoin(dir, 'wp-content', 'mu-plugins');

  helpers.write(pathJoin(wpContent, 'index.php'), "<?php\n// Silence is golden.");
  helpers.write(pathJoin(themePath, '.gitkeep'), '');
  helpers.write(pathJoin(pluginsPath, '.gitkeep'), '');

  helpers.copyTemplate(pathJoin('wp', '.env.example'), pathJoin(dir, '.env.example'));
  helpers.copyTemplate(pathJoin('wp', 'gitignore'), pathJoin(dir, '.gitignore'));
}

module.exports = createWPApplication;
