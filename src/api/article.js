import request from '@/utils/request'

export function getArticle(params) {
  return request({
    url: '/getarticle',
    method: 'get',
    params
  })
}

export function getOneArticle(id) {
  return request({
    url: '/getonearticle/'+id,
    method: 'get'
  })
}

export function delArticle(params) {
  return request({
    url: '/delarticle',
    method: 'post',
    data:params
  })
}

export function addArticle(params) {
  return request({
    url: '/addarticle',
    method: 'post',
    data:params
  })
}

export function updArticle(params) {
  return request({
    url: '/updarticle',
    method: 'post',
    data:params
  })
}
