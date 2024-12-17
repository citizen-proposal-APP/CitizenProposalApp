// import { useState } from 'react';
import { IconSearch } from '@tabler/icons-react';
import { TextInput } from '@mantine/core';

export function KeywordSearch() {
  // const [search, setSearch] = useState('');

  // const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const { value } = event.currentTarget;
  //   setSearch(value);
  //   // setSortedData(sortData(data, { sortBy, reversed: reverseSortDirection, search: value }));
  // };

  return (
    <TextInput
      placeholder="輸入關鍵字"
      mb="md"
      leftSection={<IconSearch size={16} />}
      // value={search}
      // onChange={handleSearchChange}
    />
  );
}
