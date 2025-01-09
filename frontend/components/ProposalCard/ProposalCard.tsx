import { AspectRatio, Badge, Card, Group, Image, Text } from '@mantine/core';
import { Proposal } from '@/types/Proposal';
import { TagType } from '@/types/Tag';
import classes from './ProposalCard.module.css';

function getTagVariant(tagType: string) {
  const variants = {
    [TagType.department]: 'outline',
    [TagType.topic]: 'light',
  };
  return variants[tagType] || 'default';
}

const MAX_PILL_LENGTH = 5;
const MAX_TAGS_DISPLAYED = 3;

interface ProposalCardProps {
  data: Proposal;
  height?: string | number;
  width?: string | number;
}

export function ProposalCard({ data, height = '100%', width = 'auto' }: ProposalCardProps) {
  const tags = data.tags.slice(0, MAX_TAGS_DISPLAYED).map((tag) => (
    <Badge key={tag.id} tt="none" variant={getTagVariant(tag.tagType)}>
      {tag.tagType !== TagType.topic || tag.name.length <= MAX_PILL_LENGTH
        ? tag.name
        : `${tag.name.slice(0, MAX_PILL_LENGTH)}...`}
    </Badge>
  ));
  if (data.tags.length > MAX_TAGS_DISPLAYED) {
    tags.push(
      <Badge key="more" tt="none" variant={getTagVariant(TagType.topic)}>
        {`+${data.tags.length - MAX_TAGS_DISPLAYED} 更多`}
      </Badge>
    );
  }

  return (
    <Card
      withBorder
      radius="md"
      component="a"
      href={'/p/' + data.id}
      className={classes.card}
      h={height}
      w={width}
    >
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
