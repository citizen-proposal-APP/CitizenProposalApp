'use client';

import React, { useState } from 'react';
import { AppShell } from '@mantine/core';
import { HeaderMenu } from '@/components/HeaderMenu/HeaderMenu';
import { NavbarNested } from '@/components/NavbarNested/NavbarNested';

export function Layout({ children }: { children: React.ReactNode }) {
  const [opened, setOpened] = useState(false);
  const toggle = () => setOpened(!opened);

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { desktop: true, mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <HeaderMenu opened={opened} toggle={toggle} />
      </AppShell.Header>
      <AppShell.Navbar px="calc(var(--mantine-spacing-md))">
        {opened && <NavbarNested />}
      </AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
