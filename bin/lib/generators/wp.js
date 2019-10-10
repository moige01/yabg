const helpers = require('../../helpers');
const { join: pathJoin } = require('path');

function createWPApplication(name, dir) {
  const docker = helpers.loadTemplate('wp/docker-compose.yaml');
  const readme = helpers.loadTemplate('wp/README.md');
  const control = helpers.loadTemplate('wp/control.sh');

  docker.locals.name = name;
  readme.locals.name = name;
  control.locals.name = name;

  helpers.write(pathJoin(dir, 'docker-compose.yaml'), docker.render());
  helpers.write(pathJoin(dir, 'README.md'), readme.render());
  helpers.write(pathJoin(dir, `${name}.sh`), control.render(), helpers.MODE_0744);

  helpers.copyTemplate('wp/.env.example', pathJoin(dir, '.env.example'));
  helpers.copyTemplate('wp/gitignore', pathJoin(dir, '.gitignore'));
}

module.exports = createWPApplication;
