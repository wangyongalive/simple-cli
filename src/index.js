import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'


// 1.使用 yargs 进行命令参数的解析
// hideBin is a shorthand for process.argv.slice(2). 
// console.log(hideBin(process.argv), 'hideBin(process.argv)')
yargs(hideBin(process.argv))
  .command(
    ['copy', 'c'],
    'Copy a new template from local file',
    function (yargs) {
      // 2.设置子命令
      // inquirer中已经询问过用户名了 这里可以删除
      // return yargs.option('name', {
      //   alias: 'n',
      //   demand: true,
      //   describe: '模板名称',
      //   type: 'string'
      // })
    },
    (argv) => {
      // console.log(argv)
      import('./copy/index.js').then(({ default: parseOptions }) => {
        parseOptions(argv);
      });
    }
  )
  .parse()
