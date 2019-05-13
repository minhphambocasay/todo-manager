import request from '@/utils/request';

export default async function getNotes() {
  return request(`/api/notes`);
}
