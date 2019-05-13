import getNotes from '@/services/noteService';

export default {
  namespace: 'noteModel',
  state: {
    notes: [],
  },
  effects: {
    *getNotes({ payload }, { call, put }) {
      const response = yield call(getNotes, payload);
      yield put({
        type: 'loadedNotes',
        payload: response,
      });
    },
  },
  reducers: {
    loadedNotes(state, { payload }) {
      return {
        ...state,
        notes: payload.notes,
      };
    },
  },
};
