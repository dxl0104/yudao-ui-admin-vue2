import request from '@/utils/request'

// 创建采集器信息
export function createDevice(data) {
  return request({
    url: '/wuyou/device/create',
    method: 'post',
    data: data
  })
}

// 更新采集器信息
export function updateDevice(data) {
  return request({
    url: '/wuyou/device/update',
    method: 'put',
    data: data
  })
}

// 删除采集器信息
export function deleteDevice(id) {
  return request({
    url: '/wuyou/device/delete?id=' + id,
    method: 'delete'
  })
}

// 获得采集器信息
export function getDevice(id) {
  return request({
    url: '/wuyou/device/get?id=' + id,
    method: 'get'
  })
}

// 获得采集器信息分页
export function getDevicePage(params) {
  return request({
    url: '/wuyou/device/page',
    method: 'get',
    params
  })
}
// 导出采集器信息 Excel
export function exportDeviceExcel(params) {
  return request({
    url: '/wuyou/device/export-excel',
    method: 'get',
    params,
    responseType: 'blob'
  })
}