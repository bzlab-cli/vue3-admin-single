/*
 * @Author: jrucker
 * @Description:
 * @Date: 2021/10/25 18:56:51
 * @LastEditors: jrucker
 * @LastEditTime: 2023/08/17 11:43:59
 */

export enum RouterMode {
  Hash = 'hash',
  History = 'history'
}

export class Keys {
  static sidebarStatusKey = 'sidebarStatusKey'
  static tokenKey = 'nzf-token'
  static projectId = 'projectId'
}

export enum Settings {
  title = '后台管理',
  logo = '/assets/images/home/logo.png'
}

export function getEnv(val) {
  let obj = {
    development: 'nzf-dev',
    deployment: 'nzf-dev',
    test: 'nzf-test',
    production: 'nzf-prod'
  }
  return obj[val]
}
