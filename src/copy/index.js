import path from 'path';
import copydir from 'copy-dir';
import fs from 'fs-extra';
import { inquirerPrompt, isOverride } from './inquirer'

const parseOptions = (argv) => {
  inquirerPrompt(argv).then(answers => {
    console.log(answers, 'answers')
    const { name, type } = answers;
    const targetDir = path.resolve(process.cwd(), `./${name}`)
    const isMkdirExists = checkMkdirExists(targetDir);
    if (isMkdirExists) {
      isOverride(name, targetDir).then(async action => {
        // console.log('action', action)
        // 依据返回值 判断是否覆盖
        if (!action) {
          return;
        } else {
          console.log('\r\noverwriting...');
          await fs.remove(targetDir);
          console.log('overwrite done');
          copyDir(
            path.resolve(__dirname, `./template/${type}`),
            path.resolve(process.cwd(), `./${name}`)
          )
        }
      })
    } else {
      // 拷贝文件夹
      copyDir(
        path.resolve(__dirname, `./template/${type}`),
        path.resolve(process.cwd(), `./${name}`)
      )
    }
  })

}

// 拷贝文件夹
function copyDir(from, to, options) {
  copydir.sync(from, to, options);
}

// 路径判断
function checkMkdirExists(path) {
  return fs.existsSync(path)
};

export default parseOptions
