/*eslint camelcase: 0*/
module.exports = {
  uiRouter: {
    files: {
      "tmp/uiRouter": ["test/fixtures/ui-router.js"]
    },
    options: {
      hideAngularServices: true
    }
  },
  uiBootstrap: {
    files: {
      "tmp/uiBootstrap": ["test/fixtures/ui-bootstrap.js"]
    }
  }
};
