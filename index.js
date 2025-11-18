#! /usr/bin/env node

const { generate } = require('./yaml');
const {
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
} = require('./cli-inputs');

(async () => {
  const isAdvancedOption = process.argv[2] === 'advanced';

  const packageManager = await inputPackageManager();

  const directory = await inputDirectory();

  const updateSchedule = await inputUpdateSchedule(packageManager);

  const updateType = await inputUpdateTyep();

  const outputType = await inputOutputType();

  const isTerminalOutput = outputType === 'terminal';

  let targetBranch;
  let defaultReviewers;
  let defaultAssignees;
  let defaultLabels;
  let defaultMilestone;
  if (isAdvancedOption) {
    targetBranch = await inputTargetBranch();
    defaultReviewers = await inputDefaultReviewers();
    defaultAssignees = await inputDefaultAssignees();
    defaultLabels = await inputDefaultLabels();
    defaultMilestone = await inputDefaultMilestone();

    // TODO:
    // const allowedUpdates = await inputAllowedUpdates();
    // const ignoreUpdates = await inputIgnoreUpdates();
    // const versionRequirementsUpdates =  await inputVersionRequirementsUpdates();
    // const commitMessage = await inputCommitMessage();
  }

  generate({
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
  });
})();
