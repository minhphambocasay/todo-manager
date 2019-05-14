import { getAllNotes, createNote, deleteNote, updateNote } from '@/services/noteService';

export default {
  namespace: 'noteModel',
  state: {
    notes: [],
    udpatedNote: null,
  },
  effects: {
    *GET_ALL_NOTES(_, { put }) {
      try {
        const response = yield getAllNotes();
        let data = [];
        if (response && response.posts) {
          data = response.posts;
        }
        yield put({
          type: 'GET_ALL_NOTES_SUCCESS',
          payload: data,
        });
      } catch (error) {
        yield put({
          type: 'GET_ALL_NOTES_ERROR',
          payload: error,
        });
      }
    },
    *CREATE_NOTE({ payload }, { put }) {
      try {
        yield createNote(payload);
        yield put({
          type: 'CREATE_NOTE_SUCCESS',
          payload: {},
        });
        yield put({ type: 'GET_ALL_NOTES' });
      } catch (error) {
        yield put({
          type: 'CREATE_NOTE_ERROR',
          payload: {},
        });
      }
    },
    *UPDATE_NOTE({ payload }, { put }) {
      try {
        const response = yield updateNote(payload);
        const updateNoteObj = response.data.post;
        yield put({
          type: 'UPDATE_NOTE_SUCCESS',
          payload: updateNoteObj,
        });
        yield put({ type: 'GET_ALL_NOTES' });
      } catch (error) {
        yield put({
          type: 'UPDATE_NOTE_ERROR',
          payload: {},
        });
      }
    },
    *DELETE_NOTE({ payload }, { put }) {
      try {
        yield deleteNote(payload.id);
        yield put({
          type: 'DELETE_NOTE_SUCCESS',
          payload: {},
        });
        yield put({ type: 'GET_ALL_NOTES' });
      } catch (error) {
        yield put({
          type: 'DELETE_NOTE_ERROR',
          payload: {},
        });
      }
    },
  },
  reducers: {
    GET_ALL_NOTES_SUCCESS(state, { payload }) {
      console.log(payload);
      return {
        ...state,
        notes: payload.sort((a, b) => a.id - b.id),
      };
    },
    GET_ALL_NOTES_ERROR(state, { payload }) {
      return {
        ...state,
        notes: payload.error,
      };
    },
    DELETE_NOTE_SUCCESS(state) {
      return {
        ...state,
      };
    },
    UPDATE_NOTE_SUCCESS(state, { payload }) {
      return {
        ...state,
        updatedNote: payload,
      };
    },
  },
};
