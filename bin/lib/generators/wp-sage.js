const helpers = require('../../helpers');
const { join: pathJoin } = require('path');

function createWPApplication(name, dir) {
  const docker = helpers.loadTemplate('wp-sage/docker-compose.yaml');
  const readme = helpers.loadTemplate('wp-sage/README.md');
  const control = helpers.loadTemplate('wp-sage/control.sh');
	const yarn = helpers.loadTemplate('wp-sage/yarn.sh');
	const prepareTheme = helpers.loadTemplate('wp-sage/prepare_theme.sh');

  docker.locals.name = name;
  readme.locals.name = name;
  control.locals.name = name;
	yarn.locals.name = name;
	prepareTheme.locals.name = name;

  helpers.write(pathJoin(dir, 'docker-compose.yaml'), docker.render());
  helpers.write(pathJoin(dir, 'README.md'), readme.render());
  helpers.write(pathJoin(dir, `${name}.sh`), control.render(), helpers.MODE_0744);
	helpers.write(pathJoin(dir, 'yarn.sh'), yarn.render(), helpers.MODE_0744);
  helpers.write(pathJoin(dir, 'prepare_theme.sh'), prepareTheme.render(), helpers.MODE_0744);

  helpers.copyTemplate('wp-sage/Dockerfile', pathJoin(dir, 'Dockerfile'));
  helpers.copyTemplate('wp-sage/.env.example', pathJoin(dir, '.env.example'));
  helpers.copyTemplate('wp-sage/gitignore', pathJoin(dir, '.gitignore'));
}

module.exports = createWPApplication;
