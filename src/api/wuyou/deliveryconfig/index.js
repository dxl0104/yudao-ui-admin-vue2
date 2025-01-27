import request from '@/utils/request'

// 创建快递费归档
export function createDeliveryConfig(data) {
  return request({
    url: '/wuyou/delivery-config/create',
    method: 'post',
    data: data
  })
}

// 更新快递费归档
export function updateDeliveryConfig(data) {
  return request({
    url: '/wuyou/delivery-config/update',
    method: 'put',
    data: data
  })
}

// 删除快递费归档
export function deleteDeliveryConfig(id) {
  return request({
    url: '/wuyou/delivery-config/delete?id=' + id,
    method: 'delete'
  })
}

// 获得快递费归档
export function getDeliveryConfig(id) {
  return request({
    url: '/wuyou/delivery-config/get?id=' + id,
    method: 'get'
  })
}

// 获得快递费归档分页
export function getDeliveryConfigPage(params) {
  return request({
    url: '/wuyou/delivery-config/page',
    method: 'get',
    params
  })
}
// 导出快递费归档 Excel
export function exportDeliveryConfigExcel(params) {
  return request({
    url: '/wuyou/delivery-config/export-excel',
    method: 'get',
    params,
    responseType: 'blob'
  })
}