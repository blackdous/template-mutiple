/*
 * @Descripttion:
 * @Author: heidous
 * @Date: 2020-08-13 18:02:34
 * @LastEditors: heidous
 * @LastEditTime: 2020-08-13 23:39:15
 */
const path = require('path');
const fs = require('fs');
const spawn = require('child_process').spawn;

const lintStyles = ['standard', 'airbnb'];

function sortObject(object) {
  const sortedObject = {};
  Object.keys(object)
    .sort()
    .forEach((item) => {
      sortedObject[item] = object[item];
    });
  return sortedObject;
}

// devDependencies/dependencies 排序
exports.sortDependencies = function sortDependencies(data) {
  const packageJsonFile = path.join(
    data.inPlace ? '' : data.desDirName,
    'package.json'
  );
  const packageJson = JSON.parse(fs.readFileSync(packageJsonFile));
  packageJson.devDependencies = sortObject(packageJson.devDependencies);
  packageJson.dependencies = sortObject(packageJson.dependencies);
  fs.writeFileSync(
    packageJsonFile,
    JSON.stringify(packageJson, null, 2) + '\n'
  );
};

// 运行命令
function runCommand(cmd, args, options) {
  return new Promise((resolve, reject) => {
    const spwan = spawn(
      cmd,
      args,
      Object.assign(
        { cwd: process.cwd(), stdio: 'inherit', shell: true },
        options
      )
    );
    spawn.on('exit', () => {
      resolve();
    });
  });
}
// npm install 安装依赖
exports.installDependencies = function installDependencies(
  cwd,
  executable = 'npm',
  color
) {
  console.log(`\n\n# ${color('Installing project dependencies ...')}`);
  console.log('#===================\n');
  return runCommand(executable, ['install'], {
    cwd
  });
};
// 运行eslint fix 命令
exports.runLintFix = function runLintFix(cwd, data, color) {
  if (data.lint && lintStyles.indexOf(data.lintConfig) !== -1) {
    console.log(
      `\n\n${color(
        'Running eslint --fix to comply with chosen preset rules ...'
      )}`
    );
    console.log('#=========================\n');
    const args =
      data.autoInstall === 'npm'
        ? ['run', 'lint', '--', '--fix']
        : ['run', 'lint', '--fix'];
    return runCommand(data.autoInstall, args, { cwd });
  }
  return Promise.resolve();
};

function lintMsg(data) {
  return !data.autoInstall &&
    data.lint &&
    lintStyles.indexOf(data.lintConfig) !== -1
    ? 'npm run lint -- --fix (or for yarn: yarn run lint --fix)\n'
    : '';
}
function installMsg(data) {
  return !data.autoInstall ? 'npm install (or if using yarn: yarn)\n ' : '';
}
// 输出信息
exports.printMessage = function printMessage(data, { green, yellow }) {
  const message = `
    # ${green('Project initialization finished!')}
    # ========================
    To get started:
      ${yellow(
        `${data.inPlace ? '' : `cd ${data.destDirName}\n  `}${installMsg(
          data
        )}${lintMsg(data)}npm run dev`
      )}
      
    Documentation can be found at https://vuejs-templates.github.io/webpack
  `;
  console.log(message);
};
