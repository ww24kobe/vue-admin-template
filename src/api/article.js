import request from '@/utils/request'

export function getArticle(params) {
  return request({
    url: '/getarticle',
    method: 'get',
    params
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
