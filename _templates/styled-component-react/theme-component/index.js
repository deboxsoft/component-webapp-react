module.exports = {
  prompt: ({ prompter }) => {
    const question = [
      {
        type: 'input',
        name: 'path',
        message: 'path name (relative theme)?'
      },
      {
        type: 'input',
        name: 'name',
        message: 'component name?'
      }
    ];
    return prompter.prompt(question).then(answer => {
      return answer;
    });
  }
};
