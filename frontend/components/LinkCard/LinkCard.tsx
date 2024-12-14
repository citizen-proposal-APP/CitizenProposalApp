import { Box, Card, Group, Image, Text } from '@mantine/core';
import { Link, LinkStyleType } from '@/types/Link';
import classes from './LinkCard.module.css';

export function LinkCard({ data }: { data: Link }) {
  return (
    <Card withBorder radius="md" component="a" href={data.link} className={classes.card}>
      <Group>
        <Box w={60} h={60}>
          <Image
            src={data.thumbnail}
            w={60}
            h={60}
            fit="contain"
            radius="sm"
            bg={data.style === LinkStyleType.whiteBg ? 'white' : undefined}
            p={data.style === LinkStyleType.whiteBg ? 3 : undefined}
          />
        </Box>
        <Text className={classes.title}>{data.title}</Text>
      </Group>
    </Card>
  );
}
