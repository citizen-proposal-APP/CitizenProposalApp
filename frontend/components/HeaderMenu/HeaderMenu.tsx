import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
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
  basePath: process.env.NEXT_PUBLIC_BASE_PATH,
  credentials: 'include',
});
const usersApi = new UsersApi(configuration);

interface HeaderMenuProps {
  opened: boolean;
  toggle: () => void;
}

export function HeaderMenu({ opened, toggle }: HeaderMenuProps) {
  const [authModalOpen, setAuthModalOpen] = useState(false); // 控制 Modal 的開關
  const [isSignUp, setIsSignUp] = useState(false); // 控制是登入還是註冊
  const [user, setUser] = useState<{ id: number; username: string } | null>(null); // 管理登入狀態

  const router = useRouter();

  useEffect(() => {
    async function checkLoginStatus() {
      try {
        const userData = await usersApi.apiUsersCurrentGet();
        if (userData?.id && userData?.username) {
          setUser({ id: userData.id, username: userData.username });
          console.log('使用者已登入:', userData);
        } else {
          console.log('尚未登入');
        }
      } catch (error) {
        console.error('檢查登入狀態失敗:', error);
      }
    }

    checkLoginStatus();
  }, []);

  // 打開 Modal
  const openAuthModal = (signUp = false) => {
    setIsSignUp(signUp);
    setAuthModalOpen(true);
  };

  // 切換登入或註冊
  const toggleAuthPage = () => {
    setIsSignUp((prev) => !prev);
  };

  // 登入成功
  const handleLoginSuccess = (data: { id: number; username: string }) => {
    setUser(data); // 設定登入狀態
    console.log('登入成功:', data);
  };

  // 登出
  const handleLogout = async () => {
    try {
      await usersApi.apiUsersLogoutDelete();
      setUser(null); // 清除登入狀態
      console.log('使用者已成功登出');
    } catch (error: any) {
      console.error('登出失敗:', error);
      window.alert('登出失敗，請稍後再試');
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
          {user ? (
            <>
              {/* <username> 按鈕 */}
              <Button
                variant="subtle"
                onClick={() => router.push(`/u/${user.id}`)} // 跳轉到個人頁面
              >
                {user.username}，您好
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
            onLoginSuccess={handleLoginSuccess} // 設定使用者名稱
          />
        ) : (
          <AuthenticationTitle
            onToggle={toggleAuthPage} // 切換到註冊
            onClose={() => setAuthModalOpen(false)} // 關閉 Modal
            onLoginSuccess={handleLoginSuccess}
          />
        )}
      </Modal>
    </Container>
  );
}
