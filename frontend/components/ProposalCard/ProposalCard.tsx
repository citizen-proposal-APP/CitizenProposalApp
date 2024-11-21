import { AspectRatio, Badge, Card, Group, Image, Text } from '@mantine/core';
import { Proposal } from '@/types/Proposal';
import { TagType } from '@/types/Tag';
import classes from './ProposalCard.module.css';

export function ProposalCard({ data }: { data: Proposal }) {
  const tags = data.tags.map((tag) => (
    <Badge key={tag.id} tt="none" variant={tag.tagType === TagType.department ? 'white' : 'light'}>
      {tag.name}
    </Badge>
  ));

  return (
    <Card withBorder radius="md" component="a" href="#" className={classes.card}>
      <AspectRatio ratio={16 / 9}>
        <Image src={data.thumbnail} />
      </AspectRatio>
      <Text c="dimmed" size="xs" fw="bold" mt="md">
        {data.postedTime.split('T')[0]}
      </Text>
      <Text fw="bold" mt={5} truncate="end">
        {data.title}
      </Text>
      <Group mt="md" gap="sm">
        {tags}
      </Group>
    </Card>
  );
}
