import request from '@/utils/request'

// 创建采集任务
export function createTask(data) {
  return request({
    url: '/wuyou/task/create',
    method: 'post',
    data: data
  })
}

// 更新采集任务
export function updateTask(data) {
  return request({
    url: '/wuyou/task/update',
    method: 'put',
    data: data
  })
}

// 删除采集任务
export function deleteTask(id) {
  return request({
    url: '/wuyou/task/delete?id=' + id,
    method: 'delete'
  })
}

// 获得采集任务
export function getTask(id) {
  return request({
    url: '/wuyou/task/get?id=' + id,
    method: 'get'
  })
}

// 获得采集任务分页
export function getTaskPage(params) {
  return request({
    url: '/wuyou/task/page',
    method: 'get',
    params
  })
}
// 导出采集任务 Excel
export function exportTaskExcel(params) {
  return request({
    url: '/wuyou/task/export-excel',
    method: 'get',
    params,
    responseType: 'blob'
  })
}