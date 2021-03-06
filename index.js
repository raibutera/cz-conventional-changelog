// This can be any kind of SystemJS compatible module.
// We use Commonjs here, but ES6 or AMD would do just 
// fine.
module.exports = {

  // When a user runs `git cz`, prompter will
  // be executed. We pass you cz, which currently
  // is just an instance of inquirer.js. Using
  // this you can ask questions and get answers.
  // 
  // The commit callback should be executed when
  // you're ready to send back a commit template
  // to git. 
  // 
  // By default, we'll de-indent your commit
  // template and will keep empty lines.
  prompter: function(cz, commit) {

    console.log('\nAll commit message lines will be cropped at 100 characters.\n');
    
    // Let's ask some questions of the user
    // so that we can populate our commit 
    // template. 
    //
    // See inquirer.js docs for specifics.
    // You can also opt to use another input
    // collection library if you prefer.
    cz.prompt([
      {
        type: 'list',
        name: 'type',
        message: 'Select the type of change that you\'re committing:',
        choices: [
        {
          name: 'feat:     A new feature',
          value: 'feat'
        }, {
          name: 'fix:      A bug fix',
          value: 'fix'
        }, {
          name: 'docs:     Documentation only changes',
          value: 'docs'
        }, {
          name: 'style:    Changes that do not affect the meaning of the code\n            (white-space, formatting, missing semi-colons, etc)',
          value: 'style'
        }, {
          name: 'refactor: A code change that neither fixes a bug or adds a feature',
          value: 'refactor'
        }, {
          name: 'perf:     A code change that improves performance',
          value: 'perf'
        }, {
          name: 'test:     Adding missing tests',
          value: 'test'
        }, {
          name: 'chore:    Changes to the build process or auxiliary tools\n            and libraries such as documentation generation',
          value: 'chore'
        }]
      }, {
        type: 'input',
        name: 'scope',
        message: 'Denote the scope of this change ($location, $browser, $compile, etc.):\n'
      }, {
        type: 'input',
        name: 'subject',
        message: 'Write a short, imperative tense description of the change:\n'
      }, {
        type: 'input',
        name: 'body',
        message: 'Provide a longer description of the change:\n'
      }, {
        type: 'input',
        name: 'footer',
        message: 'List any breaking changes or issues closed by this change:\n'
      }
    ], function(answers) {

      // Plug the answers into our template
      // By default, we dedent this for you
      commit(answers.type + '(' + answers.scope + '): ' + answers.subject.slice(0, 100) + '\n\n' + answers.body.slice(0, 100) + '\n\n' + answers.footer.slice(0, 100));
    });
  }
}
