import React, { useState, useCallback, useEffect } from 'react';
import { Select } from 'antd';
// import styles from './index.less';
import request from '@/utils/request';
import { updateNoteRequest } from '@/services/noteService';

const { Option } = Select;
const SearchBox = ({ dataObj }) => {
  const [data, setData] = useState([]);
  const [value, setValue] = useState(dataObj.assignee_id);
  let timeoutSearch;

  useEffect(() => {}, []);
  const handleSearch = useCallback(e => {
    if (timeoutSearch) clearTimeout(timeoutSearch);
    timeoutSearch = setTimeout(() => {
      console.log(e);
      request(`https://api.github.com/search/users?q=${e}`)
        .then(response => {
          if (response && response.items) {
            setData(response.items);
          }
        })
        .catch(error => {
          console.log(error);
        });
    }, 300);
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
      >
        {options}
      </Select>
    </div>
  );
};

export default SearchBox;
