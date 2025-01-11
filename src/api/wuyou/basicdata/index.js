import request from '@/utils/request'

// 创建无忧基础数据
export function createBasicData(data) {
  return request({
    url: '/wuyou/basic-data/create',
    method: 'post',
    data: data
  })
}

// 更新无忧基础数据
export function updateBasicData(data) {
  return request({
    url: '/wuyou/basic-data/update',
    method: 'put',
    data: data
  })
}

// 删除无忧基础数据
export function deleteBasicData(id) {
  return request({
    url: '/wuyou/basic-data/delete?id=' + id,
    method: 'delete'
  })
}

// 获得无忧基础数据
export function getBasicData(id) {
  return request({
    url: '/wuyou/basic-data/get?id=' + id,
    method: 'get'
  })
}

// 获得无忧基础数据分页
export function getBasicDataPage(params) {
  return request({
    url: '/wuyou/basic-data/page',
    method: 'get',
    params
  })
}
// 导出无忧基础数据 Excel
export function exportBasicDataExcel(params) {
  return request({
    url: '/wuyou/basic-data/export-excel',
    method: 'get',
    params,
    responseType: 'blob'
  })
}