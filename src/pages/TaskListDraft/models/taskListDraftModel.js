import getComments from '@/services/commentsService';

export default {
  namespace: 'taskListDraftModel',
  state: {
    comments: [],
    initLoading: true,
  },
  effects: {
    *getComments({ payload }, { call, put }) {
      const response = yield call(getComments, payload);
      yield put({
        type: 'loadedComments',
        payload: response,
      });
    },
  },
  reducers: {
    loadedComments(state, { payload }) {
      return {
        ...state,
        comments: state.comments.concat(payload.comments),
        initLoading: false,
      };
    },
  },
};
