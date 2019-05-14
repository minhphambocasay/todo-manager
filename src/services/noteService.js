/* eslint-disable no-prototype-builtins */
import request from '@/utils/request';
import axios from 'axios';

export default async function getNotes() {
  return request(`/api/notes`);
}

let domain = 'https://project-2018-backend.herokuapp.com/';
// domain = 'http://localhost:8000/';

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
  };
  if (note && note.hasOwnProperty('is_done')) {
    data.is_done = note.is_done;
  } else if (note && note.hasOwnProperty('is_doing')) {
    data.is_doing = note.is_doing;
  } else if (note && note.hasOwnProperty('content')) {
    data.content = note.content;
  }
  return axios.post(`${domain}post/update`, data);
}

export function deleteNote(id) {
  const data = {
    id,
  };
  return axios.post(`${domain}post/delete`, data);
}
