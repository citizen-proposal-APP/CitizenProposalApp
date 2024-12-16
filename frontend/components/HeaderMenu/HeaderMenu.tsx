import React, { use, useState } from 'react';
import { IconChevronDown } from '@tabler/icons-react';
import { Burger, Button, Center, Container, Group, Menu, Modal } from '@mantine/core';
import { ActionToggle } from '@/components/ActionToggle/ActionToggle';
import { AuthenticationTitle } from '@/components/Auth/SignIn/SignIn';
import { SignUp } from '@/components/Auth/SignUp/SignUp';
import { Logo } from '@/components/Logo/Logo';
import { links } from '@/data/links';
import { Configuration, UsersApi } from '@/openapi';
import classes from './HeaderMenu.module.css';

const configuration = new Configuration({
  basePath: 'http://localhost:8080',
});
const usersApi = new UsersApi(configuration);

interface HeaderMenuProps {
  opened: boolean;
  toggle: () => void;
}

export function HeaderMenu({ opened, toggle }: HeaderMenuProps) {
  const [authModalOpen, setAuthModalOpen] = useState(false); // 控制 Modal 的開關
  const [isSignUp, setIsSignUp] = useState(false); // 控制是登入還是註冊
  const [username, setUsername] = useState<string | null>(null); // 管理登入狀態和使用者名稱

  // 打開 Modal
  const openAuthModal = (signUp = false) => {
    setIsSignUp(signUp);
    setAuthModalOpen(true);
  };

  // 切換登入或註冊
  const toggleAuthPage = () => {
    setIsSignUp((prev) => !prev);
  };

  // 登出
  const handleLogout = async () => {
    try {
      await usersApi.apiUsersLogoutDelete();
      setUsername(null); // 清除登入狀態
      console.log('使用者已成功登出');
    } catch (error) {
      console.error('登出失敗:', error);
    }
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
          {username ? (
            <>
              {/* <username> 按鈕 */}
              <Button
                variant="subtle"
                onClick={() => console.log('跳轉到個人頁面')} // 這裡加上個人頁面邏輯
              >
                {username}，您好
              </Button>
              <Button variant="default" onClick={handleLogout}>
                登出
              </Button>
            </>
          ) : (
            <>
              <Button variant="default" onClick={() => openAuthModal(false)}>
                Log in
              </Button>
              <Button onClick={() => openAuthModal(true)}>Sign up</Button>
            </>
          )}
        </Group>
        <ActionToggle />
      </div>

      {/* Modal 彈出視窗 */}
      <Modal
        opened={authModalOpen}
        onClose={() => setAuthModalOpen(false)} // 傳遞關閉 Modal 的邏輯
      >
        {isSignUp ? (
          <SignUp
            onToggle={toggleAuthPage} // 切換到登入
            onClose={() => setAuthModalOpen(false)} // 關閉 Modal
            onLoginSuccess={(user) => setUsername(user)} // 設定使用者名稱
          />
        ) : (
          <AuthenticationTitle
            onToggle={toggleAuthPage} // 切換到註冊
            onClose={() => setAuthModalOpen(false)} // 關閉 Modal
            onLoginSuccess={(user) => setUsername(user)} // 設定使用者名稱
          />
        )}
      </Modal>
    </Container>
  );
}
