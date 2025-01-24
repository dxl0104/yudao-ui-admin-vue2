import request from '@/utils/request'

// 创建侵权商品
export function createViolateProduct(data) {
  return request({
    url: '/wuyou/violate-product/create',
    method: 'post',
    data: data
  })
}

// 更新侵权商品
export function updateViolateProduct(data) {
  return request({
    url: '/wuyou/violate-product/update',
    method: 'put',
    data: data
  })
}

// 删除侵权商品
export function deleteViolateProduct(id) {
  return request({
    url: '/wuyou/violate-product/delete?id=' + id,
    method: 'delete'
  })
}
export function recoverViolateProduct(id) {
  return request({
    url: '/wuyou/violate-product/recover?id=' + id,
    method: 'delete'
  })
}
// 获得侵权商品
export function getViolateProduct(id) {
  return request({
    url: '/wuyou/violate-product/get?id=' + id,
    method: 'get'
  })
}

// 获得侵权商品分页
export function getViolateProductPage(params) {
  return request({
    url: '/wuyou/violate-product/page',
    method: 'get',
    params
  })
}
// 导出侵权商品 Excel
export function exportViolateProductExcel(params) {
  return request({
    url: '/wuyou/violate-product/export-excel',
    method: 'get',
    params,
    responseType: 'blob'
  })
}
