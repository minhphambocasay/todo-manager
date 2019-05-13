import request from '@/utils/request';
import axios from 'axios';

export default async function getNotes() {
  return request(`/api/notes`);
}

const domain = 'https://project-2018-backend.herokuapp.com/';

export function getAllNotes() {
  return request.get(`${domain}posts/all`);
}

export function createNote(note) {
  const data = {
    content: note,
  };
  return axios.post(`${domain}post/create`, data);
}

export function updateNote(note) {
  const data = {
    id: note.id,
    is_done: note.is_done,
  };
  return axios.post(`${domain}post/update`, data);
}

export function deleteNote(id) {
  const data = {
    id,
  };
  return axios.post(`${domain}post/delete`, data);
}
