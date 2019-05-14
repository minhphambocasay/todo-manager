import { getComments, postComment } from '@/services/commentsService';
import produce from 'immer';

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
    *postComment({ payload }, { call, put }) {
      const response = yield call(postComment, payload);
      yield put({
        type: 'postedComment',
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
    postedComment(state, { payload }) {
      const { user, comment } = payload;
      const commentsDraft = produce(state.comments, draft => {
        draft.unshift({
          id: state.comments.length,
          author: {
            name: user.name,
            avatar: user.avatar,
          },
          content: comment,
          likedNumber: 0,
          isLikedByMe: false,
        });
      });
      return {
        ...state,
        comments: commentsDraft,
      };
    },
  },
};
