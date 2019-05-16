import React, { useState, useCallback, useEffect } from 'react';
import { Select } from 'antd';
// import styles from './index.less';
// import request from '@/utils/request';
import { updateNoteRequest } from '@/services/noteService';

const dataArr = [
  {
    login: 'Minh',
  },
  {
    login: 'Cris',
  },
  {
    login: 'Thang',
  },
  {
    login: 'Son',
  },
];
const { Option } = Select;
const SearchBox = ({ dataObj }) => {
  const [data, setData] = useState([]);
  const [value, setValue] = useState(dataObj.assignee_id);
  let timeoutSearch;

  useEffect(() => {}, []);
  const handleSearch = useCallback(e => {
    if (timeoutSearch) clearTimeout(timeoutSearch);
    timeoutSearch = setTimeout(() => {
      // request(`https://api.github.com/search/users?q=${e}`)
      //   .then(response => {
      //     if (response && response.items) {
      //       setData(response.items);
      //     }
      //   })
      //   .catch(error => {
      //     console.log(error);
      //   });
      const newRegex = new RegExp(e, 'i');
      const filteredData = dataArr.filter(item => newRegex.test(item.login));
      setData(filteredData);
    }, 300);
  }, []);

  const handleFocus = useCallback(() => {
    setData(dataArr);
  }, []);

  const handleChange = useCallback(value1 => {
    setValue(value1);
    updateNoteRequest({ id: dataObj.id, assignee_id: value1 });
  }, []);

  const options = data.map(d => <Option key={d.login}>{d.login}</Option>);

  return (
    <div>
      <Select
        disabled={dataObj.is_done}
        showSearch
        value={value}
        placeholder="Enter github username"
        style={{ width: 200 }}
        defaultActiveFirstOption={false}
        showArrow={false}
        filterOption={false}
        onSearch={handleSearch}
        onChange={handleChange}
        notFoundContent={null}
        onFocus={handleFocus}
      >
        {options}
      </Select>
    </div>
  );
};

export default SearchBox;
