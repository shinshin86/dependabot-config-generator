const yaml = require('js-yaml');

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

module.exports.generate = async ({
  packageManager,
  directory,
  updateSchedule,
  updateType,
  targetBranch,
  defaultReviewers,
  defaultAssignees,
  defaultLabels,
  defaultMilestone,
  isTerminalOutput,
}) => {
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
      package_manager: packageManager,
      directory,
      update_schedule: updateSchedule,
      automerged_updates,
    },
  ];

  if (targetBranch) {
    update_configs[0].target_branch = targetBranch;
  }

  if (defaultReviewers) {
    update_configs[0].default_reviewers = defaultReviewers.split(',');
  }

  if (defaultAssignees) {
    update_configs[0].default_assignees = defaultAssignees.split(',');
  }

  if (defaultLabels) {
    update_configs[0].default_labels = defaultLabels.split(',');
  }

  if (defaultMilestone) {
    update_configs[0].default_milestone = defaultMilestone;
  }

  const configObj = { version, update_configs };

  if (isTerminalOutput) {
    console.log(yaml.dump(configObj));
  } else {
    await generateConfigFile(yaml.dump(configObj));
  }
};
