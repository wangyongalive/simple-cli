import inquirer from 'inquirer';
import path from 'path';

// 交互式询问列表
// type：提问的类型，有 input、confirm、list、checkbox。
// name：存储当前问题答案的变量。
// message: 问题的描述。
// default: 默认值。
// choices: 选项列表。
// validate：对用户答案进行校验。
// filter：对用户答案进行过滤，并返回处理后的值。

function inquirerPrompt(argv) {
  const { name } = argv;
  return new Promise((resolve, reject) => {
    inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Project name',
        default: name,
        validate: function (val) {
          if (!/^[a-zA-Z]+$/.test(val)) {
            return "The template name can only contain English";
          }
          if (!/^[A-Z]/.test(val)) {
            return "The first letter of the template name must be capitalized"
          }
          return true;
        },
      },
      {
        type: 'list',
        name: 'type',
        message: 'Choose Template type',
        choices: ['form', 'dynamicForm', 'nestedForm'],
        filter: function (value) {
          return {
            'form': "form",
            'dynamicForm': "dynamicForm",
            'nestedForm': "nestedForm",
          }[value];
        },
      },
      {
        type: 'list',
        message: 'Choose Frame type',
        choices: ['vue', 'react'],
        name: 'frame',
      }
    ]).then(answers => {
      // frame取到所选的值
      const { frame } = answers;
      if (frame === 'react') {
        inquirer.prompt([
          {
            type: 'list',
            message: 'Choose UI Library',
            choices: [
              'Ant Design',
            ],
            name: 'library',
          }
        ]).then(answers1 => {
          resolve({
            ...answers,
            ...answers1,
          })
        }).catch(error => {
          reject(error)
        })
      }

      if (frame === 'vue') {
        inquirer.prompt([
          {
            type: 'list',
            message: 'Choose UI Library',
            choices: ['Element'],
            name: 'library',
          }
        ]).then(answers2 => {
          resolve({
            ...answers,
            ...answers2,
          })
        }).catch(error => {
          reject(error)
        })
      }
    }).catch(error => {
      reject(error)
    })
  })
}

const isOverride = async (name, targetDir) => {

  return new Promise((resolve, reject) => {
    inquirer.prompt([
      {
        name: 'action',
        type: 'list',
        message: `${name} is existed, do you want to overwrite this directory`,
        choices: [
          { name: 'overwrite', value: true },
          { name: 'cancel', value: false },
        ],
      },
    ]).then(options => {
      const { action } = options
      resolve(action)
    })
  })
}



export { inquirerPrompt, isOverride }
