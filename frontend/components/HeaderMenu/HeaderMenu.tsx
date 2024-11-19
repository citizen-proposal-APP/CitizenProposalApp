import React, { useState } from 'react';
import { IconChevronDown } from '@tabler/icons-react';
import { Burger, Button, Center, Container, Group, Menu, Modal } from '@mantine/core';
import { ActionToggle } from '@/components/ActionToggle/ActionToggle';
import { Logo } from '@/components/Logo/Logo';
import { links } from '@/data/links';
import classes from './HeaderMenu.module.css';
import { AuthenticationTitle } from '@/pages/Auth/SignIn/SignIn';
import { SignUp } from '@/pages/Auth/SignUp/SignUp';

interface HeaderMenuProps {
  opened: boolean;
  toggle: () => void;
}

export function HeaderMenu({ opened, toggle }: HeaderMenuProps) {
  const [authModalOpen, setAuthModalOpen] = useState(false); // 控制 Modal 的開關
  const [isSignUp, setIsSignUp] = useState(false); // 控制是登入還是註冊

  // 打開 Modal
  const openAuthModal = (signUp = false) => {
    setIsSignUp(signUp);
    setAuthModalOpen(true);
  };

  // 切換登入或註冊
  const toggleAuthPage = () => {
    setIsSignUp((prev) => !prev);
  };

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
      <a key={link.label} href={link.link} className={classes.link}>
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
          {/* 按下按鈕打開對應 Modal */}
          <Button variant="default" onClick={() => openAuthModal(false)}>Log in</Button>
          <Button onClick={() => openAuthModal(true)}>Sign up</Button>
        </Group>
        <ActionToggle />
      </div>

      {/* Modal 彈出視窗 */}
      <Modal
        opened={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        // title={isSignUp ? 'Sign Up' : 'Log In'}
        title={null}
      >
        {isSignUp ? (
          <SignUp onToggle={toggleAuthPage} />
        ) : (
          <AuthenticationTitle onToggle={toggleAuthPage} />
        )}
      </Modal>
    </Container>
  );
}
