import { delay } from 'roadhog-api-doc';

const memberMock = {
  'GET /api/members': {
    members: [
      {
        id: 1,
        title: 'Developer',
        first_name: 'Anh',
        last_name: 'Dao',
        email: 'anh.dao@bocasay.com',
        address: 'Hanoi, Vietnam',
        mobile_phone: '0986505983',
        avatar:
          'https://cdn.itviec.com/employers/bocasay/logo/social/4QrC4cCjzmMTfyrw4xhEEHT3/bocasay-logo.png',
        group: 'Bocasay Hanoi',
      },
      {
        id: 2,
        first_name: 'Thang',
        last_name: 'Nguyen',
        title: 'Teamleader',
        email: 'thang.nguyen@bocasay.com',
        address: 'Quang Ninh, Vietnam',
        mobile_phone: '0985555555',
        avatar:
          'https://cdn.itviec.com/employers/bocasay/logo/social/4QrC4cCjzmMTfyrw4xhEEHT3/bocasay-logo.png',
        group: 'Bocasay Hanoi',
      },
      {
        id: 3,
        first_name: 'Son',
        last_name: 'Nguyen',
        title: 'Developer',
        email: 'son.nguyen@bocasay.com',
        address: 'Thai Nguyen, Vietnam',
        mobile_phone: '0986666666',
        avatar:
          'https://cdn.itviec.com/employers/bocasay/logo/social/4QrC4cCjzmMTfyrw4xhEEHT3/bocasay-logo.png',
        group: 'Bocasay Hanoi',
      },
      {
        id: 4,
        first_name: 'Minh',
        last_name: 'Pham',
        title: 'Developer',
        email: 'minh.pham@bocasay.com',
        address: 'Hanoi, Vietnam',
        mobile_phone: '09888888888',
        avatar:
          'https://cdn.itviec.com/employers/bocasay/logo/social/4QrC4cCjzmMTfyrw4xhEEHT3/bocasay-logo.png',
        group: 'Bocasay Hanoi',
      },
      {
        id: 5,
        first_name: 'Minh',
        last_name: 'Vu',
        title: 'Project Manager',
        email: 'minh.vu@bocasay.com',
        address: 'Hanoi, Vietnam',
        mobile_phone: '0989999999',
        avatar:
          'https://cdn.itviec.com/employers/bocasay/logo/social/4QrC4cCjzmMTfyrw4xhEEHT3/bocasay-logo.png',
        group: 'Bocasay Hanoi',
      },
      {
        id: 5,
        first_name: 'Chien',
        last_name: 'Chien',
        title: 'Developer',
        email: 'chien.chien@bocasay.com',
        address: 'Hanoi, Vietnam',
        mobile_phone: '0984444444',
        avatar:
          'https://cdn.itviec.com/employers/bocasay/logo/social/4QrC4cCjzmMTfyrw4xhEEHT3/bocasay-logo.png',
        group: 'Bocasay Hanoi',
      },
      {
        id: 6,
        first_name: 'Huong',
        last_name: 'Ho',
        title: 'HR Manager',
        email: 'huong.ho@bocasay.com',
        address: 'Hanoi, Vietnam',
        mobile_phone: '0983333333',
        avatar:
          'https://cdn.itviec.com/employers/bocasay/logo/social/4QrC4cCjzmMTfyrw4xhEEHT3/bocasay-logo.png',
        group: 'Bocasay Hanoi',
      },
      {
        id: 7,
        first_name: 'Tristan',
        last_name: 'Bocasay',
        title: 'Manager',
        email: 'tristan@bocasay.com',
        address: 'Paris, France',
        mobile_phone: '0981111111',
        avatar:
          'https://cdn.itviec.com/employers/bocasay/logo/social/4QrC4cCjzmMTfyrw4xhEEHT3/bocasay-logo.png',
        group: 'Bocasay Hanoi',
      },
    ],
  },
  'GET /api/members/1': {
    id: 1,
    first_name: 'Anh',
    last_name: 'Dao',
    title: 'React Js Developer',
    email: 'anh.dao@bocasay.com',
    address: 'Hanoi, Vietnam',
    mobile_phone: '0986505983',
    avatar:
      'https://cdn.itviec.com/employers/bocasay/logo/social/4QrC4cCjzmMTfyrw4xhEEHT3/bocasay-logo.png',
    group: 'Bocasay Hanoi',
  },
  'PUT /api/members/1': (req, res) => {
    res.send({ status: 'ok' });
  },
};

export default delay(memberMock, 1000);
