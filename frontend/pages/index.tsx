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
import { Configuration, TagsApi, UsersApi } from '@/openapi'; // 引入TagsApi
import data from '@/public/mockdata/proposals.json';
import { Tag } from '@/types/Tag';
import { User } from '@/types/User';
import { ImageCarousel } from '../components/ImageCarousel/ImageCarousel';

interface Image {
  image: string;
  link: string;
}

const images: Image[] = [
  {
    image: 'https://www.president.gov.tw/File/Image/d2991fab-d5bc-4c51-89be-7b4b68b8cc63',
    link: 'https://www.president.gov.tw/NEWS/38981',
  },
  {
    image: 'https://www.president.gov.tw/File/Image/94cb58f2-296f-45f4-b284-645b60184311',
    link: 'https://www.president.gov.tw/NEWS/38980',
  },
  {
    image: 'https://www.president.gov.tw/File/Image/4ca562f8-b176-4e0e-87f4-7859ea11bb4f',
    link: 'https://www.president.gov.tw/NEWS/38979',
  },
  {
    image: 'https://www.president.gov.tw/File/Image/c89b6f07-e610-4c8d-bfaa-8fc51e3c08c6',
    link: 'https://www.president.gov.tw/NEWS/38978',
  },
  {
    image: 'https://www.president.gov.tw/File/Image/fe2679b6-6bef-4508-b229-1a9a0f6b4df1',
    link: 'https://www.president.gov.tw/NEWS/38977',
  },
  {
    image: 'https://www.president.gov.tw/File/Image/01981287-82d0-4efb-8b5b-08cb3e017c44',
    link: 'https://www.president.gov.tw/NEWS/38976',
  },
  {
    image: 'https://www.president.gov.tw/File/Image/07d63591-3aed-42a7-a443-303ba0e87e7a',
    link: 'https://www.president.gov.tw/NEWS/38975',
  },
  {
    image: 'https://www.president.gov.tw/File/Image/9bf00f47-2724-4820-a50e-3573677cbdd9',
    link: 'https://www.president.gov.tw/NEWS/38974',
  },
  {
    image: 'https://www.president.gov.tw/File/Image/adbd1e08-3ccb-409c-bd66-1426714ed8fd',
    link: 'https://www.president.gov.tw/NEWS/38973',
  },
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
      setTagList([]);
    } else {
      try {
        const response = await tagsApi.apiTagsGet({ keyword: keyword });
        setTagList(response.tags);
      } catch (error) {
        console.error('錯誤: ', error);
      }
    }
  };

  const searchAuthorList = async (keyword: string) => {
    if (keyword.length == 0) {
      setAuthorList([]);
    } else {
      try {
        const response = await usersApi.apiUsersGet({ keyword: keyword });
        setAuthorList(response.users);
      } catch (error) {
        console.error('錯誤: ', error);
      }
    }
  };
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
          熱門議題
        </Title>
        <KeywordSearch sortOption={sortOption} tags={tagNameValue} author={author} />
        <SimpleGrid cols={{ base: 1, sm: 3 }} mt="md">
          {Array.from({ length: 3 }).map((_, index) => (
            <Stack key={index}>
              {items.slice((index * items.length) / 3, ((index + 1) * items.length) / 3)}
            </Stack>
          ))}
        </SimpleGrid>
      </Container>
    </Layout>
  );
}
