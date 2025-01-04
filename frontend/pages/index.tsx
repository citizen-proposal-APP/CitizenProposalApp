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

const images = [
  '/mockdata/homepage_images/6hJVKZ6.jpg',
  '/mockdata/homepage_images/FT7SQUvaIAAWKdh.jpg',
  '/mockdata/homepage_images/1024px-Archlinux__.jpg',
  '/mockdata/homepage_images/IMG_8410.jpg',
  '/mockdata/homepage_images/IMG_8505.jpg',
  '/mockdata/homepage_images/tumblr_or4jabpmXV1rcvimbo1_540.webp',
  '/mockdata/homepage_images/tumblr_osceeuuOP51tiivhqo1_540.webp',
  '/mockdata/homepage_images/IMG_8872.jpg',
  '/mockdata/homepage_images/jKae0YF.jpeg',
];

export default function HomePage() {
  const items = data.map((item) => <ProposalCard data={item} key={item.id} height="auto" />);

  return (
    <Layout
      aside={
        <>
          <Title order={4} mb="sm">
            排序結果
          </Title>
          <NativeSelect
            //  value={value}
            //  onChange={(event) => setValue(event.currentTarget.value)}
            data={['根據議題 ID 升序', '根據議題 ID 升序', '根據發佈時間升序', '根據發佈時間降序']}
            mb="xl"
          />

          <Title order={4} mb="sm">
            選擇相關標籤
          </Title>
          <MultiSelect
            placeholder="標籤名稱"
            data={['eee', 'ddd', 'ccc', 'bbb', 'aaa']}
            limit={5}
            hidePickedOptions
            searchable
            clearable
            nothingFoundMessage="找不到標籤"
            mb="xl"
          />

          <Title order={4} mb="sm">
            根據發佈者查詢
          </Title>
          <Select
            placeholder="使用者名稱"
            data={['蔡維元', '蔡元培', '陸維元', '高為元', '高位元']}
            limit={5}
            searchable
            clearable
            nothingFoundMessage="找不到使用者"
          />
        </>
      }
    >
      <Container size="xl">
        <ImageCarousel images={images} />
        <Title order={2} mt="md" mb="md">
          熱門議題
        </Title>
        <KeywordSearch />
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
