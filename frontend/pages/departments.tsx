import { Container, SimpleGrid, Title } from '@mantine/core';
import { Layout } from '@/components/Layout/Layout';
import { LinkCard } from '@/components/LinkCard/LinkCard';
import departments from '@/data/departments.json';

export default function Departments() {
  return (
    <Layout>
      <Container size="lg">
        <Title order={2} mb="md">
          認識部門
        </Title>
        <SimpleGrid cols={{ base: 1, sm: 3 }}>
          {departments.map((item) => (
            <LinkCard data={item} key={item.title} />
          ))}
        </SimpleGrid>
      </Container>
    </Layout>
  );
}
