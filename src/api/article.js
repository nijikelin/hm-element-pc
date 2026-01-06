import request from '@/utils/request'
export const getArticleList = ({ current, pageSize }) =>
  request.get('/admin/interview/query', {
    params: {
      current,
      pageSize
    }
  })
