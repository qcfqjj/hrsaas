import request from '@/utils/request'

export function login(data) {
  request({
    url: '/sys/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {}

export function logout() {}

export function getUserInfo() {
  return request({
    url: '/sys/profile',
    method: 'post'
  })
}
