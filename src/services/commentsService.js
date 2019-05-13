import request from '@/utils/request';

export default async function getComments(params) {
  return request('/api/comments', {
    method: 'GET',
    data: {
      ...params,
    },
  });
}
