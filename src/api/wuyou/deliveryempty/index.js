import request from '@/utils/request'

// 创建快递为零商品
export function createDeliveryEmpty(data) {
  return request({
    url: '/wuyou/delivery-empty/create',
    method: 'post',
    data: data
  })
}

// 更新快递为零商品
export function updateDeliveryEmpty(data) {
  return request({
    url: '/wuyou/delivery-empty/update',
    method: 'put',
    data: data
  })
}

// 删除快递为零商品
export function deleteDeliveryEmpty(id) {
  return request({
    url: '/wuyou/delivery-empty/delete?id=' + id,
    method: 'delete'
  })
}

// 获得快递为零商品
export function getDeliveryEmpty(id) {
  return request({
    url: '/wuyou/delivery-empty/get?id=' + id,
    method: 'get'
  })
}

// 获得快递为零商品分页
export function getDeliveryEmptyPage(params) {
  return request({
    url: '/wuyou/delivery-empty/page',
    method: 'get',
    params
  })
}
// 导出快递为零商品 Excel
export function exportDeliveryEmptyExcel(params) {
  return request({
    url: '/wuyou/delivery-empty/export-excel',
    method: 'get',
    params,
    responseType: 'blob'
  })
}