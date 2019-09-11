import ora from 'ora'
import rimraf from 'rimraf'
import chalk from 'chalk'
import gitclone from 'git-clone'
import { Download, DownloadResult } from "./types"

const rm = rimraf.sync
const spinner = ora('正在下载模板...')

const doDownload = (from:string, targetPath:string):Promise<DownloadResult> => {
  spinner.start()
  return new Promise((resolve, reject) => {
    var options = {
      checkout: 'master',
      shallow: true
    }
    gitclone(from, targetPath, options, function (err) {
      if (err) {
        reject({
          status: 0,
          msg: err
        })
      } else {
        rm(targetPath + '/.git')
      }
      spinner.stop()
      resolve({
        status: 1,
        msg: `新项目已经初始化成功! 目录在： \n${targetPath}`
      })
    })
  })
}

const initiator = async ({ tpl, branch, targetPath }: Download) => {
  let dlFrom = ''
  let result: DownloadResult

  try {
    switch (tpl) {
      case 'vue-单页面 SSR 渲染模板':
        dlFrom = 'git@git.iyunxiao.com:FE/vue-singlePage-scaffold-SSR.git'
        result = await doDownload(dlFrom, targetPath)
        break;
      case 'vue-多页面 CSR 渲染模板':
        dlFrom = 'git@git.iyunxiao.com:FE/vue-multiPage-scaffold.git'
        result = await doDownload(dlFrom, targetPath)
        break;
      case '微信小程序 基础模板':
        dlFrom = 'git@git.iyunxiao.com:shulianwang/miniprogram_scaffold.git'
        result = await doDownload(dlFrom, targetPath)
        break;
      default:
        dlFrom = 'git@git.iyunxiao.com:FE/vue-singlePage-scaffold.git'
        result = await doDownload(dlFrom, targetPath)
        break;
    }
  } catch (error) {
    console.error(error)
  }


  console.log(result.status ? chalk.green(result.msg) : chalk.red(result.msg))
}

export default initiator
