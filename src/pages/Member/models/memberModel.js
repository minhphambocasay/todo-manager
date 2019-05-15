import { getMembers, getMemberDetail, editMemberDetail } from '@/services/memberService';
import { notification } from 'antd';
import pathToRegexp from 'path-to-regexp';

export default {
  namespace: 'memberModel',

  state: {
    members: [],
    member: null,
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        const match = pathToRegexp('/members/:action/:userId').exec(pathname);
        if (match) {
          const userId = match[2];
          dispatch({
            type: 'fetchMemberDetail',
            payload: userId,
          });
        }
      });
    },
  },

  effects: {
    *fetchMembers(_, { call, put }) {
      try {
        const response = yield call(getMembers);
        yield put({
          type: 'fetchedMembers',
          payload: response,
        });
      } catch (error) {
        console.log('Error', error);
      }
    },
    *fetchMemberDetail({ payload }, { call, put }) {
      try {
        const response = yield call(getMemberDetail, payload);
        yield put({
          type: 'fetchedMemberDetail',
          payload: response,
        });
      } catch (error) {
        console.log('Error', error);
      }
    },
    *updateMemberDetail({ payload }, { call, put }) {
      try {
        const response = yield call(editMemberDetail, payload);
        yield put({
          type: 'updatedMemberDetail',
          payload: { updatedMember: payload, response },
        });
        notification.success({
          message: 'Update Member',
          description: 'This member is updated successfully',
        });
      } catch (error) {
        console.log('Error', error);
      }
    },
  },

  reducers: {
    fetchedMembers(state, { payload }) {
      return {
        ...state,
        members: payload.members,
      };
    },
    fetchedMemberDetail(state, { payload }) {
      return {
        ...state,
        member: payload,
      };
    },
    updatedMemberDetail(state, { payload }) {
      return {
        ...state,
        member: payload.updatedMember,
      };
    },
  },
};
