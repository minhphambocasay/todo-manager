import request from '@/utils/request';

export async function getMembers() {
  return request('/api/members');
}

export async function getMemberDetail(id) {
  return request(`/api/members/${id}`);
}
