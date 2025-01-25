import request from '@/utils/request'

// 创建数据类别
export function createCategory(data) {
  return request({
    url: '/wuyou/category/create',
    method: 'post',
    data: data
  })
}

// 更新数据类别
export function updateCategory(data) {
  return request({
    url: '/wuyou/category/update',
    method: 'put',
    data: data
  })
}

// 删除数据类别
export function deleteCategory(id) {
  return request({
    url: '/wuyou/category/delete?id=' + id,
    method: 'delete'
  })
}

// 获得数据类别
export function getCategory(id) {
  return request({
    url: '/wuyou/category/get?id=' + id,
    method: 'get'
  })
}

// 获得数据类别列表
export function getCategoryList(params) {
  return request({
    url: '/wuyou/category/list',
    method: 'get',
    params
  })
}
// 导出数据类别 Excel
export function exportCategoryExcel(params) {
  return request({
    url: '/wuyou/category/export-excel',
    method: 'get',
    params,
    responseType: 'blob'
  })
}