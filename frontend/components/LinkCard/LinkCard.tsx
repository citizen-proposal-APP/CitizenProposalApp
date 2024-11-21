import { Card, Group, Image, Text } from '@mantine/core';
import { Link } from '@/types/Link';
import classes from './LinkCard.module.css';

export function LinkCard({ data }: { data: Link }) {
  return (
    <Card withBorder radius="md" component="a" href={data.link} className={classes.card}>
      <Group>
        <Image src={data.thumbnail} h={60} radius="sm" />
        <Text className={classes.title}>{data.title}</Text>
      </Group>
    </Card>
  );
}
