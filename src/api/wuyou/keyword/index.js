import request from '@/utils/request'

// 创建无忧侵权词
export function createKeyword(data) {
  return request({
    url: '/wuyou/keyword/create',
    method: 'post',
    data: data
  })
}

// 更新无忧侵权词
export function updateKeyword(data) {
  return request({
    url: '/wuyou/keyword/update',
    method: 'put',
    data: data
  })
}

// 删除无忧侵权词
export function deleteKeyword(id) {
  return request({
    url: '/wuyou/keyword/delete?id=' + id,
    method: 'delete'
  })
}

// 获得无忧侵权词
export function getKeyword(id) {
  return request({
    url: '/wuyou/keyword/get?id=' + id,
    method: 'get'
  })
}

// 获得无忧侵权词分页
export function getKeywordPage(params) {
  return request({
    url: '/wuyou/keyword/page',
    method: 'get',
    params
  })
}
// 导出无忧侵权词 Excel
export function exportKeywordExcel(params) {
  return request({
    url: '/wuyou/keyword/export-excel',
    method: 'get',
    params,
    responseType: 'blob'
  })
}