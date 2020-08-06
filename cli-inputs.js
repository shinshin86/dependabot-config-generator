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

const inputTargetBranch = async () => {
  const { targetBranch } = await prompts({
    type: 'text',
    name: 'targetBranch',
    message: 'Branch to create pull requests against.',
    initial: 'master',
    validate: (value) => (!value ? 'Please enter a branch name.' : true),
  });

  return targetBranch;
};

const inputDefaultReviewers = async () => {
  const { defaultReviewers } = await prompts({
    type: 'text',
    name: 'defaultReviewers',
    message:
      'Reviewers to set on update pull requests. (If you are using multiple labels, please separate them by commas.)',
    initial: '',
    validate: (value) => (!value ? 'Please enter a default reviewers.' : true),
  });

  return defaultReviewers;
};

const inputDefaultAssignees = async () => {
  const { defaultAssignees } = await prompts({
    type: 'text',
    name: 'defaultAssignees',
    message:
      'Assignees to set on update pull requests. (If you are using multiple labels, please separate them by commas.)',
    initial: '',
    validate: (value) => (!value ? 'Please enter a default assignees.' : true),
  });

  return defaultAssignees;
};

const inputDefaultLabels = async () => {
  const { defaultLabels } = await prompts({
    type: 'text',
    name: 'defaultLabels',
    message:
      'Labels to set on update pull requests. (If you are using multiple labels, please separate them by commas.)',
    initial: '',
    validate: (value) => (!value ? 'Please enter a default labels.' : true),
  });

  return defaultLabels;
};

const inputDefaultMilestone = async () => {
  const { defaultMilestone } = await prompts({
    type: 'text',
    name: 'defaultMilestone',
    message: 'Milestone to set on dependency update pull requests.',
    initial: '',
    validate: (value) => (!value ? 'Please enter a defaultMilestone.' : true),
  });

  return defaultMilestone;
};

module.exports = {
  inputPackageManager,
  inputDirectory,
  inputUpdateSchedule,
  inputUpdateTyep,
  inputOutputType,
  inputTargetBranch,
  inputDefaultReviewers,
  inputDefaultAssignees,
  inputDefaultLabels,
  inputDefaultMilestone,
};
