import React, { useState } from 'react';
import { AppShell } from '@mantine/core';
import { HeaderMenu } from '@/components/HeaderMenu/HeaderMenu';
import { NavbarNested } from '@/components/NavbarNested/NavbarNested';

interface LayoutProps {
  children: React.ReactNode;
  aside?: React.ReactNode;
}

export function Layout({ children, aside }: LayoutProps) {
  const [opened, setOpened] = useState(false);
  const toggle = () => setOpened(!opened);

  const [asideOpened, setAsideOpened] = useState(false);

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { desktop: true, mobile: !opened } }}
      aside={{
        width: 350,
        breakpoint: 'sm',
        collapsed: { desktop: !aside || !asideOpened, mobile: !aside || !asideOpened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <HeaderMenu opened={opened} toggle={toggle} />
      </AppShell.Header>

      <AppShell.Navbar px="md">
        <NavbarNested />
      </AppShell.Navbar>

      <AppShell.Aside p="md">{aside}</AppShell.Aside>

      <AppShell.Main>
        {aside && <button onClick={() => setAsideOpened(!asideOpened)}>Toggle Aside</button>}
        {/* FIXME: remove this button */}
        {children}
      </AppShell.Main>
    </AppShell>
  );
}
