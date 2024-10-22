import { AppShell } from '@mantine/core';
import { HeaderMenu } from '@/components/HeaderMenu/HeaderMenu';
import { Welcome } from '../components/Welcome/Welcome';

export default function HomePage() {
  return (
    <AppShell>
      <AppShell.Header withBorder={false}>
        <HeaderMenu />
      </AppShell.Header>
      <AppShell.Main>
        <Welcome />
      </AppShell.Main>
    </AppShell>
  );
}
