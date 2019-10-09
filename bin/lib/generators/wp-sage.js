const helpers = require('../../helpers');
const { join: pathJoin } = require('path');

function createWPApplication(name, dir) {
  const docker = helpers.loadTemplate('wp-sage/docker-compose.yaml');
  const readme = helpers.loadTemplate('wp-sage/README.md');
  const control = helpers.loadTemplate('wp-sage/scripts/control.sh');

  docker.locals.name = name;
  readme.locals.name = name;
  control.locals.name = name;

  helpers.write(pathJoin(dir, 'docker-compose.yaml'), docker.render());
  helpers.write(pathJoin(dir, 'README.md'), readme.render());
  helpers.mkdir(dir, 'scripts');
  helpers.write(pathJoin(dir, `scripts/${name}.sh`), control.render());

  helpers.copyTemplate('wp-sage/scripts/prepare_theme.sh', pathJoin(dir, 'scripts/prepare_theme.sh'));
  helpers.copyTemplate('wp-sage/scripts/yarn.sh', pathJoin(dir, 'scripts/yarn.sh'));
  helpers.copyTemplate('wp-sage/Dockerfile', pathJoin(dir, 'Dockerfile'));
  helpers.copyTemplate('wp-sage/.env.example', pathJoin(dir, '.env.example'));
  helpers.copyTemplate('wp-sage/gitignore', pathJoin(dir, '.gitignore'));
}

module.exports = createWPApplication;
