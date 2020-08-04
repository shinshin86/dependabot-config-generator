const cliSelect = require('cli-select');
const chalk = require('chalk');
const prompts = require('prompts');

const packageManagerList = [
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

const liveSupportingPackageManagerList = [
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

const inputPackageManager = async () => {
  const { value: packageManager } = await cliSelect({
    values: packageManagerList,
    valueRenderer: (value, selected) => {
      if (selected) {
        return displaySelectedText(value);
      }

      return value;
    },
  });

  return packageManager;
};

const inputDirectory = async () => {
  const { directory } = await prompts({
    type: 'text',
    name: 'directory',
    message:
      "Where to look for package manifests (e.g. your package.json or Gemfile). The directory is relative to the repository's root.",
    initial: '/',
    validate: (value) => (!value ? 'This setting is required.' : true),
  });

  return directory;
};

const inputUpdateSchedule = async (packageManager) => {
  if (liveSupportingPackageManagerList.includes(packageManager)) {
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

  return updateSchedule;
};

const inputUpdateTyep = async () => {
  const { value: updateType } = await cliSelect({
    values: updateTypeList,
    valueRenderer: (value, selected) => {
      if (selected) {
        return displaySelectedText(value);
      }

      return value;
    },
  });

  return updateType;
};

const inputOutputType = async () => {
  const { value: outputType } = await cliSelect({
    values: ['terminal', 'file(.dependabot/config.yml)'],
    valueRenderer: (value, selected) => {
      if (selected) {
        return displaySelectedText(value);
      }

      return value;
    },
  });

  return outputType;
};

module.exports = {
  inputPackageManager,
  inputDirectory,
  inputUpdateSchedule,
  inputUpdateTyep,
  inputOutputType,
};
