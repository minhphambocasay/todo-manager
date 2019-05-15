/* eslint-disable no-prototype-builtins */
import request from '@/utils/request';
// import axios from 'axios';

export default async function getNotes() {
  return request(`/api/notes`);
}
const domain = 'https://project-2018-backend.herokuapp.com/';
// domain = 'http://localhost:8001/';

export function getAllNotesRequest() {
  return request.get(`${domain}posts/all`);
}

export function createNoteRequest(note) {
  const data = {
    content: note,
  };
  return request.post(`${domain}post/create`, { data });
}

export function updateNoteRequest(note) {
  const data = {
    id: note.id,
  };
  if (note && note.hasOwnProperty('is_done')) {
    data.is_done = note.is_done;
  } else if (note && note.hasOwnProperty('is_doing')) {
    data.is_doing = note.is_doing;
  } else if (note && note.hasOwnProperty('content')) {
    data.content = note.content;
  } else if (note && note.hasOwnProperty('assignee_id')) {
    data.assignee_id = note.assignee_id;
  } else if (note && note.hasOwnProperty('progress_percent')) {
    data.progress_percent = note.progress_percent;
  }
  return request.post(`${domain}post/update`, { data });
}

export function deleteNoteRequest(id) {
  const data = {
    id,
  };
  return request.post(`${domain}post/delete`, { data });
}
