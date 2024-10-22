import Image from 'next/image';
import { Group, Text } from '@mantine/core';

export function Logo({ size }: { size: number }) {
  return (
    <Group>
      <Image src="/logo.png" alt="Logo" width={size} height={size} />
      <Text size="xl" fw={700} ml={-10} c="SeaGreen">
        網站名佔位符
      </Text>
    </Group>
  );
}
