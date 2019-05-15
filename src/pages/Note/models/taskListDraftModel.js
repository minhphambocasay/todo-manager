/* eslint-disable no-param-reassign */
import { getComments, postComment, updateLikeNumber } from '@/services/commentsService';
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
    *updateLikeNumber({ payload }, { call, put }) {
      const response = yield call(updateLikeNumber, payload);
      yield put({
        type: 'updatedLikeNumber',
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
    updatedLikeNumber(state, { payload }) {
      const { commentId } = payload;
      const commentsDraft = produce(state.comments, draft => {
        const index = draft.findIndex(comment => comment.id === commentId);
        draft[index].likedNumber += draft[index].isLikedByMe ? -1 : 1;
        draft[index].isLikedByMe = !draft[index].isLikedByMe;
      });

      return {
        ...state,
        comments: commentsDraft,
      };
    },
  },
};
