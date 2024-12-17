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
      aside={{ width: '25%', breakpoint: 'sm', collapsed: { desktop: true, mobile: !asideOpened } }}
      padding="md"
    >
      <AppShell.Header>
        <HeaderMenu opened={opened} toggle={toggle} />
      </AppShell.Header>
      {opened && (
        <AppShell.Navbar px="md">
          <NavbarNested />
        </AppShell.Navbar>
      )}
      <AppShell.Main>{children}</AppShell.Main>
      {aside && <AppShell.Aside p="md">{aside}</AppShell.Aside>}
    </AppShell>
  );
}
