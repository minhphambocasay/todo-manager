import request from '@/utils/request';

export async function getComments(params) {
  return request('/api/comments', {
    method: 'GET',
    data: {
      ...params,
    },
  });
}

export async function postComment(params) {
  return request('/api/comments', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function updateLikeNumber(params) {
  return request('/api/comments', {
    method: 'PUT',
    data: {
      ...params,
    },
  });
}
