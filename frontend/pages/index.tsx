import { Container, SimpleGrid, Stack, Title } from '@mantine/core';
import { Layout } from '@/components/Layout/Layout';
import { ProposalCard } from '@/components/ProposalCard/ProposalCard';
import data from '@/public/mockdata/proposals.json';

export default function HomePage() {
  const items = data.map((item) => <ProposalCard data={item} key={item.id} />);

  return (
    <Layout>
      <Container size="xl">
        <Title order={2} mt="xl" mb="md">
          熱門議題
        </Title>
        <SimpleGrid cols={{ base: 1, sm: 3 }}>
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
