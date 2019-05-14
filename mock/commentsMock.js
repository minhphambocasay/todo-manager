import { delay } from 'roadhog-api-doc';

const proxy = {
  'GET /api/comments': {
    comments: [
      {
        id: 0,
        author: {
          name: 'Tuan Anh',
          avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        },
        content: 'This is the first comment',
        likedNumber: 5,
        isLikedByMe: false,
      },
      {
        id: 1,
        author: {
          name: 'Minh',
          avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        },
        content: 'This is the second comment',
        likedNumber: 1,
        isLikedByMe: true,
      },
      {
        id: 2,
        author: {
          name: 'Son',
          avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        },
        content: 'This is the third comment',
        likedNumber: 0,
        isLikedByMe: false,
      },
    ],
  },
  'POST /api/comments': (req, res) => {
    const { comment, user } = req.body;
    res.send({ status: 'ok', comment, user });
  },
};

export default delay(proxy, 2000);
