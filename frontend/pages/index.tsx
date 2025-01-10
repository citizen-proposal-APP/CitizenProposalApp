import { useState } from 'react';
import {
  Container,
  MultiSelect,
  NativeSelect,
  Select,
  SimpleGrid,
  Stack,
  Title,
} from '@mantine/core';
import { KeywordSearch } from '@/components/KeywordSearch/KeywordSearch';
import { Layout } from '@/components/Layout/Layout';
import { ProposalCard } from '@/components/ProposalCard/ProposalCard';
import data from '@/public/mockdata/proposals.json';
import { ImageCarousel } from '../components/ImageCarousel/ImageCarousel';
import { Configuration, TagsApi, UsersApi } from '@/openapi'; // 引入TagsApi
import { Tag } from '@/types/Tag';
import { User } from '@/types/User';

const images = [
  '/mockdata/homepage_images/6hJVKZ6.jpg',
  '/mockdata/homepage_images/FT7SQUvaIAAWKdh.jpg',
  '/mockdata/homepage_images/1024px-Archlinux__.jpg',
  '/mockdata/homepage_images/IMG_8410.jpg',
  '/mockdata/homepage_images/IMG_8505.jpg',
  '/mockdata/homepage_images/tumblr_or4jabpmXV1rcmbito1_540.webp',
  '/mockdata/homepage_images/tumblr_osceeuuOP51tiivhqo1_540.webp',
  '/mockdata/homepage_images/IMG_8872.jpg',
  '/mockdata/homepage_images/jKae0YF.jpeg',
];


const configuration = new Configuration({
  basePath: process.env.NEXT_PUBLIC_BASE_PATH!,
  credentials: 'include',
});

const tagsApi = new TagsApi(configuration);
const usersApi = new UsersApi(configuration);

export default function HomePage() {
  const items = data.map((item) => <ProposalCard data={item} key={item.id} height="auto" />);
  const [sortOption, setSortOption] = useState('根據議題 ID 升序');
  const [author, setAuthor] = useState('');
  const [tagList, setTagList] = useState<any[]>([]); // 用來儲存搜尋的標籤選項
  const [tagNameValue, setTagNameValue] = useState<string[]>([]);
  const [authorList, setAuthorList] = useState<any[]>([]); 

  // 根據關鍵字搜尋標籤
  function extractTagNames(tags: Tag[]): string[] {
    return tags.map((tag) => tag.name);
  }

  function extractAuthorNames(users: User[]): string[] {
    return users.map((users) => users.username);
  }

  const searchTagList = async (keyword: string) => {
    if (keyword.length == 0) {
      setTagList([])
    }
    else {
      try {
        const response = await tagsApi.apiTagsGet({keyword: keyword})
        setTagList(response.tags)
      } catch (error) {
        console.error("錯誤: ", error);
      }
    }
  }

  const searchAuthorList = async (keyword: string) => {
    if (keyword.length == 0) {
      setAuthorList([])
    }
    else {
      try {
        const response = await usersApi.apiUsersGet({keyword: keyword})
        setAuthorList(response.users)
      } catch (error) {
        console.error("錯誤: ", error);
      }
    }
  }
  return (
    <Layout
      aside={
        <>
          <Title order={4} mb="sm">
            排序結果
          </Title>
          <NativeSelect
            value={sortOption}
            onChange={(event) => setSortOption(event.currentTarget.value)}
            data={['根據議題 ID 升序', '根據議題 ID 降序', '根據發佈時間升序', '根據發佈時間降序']}
            mb="xl"
          />

          <Title order={4} mb="sm">
            選擇相關標籤
          </Title>
          <MultiSelect
            placeholder="搜尋標籤"
            data={extractTagNames(tagList)} 
            value={tagNameValue}
            onChange={setTagNameValue}
            limit={10}
            hidePickedOptions
            searchable
            clearable
            nothingFoundMessage="找不到標籤"
            onSearchChange={(keyword) => searchTagList(keyword)} 
            mb="xl"
          />

          <Title order={4} mb="sm">
            根據發佈者查詢
          </Title>
          <Select
            placeholder="使用者名稱"
            data={extractAuthorNames(authorList)}
            limit={10}
            searchable
            clearable
            nothingFoundMessage="找不到使用者"
            onSearchChange={(keyword) => searchAuthorList(keyword)} 
            onChange={(value) => setAuthor(value || '')}
          />
        </>
      }
    >
      <Container size="xl">
        <ImageCarousel images={images} />
        <Title order={2} mt="md" mb="md">
          提案
        </Title>
        <KeywordSearch sortOption={sortOption} tags={tagNameValue} author={author} />
      </Container>
    </Layout>
  );
}
