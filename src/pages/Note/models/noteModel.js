import {
  getAllNotesRequest,
  createNoteRequest,
  deleteNoteRequest,
  updateNoteRequest,
} from '@/services/noteService';

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
        yield createNoteRequest(payload);
        yield put({
          type: 'createNoteSuccess',
          payload: {},
        });
        yield put({ type: 'getAllNotes' });
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
        const updateNoteObj = response.data.post;
        yield put({
          type: 'updateNoteSuccess',
          payload: updateNoteObj,
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
          payload: {},
        });
        yield put({ type: 'getAllNotes' });
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
    createNoteSuccess(state) {
      return {
        ...state,
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
      return {
        ...state,
        updatedNote: payload,
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
    deleteNoteSuccess(state) {
      return {
        ...state,
      };
    },
    deleteNoteError(state) {
      return {
        ...state,
      };
    },
  },
};
