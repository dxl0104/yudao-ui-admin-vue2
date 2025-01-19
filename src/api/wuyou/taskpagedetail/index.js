import request from '@/utils/request'

// 创建页数据采集状态
export function createTaskPageDetail(data) {
  return request({
    url: '/wuyou/task-page-detail/create',
    method: 'post',
    data: data
  })
}

// 更新页数据采集状态
export function updateTaskPageDetail(data) {
  return request({
    url: '/wuyou/task-page-detail/update',
    method: 'put',
    data: data
  })
}

// 删除页数据采集状态
export function deleteTaskPageDetail(id) {
  return request({
    url: '/wuyou/task-page-detail/delete?id=' + id,
    method: 'delete'
  })
}

// 获得页数据采集状态
export function getTaskPageDetail(id) {
  return request({
    url: '/wuyou/task-page-detail/get?id=' + id,
    method: 'get'
  })
}

// 获得页数据采集状态分页
export function getTaskPageDetailPage(params) {
  return request({
    url: '/wuyou/task-page-detail/page',
    method: 'get',
    params
  })
}
// 导出页数据采集状态 Excel
export function exportTaskPageDetailExcel(params) {
  return request({
    url: '/wuyou/task-page-detail/export-excel',
    method: 'get',
    params,
    responseType: 'blob'
  })
}