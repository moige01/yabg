const helpers = require('../../helpers');
const { join: pathJoin } = require('path');

function createWPApplication(name, dir) {
  const docker = helpers.loadTemplate(pathJoin('wp', 'docker-compose.yaml'));
  const readme = helpers.loadTemplate(pathJoin('wp', 'README.md'));
  const control = helpers.loadTemplate(pathJoin('wp', 'control.sh'));
  const controlps1 = helpers.loadTemplate(pathJoin('wp', 'control.ps1'));

  docker.locals.name = name;
  readme.locals.name = name;
  control.locals.name = name;
  controlps1.locals.name = name;

  helpers.write(pathJoin(dir, 'docker-compose.yaml'), docker.render());
  helpers.write(pathJoin(dir, 'README.md'), readme.render());
  helpers.write(pathJoin(dir, `${name}.sh`), control.render(), helpers.MODE_0744);
  helpers.write(pathJoin(dir, `${name}.ps1`), controlps1.render(), helpers.MODE_0744);

  helpers.mkdir(dir, pathJoin('wp-content', 'themes'));
  helpers.mkdir(dir, pathJoin('wp-content', 'plugins'));

  const wpContent = pathJoin(dir, 'wp-content');

  helpers.write(pathJoin(wpContent, 'index.php'), "<?php\n// Silence is golden.");

  helpers.copyTemplate(pathJoin('wp', '.env.example'), pathJoin(dir, '.env.example'));
  helpers.copyTemplate(pathJoin('wp', 'gitignore'), pathJoin(dir, '.gitignore'));
  helpers.copyTemplate(pathJoin('wp', 'index.php'), pathJoin(dir, 'index.php'));
  helpers.copyTemplate(pathJoin('wp', 'local-config-sample.php'), pathJoin(dir, 'local-config-sample.php'));
  helpers.copyTemplate(pathJoin('wp', 'wp-config.php'), pathJoin(dir, 'wp-config.php'));
}

module.exports = createWPApplication;
