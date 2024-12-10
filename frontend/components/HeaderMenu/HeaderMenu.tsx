import { IconChevronDown } from '@tabler/icons-react';
import { Burger, Button, Center, Container, Group, Menu } from '@mantine/core';
import { ActionToggle } from '@/components/ActionToggle/ActionToggle';
import { Logo } from '@/components/Logo/Logo';
import { links } from '@/data/links';
import classes from './HeaderMenu.module.css';

interface HeaderMenuProps {
  opened: boolean;
  toggle: () => void;
}

export function HeaderMenu({ opened, toggle }: HeaderMenuProps) {
  const items = links.map((link) => {
    const menuItems = link.links?.map((item) => (
      <Menu.Item key={item.link} component="a" href={item.link}>
        {item.label}
      </Menu.Item>
    ));

    if (menuItems) {
      return (
        <Menu key={link.label} trigger="hover" transitionProps={{ exitDuration: 0 }} withinPortal>
          <Menu.Target>
            <a
              href={link.link}
              className={classes.link}
              onClick={(event) => event.preventDefault()}
            >
              <Center>
                <span className={classes.linkLabel}>{link.label}</span>
                <IconChevronDown size="0.9rem" stroke={1.5} />
              </Center>
            </a>
          </Menu.Target>
          <Menu.Dropdown>{menuItems}</Menu.Dropdown>
        </Menu>
      );
    }

    return (
      <a
        key={link.label}
        href={link.link}
        className={classes.link}
        // onClick={(event) => event.preventDefault()}
      >
        {link.label}
      </a>
    );
  });

  return (
    <Container size="md">
      <div className={classes.inner}>
        <Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="sm" />
        <Logo size={28} />
        <Group gap={5} visibleFrom="sm">
          {items}
        </Group>
        <Group visibleFrom="sm">
          <Button variant="default">Log in</Button>
          <Button>Sign up</Button>
        </Group>
        <ActionToggle />
      </div>
    </Container>
  );
}
