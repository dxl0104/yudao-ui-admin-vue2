import request from '@/utils/request'

// 创建折扣规则
export function createDiscountRules(data) {
  return request({
    url: '/wuyou/discount-rules/create',
    method: 'post',
    data: data
  })
}

// 更新折扣规则
export function updateDiscountRules(data) {
  return request({
    url: '/wuyou/discount-rules/update',
    method: 'put',
    data: data
  })
}

// 删除折扣规则
export function deleteDiscountRules(id) {
  return request({
    url: '/wuyou/discount-rules/delete?id=' + id,
    method: 'delete'
  })
}

// 获得折扣规则
export function getDiscountRules(id) {
  return request({
    url: '/wuyou/discount-rules/get?id=' + id,
    method: 'get'
  })
}

// 获得折扣规则分页
export function getDiscountRulesPage(params) {
  return request({
    url: '/wuyou/discount-rules/page',
    method: 'get',
    params
  })
}
// 导出折扣规则 Excel
export function exportDiscountRulesExcel(params) {
  return request({
    url: '/wuyou/discount-rules/export-excel',
    method: 'get',
    params,
    responseType: 'blob'
  })
}