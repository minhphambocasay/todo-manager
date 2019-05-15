/* eslint-disable no-param-reassign */
import {
  getAllNotesRequest,
  createNoteRequest,
  deleteNoteRequest,
  updateNoteRequest,
} from '@/services/noteService';
import produce from 'immer';

export default {
  namespace: 'noteModel',
  state: {
    notes: [],
    udpatedNote: null,
  },
  effects: {
    *getAllNotes(_, { put }) {
      try {
        const response = yield getAllNotesRequest();
        let data = [];
        if (response && response.posts) {
          data = response.posts;
        }
        yield put({
          type: 'getAllNotesSuccess',
          payload: data,
        });
      } catch (error) {
        yield put({
          type: 'getAllNotesError',
          payload: error,
        });
      }
    },
    *createNote({ payload }, { put }) {
      try {
        const response = yield createNoteRequest(payload);
        const createdNote = response.post;
        yield put({
          type: 'createNoteSuccess',
          payload: createdNote,
        });
      } catch (error) {
        yield put({
          type: 'createNoteError',
          payload: {},
        });
      }
    },
    *updateNote({ payload }, { put }) {
      try {
        const response = yield updateNoteRequest(payload);
        const updatedNoteObj = response.post;
        yield put({
          type: 'updateNoteSuccess',
          payload: updatedNoteObj,
        });
      } catch (error) {
        yield put({
          type: 'updateNoteError',
          payload: {},
        });
      }
    },
    *deleteNote({ payload }, { put }) {
      try {
        yield deleteNoteRequest(payload.id);
        yield put({
          type: 'deleteNoteSuccess',
          payload: payload.id,
        });
      } catch (error) {
        yield put({
          type: 'deleteNoteError',
          payload: {},
        });
      }
    },
  },
  reducers: {
    getAllNotes(state) {
      return {
        ...state,
      };
    },
    getAllNotesSuccess(state, { payload }) {
      return {
        ...state,
        notes: payload.sort((a, b) => a.id - b.id),
      };
    },
    getAllNotesError(state, { payload }) {
      return {
        ...state,
        notes: payload.error,
      };
    },
    createNote(state) {
      return {
        ...state,
      };
    },
    createNoteSuccess(state, { payload }) {
      const createdNote = payload;
      const updatedNotes = state.notes.concat(createdNote);
      return {
        ...state,
        notes: updatedNotes,
      };
    },
    createNoteError(state) {
      return {
        ...state,
      };
    },
    updateNote(state) {
      return {
        ...state,
      };
    },
    updateNoteSuccess(state, { payload }) {
      const updatedNote = payload;
      const notesDraft = produce(state.notes, draft => {
        const index = draft.findIndex(note => note.id === updatedNote.id);
        draft[index] = updatedNote;
      });
      return {
        ...state,
        notes: notesDraft,
      };
    },
    updateNoteError(state) {
      return {
        ...state,
      };
    },
    deleteNote(state) {
      return {
        ...state,
      };
    },
    deleteNoteSuccess(state, { payload }) {
      const deletedNoteId = payload;
      const notesDraft = produce(state.notes, draft => {
        const index = draft.findIndex(note => note.id === deletedNoteId);
        draft.splice(index, 1);
      });
      return {
        ...state,
        notes: notesDraft,
      };
    },
    deleteNoteError(state) {
      return {
        ...state,
      };
    },
  },
};
