const fs = require('fs');
const yaml = require('js-yaml');

function loadConfig() {
  let awsConfigFilename = './aws-config.yml';
  const overrideConfigFilename = './aws-config.override.yml';

  if (fs.existsSync(overrideConfigFilename)) {
    awsConfigFilename = overrideConfigFilename;
  }
  return yaml.safeLoad(fs.readFileSync(awsConfigFilename), 'utf8');
};

function templateInput({ inputTemplateFilename, config, templatedInputFilename }) {
  const inputTemplate = JSON.parse(fs.readFileSync(inputTemplateFilename));
  const templatedInput = {...inputTemplate, config};
  return fs.writeFileSync(templatedInputFilename, JSON.stringify(templatedInput, null, 2));
};

module.exports = {
  loadConfig,
  templateInput
};
