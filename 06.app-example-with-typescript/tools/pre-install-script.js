const chalk = require('chalk').default;
if (process.env.npm_execpath.indexOf('npm') <= -1) {
  console.log(chalk.redBright('\nPlease use NPM to install dependencies!\n'))
  process.exit(1);
}
