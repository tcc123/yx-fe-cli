export interface Download {
  tpl:string,
  branch:string,
  targetPath:string
}

export interface DownloadResult {
  status: number,
  msg: string
}