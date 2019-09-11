import fs from 'fs'
import { prompt } from 'inquirer'
import initiator from '../initiator'

async function initTemplate () {
  const questions = [{
    type: 'input',
    name: 'proName',
    message: '为项目设置名称:',
    validate(val:string) {
      let result: string | boolean = true
      if (!val) {
        result = '项目名称不能为空!'
      }
      if (fs.existsSync(val)) {
        result = '项目名称已存在！'
      }
      return result
    }
  },
  {
    type: 'list',
    name: 'tpl',
    message: '请选择模板:',
    choices: ['vue-单页面 CSR 渲染模板', 'vue-单页面 SSR 渲染模板', 'vue-多页面 CSR 渲染模板', '微信小程序 基础模板']
  },
  {
    type: 'input',
    name: 'branch',
    message: '模板的分支:',
    default: 'master'
  }]

  prompt(questions).then(async ({ proName, tpl, branch }) => {
    const pwd = process.cwd()
    const targetPath = `${pwd}/${proName}`
    initiator({ tpl, branch, targetPath })
  }).catch((error) => {
    console.error(error)
  })
}

export default initTemplate
