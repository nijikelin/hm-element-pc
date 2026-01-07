import request from '@/utils/request'
export const getArticleList = ({ current, pageSize }) =>
  request.get('/admin/interview/query', {
    params: {
      current,
      pageSize
    }
  })
export const createArticle = ({ stem, content }) =>
  request.post('/admin/interview/create', { stem, content })
export const delArticle = (id) =>
  request.delete('/admin/interview/remove', { data: { id } })
export const getArticleDetail = (id) =>
  request.get('/admin/interview/show', {
    params: {
      id
    }
  })
export const updateArticle = ({ id, stem, content }) =>
  request.put('/admin/interview/update',
    { id, stem, content }
  )
