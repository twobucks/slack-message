const log = require('npmlog')
const Spinner = require('cli-spinner').Spinner

function showErrors(errors) {
  // errors needs to be an array
  for (const key in errors) {
    // skip loop if the property is from prototype
    if (!errors.hasOwnProperty(key)) { // eslint-disable-line no-prototype-builtins
      continue
    }
    log.warn(errors[key][0])
    process.stdout.write('\n')
  }
  return errors
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
