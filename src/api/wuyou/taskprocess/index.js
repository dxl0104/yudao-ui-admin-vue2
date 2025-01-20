import request from '@/utils/request'

// 创建任务进度
export function createTaskProcess(data) {
  return request({
    url: '/wuyou/task-process/create',
    method: 'post',
    data: data
  })
}

// 更新任务进度
export function updateTaskProcess(data) {
  return request({
    url: '/wuyou/task-process/update',
    method: 'put',
    data: data
  })
}

// 删除任务进度
export function deleteTaskProcess(id) {
  return request({
    url: '/wuyou/task-process/delete?id=' + id,
    method: 'delete'
  })
}

// 获得任务进度
export function getTaskProcess(id) {
  return request({
    url: '/wuyou/task-process/get?id=' + id,
    method: 'get'
  })
}

// 获得任务进度分页
export function getTaskProcessPage(params) {
  return request({
    url: '/wuyou/task-process/page',
    method: 'get',
    params
  })
}
// 导出任务进度 Excel
export function exportTaskProcessExcel(params) {
  return request({
    url: '/wuyou/task-process/export-excel',
    method: 'get',
    params,
    responseType: 'blob'
  })
}