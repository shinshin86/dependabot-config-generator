const yaml = require('js-yaml');
const cliSelect = require('cli-select');
const chalk = require('chalk');
const prompts = require('prompts');

const generateConfigFile = async (configObj) => {
  const fs = require('fs');
  const fsPromises = require('fs').promises;
  const process = require('process');
  const path = require('path');

  const dependabotDir = '.dependabot';
  const configFile = 'config.yml';
  const isExists = fs.existsSync(path.join(process.cwd(), dependabotDir));

  if (!isExists) {
    await fsPromises.mkdir(dependabotDir);
  }

  await fsPromises.writeFile(path.join(dependabotDir, configFile), configObj);

  console.log(`Generate config file: ${path.join(dependabotDir, configFile)}`);

  return;
};

const generate = async (
  packageManeger,
  directory,
  updateSchedule,
  updateType,
  isTerminalOutput
) => {
  const version = 1;

  const automerged_updates = [
    {
      match: {
        dependency_type: 'all',
        update_type: updateType,
      },
    },
  ];

  const update_configs = [
    {
      package_manager: packageManeger,
      directory,
      update_schedule: updateSchedule,
      automerged_updates,
    },
  ];

  const configObj = { version, update_configs };

  if (isTerminalOutput) {
    console.log(yaml.dump(configObj));
  } else {
    await generateConfigFile(yaml.dump(configObj));
  }
};

const packageManegerList = [
  'javascript',
  'ruby:bundler',
  'php:composer',
  'python',
  'go:modules',
  'go:dep',
  'java:maven',
  'java:gradle',
  'dotnet:nuget',
  'rust:cargo',
  'elixir:hex',
  'docker',
  'terraform',
  'submodules',
  'elm',
];

const updateScheduleList = ['daily', 'weekly', 'monthly'];

const liveSupportingPackageManegerList = [
  'javascript',
  'ruby:bundler',
  'python',
  'php:composer',
  'dotnet:nuget',
  'rust:cargo',
  'elixir:hex',
];

const updateTypeList = [
  'security:patch',
  'semver:patch',
  'semver:minor',
  'in_range',
  'all',
];

const displaySelectedText = (value) => {
  return chalk.blue(chalk.underline(value));
};

(async () => {
  const { value: packageManeger } = await cliSelect({
    values: packageManegerList,
    valueRenderer: (value, selected) => {
      if (selected) {
        return displaySelectedText(value);
      }

      return value;
    },
  });

  const { directory } = await prompts({
    type: 'text',
    name: 'directory',
    message:
      "Where to look for package manifests (e.g. your package.json or Gemfile). The directory is relative to the repository's root.",
    initial: '/',
    validate: (value) => (!value ? 'This setting is required.' : true),
  });

  if (liveSupportingPackageManegerList.includes(packageManeger)) {
    updateScheduleList.push('live');
  }

  const { value: updateSchedule } = await cliSelect({
    values: updateScheduleList,
    valueRenderer: (value, selected) => {
      if (selected) {
        return displaySelectedText(value);
      }

      return value;
    },
  });

  const { value: updateType } = await cliSelect({
    values: updateTypeList,
    valueRenderer: (value, selected) => {
      if (selected) {
        return displaySelectedText(value);
      }

      return value;
    },
  });

  const { value: outputType } = await cliSelect({
    values: ['terminal', 'file(.dependabot/config.yml)'],
    valueRenderer: (value, selected) => {
      if (selected) {
        return displaySelectedText(value);
      }

      return value;
    },
  });

  const isTerminalOutput = outputType === 'terminal';

  generate(
    packageManeger,
    directory,
    updateSchedule,
    updateType,
    isTerminalOutput
  );
})();
