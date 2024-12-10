import Link from 'next/link';
import { Group, Image, Stack, Text } from '@mantine/core';
import classes from './Logo.module.css';

export function Logo({ size }: { size: number }) {
  return (
    <Link href="/" style={{ textDecoration: 'none' }}>
      <Group>
        <Image src="/logo.png" alt="Logo" h={size} w="auto" />
        <Stack gap={0} justify="center">
          <Text className={classes.disperse} size="lg" fw={700} c="SeaGreen" mb={-6}>
            國民之聲
          </Text>
          <Text className={classes.disperse} size="sm" fw={500} c="SeaGreen" mb={3}>
            Nation Voice
          </Text>
        </Stack>
      </Group>
    </Link>
  );
}
