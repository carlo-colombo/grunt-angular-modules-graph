module.exports = {
  main: {
    src: [
      'test/fixtures/aFolder/another-module',
      'test/fixtures/fake-module'
    ],
    options: {
      ignore: ["node_modules"]
    }
  },
  regex: {
    src: ['test/fixtures/**/*']
  }
}
