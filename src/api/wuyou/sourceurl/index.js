import request from '@/utils/request'

// 创建列表链接
export function createSourceUrl(data) {
  return request({
    url: '/wuyou/source-url/create',
    method: 'post',
    data: data
  })
}

// 更新列表链接
export function updateSourceUrl(data) {
  return request({
    url: '/wuyou/source-url/update',
    method: 'put',
    data: data
  })
}

// 删除列表链接
export function deleteSourceUrl(id) {
  return request({
    url: '/wuyou/source-url/delete?id=' + id,
    method: 'delete'
  })
}

// 获得列表链接
export function getSourceUrl(id) {
  return request({
    url: '/wuyou/source-url/get?id=' + id,
    method: 'get'
  })
}

// 获得列表链接分页
export function getSourceUrlPage(params) {
  return request({
    url: '/wuyou/source-url/page',
    method: 'get',
    params
  })
}
// 导出列表链接 Excel
export function exportSourceUrlExcel(params) {
  return request({
    url: '/wuyou/source-url/export-excel',
    method: 'get',
    params,
    responseType: 'blob'
  })
}