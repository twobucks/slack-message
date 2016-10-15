const log = require('npmlog')
const Spinner = require('cli-spinner').Spinner

function showErrors(errors) {
  // errors needs to be an array
  errors.forEach(e => {
    log.warn(e);
    process.stdout.write('\n');
  });
}

function startSpinner(text, type) {
  const spinner = new Spinner(text)
  spinner.setSpinnerString(type)
  spinner.start()
  return spinner
}

module.exports = {
  showErrors,
  startSpinner
}
