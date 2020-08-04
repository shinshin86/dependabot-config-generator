#! /usr/bin/env node

const { generate } = require('./yaml');
const {
  inputPackageManager,
  inputDirectory,
  inputUpdateSchedule,
  inputUpdateTyep,
  inputOutputType,
} = require('./cli-inputs');

(async () => {
  const packageManager = await inputPackageManager();

  const directory = await inputDirectory();

  const updateSchedule = await inputUpdateSchedule(packageManager);

  const updateType = await inputUpdateTyep();

  const outputType = await inputOutputType();

  const isTerminalOutput = outputType === 'terminal';

  generate(
    packageManager,
    directory,
    updateSchedule,
    updateType,
    isTerminalOutput
  );
})();
