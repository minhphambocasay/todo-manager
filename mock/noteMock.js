import { delay } from 'roadhog-api-doc';

const proxy = {
  'GET /api/notes': {
    notes: [
      {
        id: 0,
        name: 'note_1',
        content: 'This is note 1',
      },
      {
        id: 1,
        name: 'note_1',
        content: 'This is note 1',
      },
    ],
  },
};

export default delay(proxy, 2000);
