module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-sass-guidelines',
    'stylelint-config-recess-order',
  ],
  rules: {
    'order/properties-alphabetical-order': null,
  },
  defaultSeverity: 'warning',
};
