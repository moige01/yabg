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

  helpers.mkdir(dir, pathJoin('conf.d'));

  helpers.copyTemplate(pathJoin('wp', '.env.example'), pathJoin(dir, '.env.example'));
  helpers.copyTemplate(pathJoin('wp', 'gitignore'), pathJoin(dir, '.gitignore'));
  helpers.copyTemplate(pathJoin('wp', 'wp-config-sample.php'), pathJoin(dir, 'wp-config-sample.php'));
  helpers.copyTemplate(pathJoin('wp', 'conf.d', 'extended_timeout.conf'), pathJoin(dir, 'conf.d', 'extended_timeout.conf'));
  helpers.copyTemplate(pathJoin('wp', 'conf.d', 'max_body_size.conf'), pathJoin(dir, 'conf.d', 'max_body_size.conf'));
  helpers.copyTemplate(pathJoin('wp', 'wp-cli.yml'), pathJoin(dir, 'wp-cli.yml'));
  helpers.copyTemplate(pathJoin('wp', 'gitlab-ci.yml'), pathJoin(dir, '.gitlab-ci.yml'));
}

module.exports = createWPApplication;
