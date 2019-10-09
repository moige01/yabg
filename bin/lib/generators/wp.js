const helpers = require('../../helpers');
const { join: pathJoin } = require('path');

function createWPApplication(name, dir) {
  const docker = helpers.loadTemplate('wp/docker-compose.yaml');
  const readme = helpers.loadTemplate('wp/README.md');
  const control = helpers.loadTemplate('wp/scripts/control.sh');

  docker.locals.name = name;
  readme.locals.name = name;
  control.locals.name = name;

  helpers.write(pathJoin(dir, 'docker-compose.yaml'), docker.render());
  helpers.write(pathJoin(dir, 'README.md'), readme.render());
  helpers.mkdir(dir, 'scripts');
  helpers.write(pathJoin(dir, `scripts/${name}.sh`), control.render());

  helpers.copyTemplate('wp/.env.example', pathJoin(dir, '.env.example'));
  helpers.copyTemplate('wp/.gitignore', pathJoin(dir, '.gitignore'));
}

module.exports = createWPApplication;
