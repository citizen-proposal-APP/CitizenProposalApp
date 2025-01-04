import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Button, Code, Group, Modal, ScrollArea } from '@mantine/core';
import { AuthenticationTitle } from '@/components/Auth/SignIn/SignIn';
import { SignUp } from '@/components/Auth/SignUp/SignUp';
import { links } from '@/data/links';
import { Configuration, UsersApi } from '@/openapi';
import { LinksGroup } from './LinksGroup';
import classes from './NavbarNested.module.css';

const configuration = new Configuration({
  basePath: process.env.NEXT_PUBLIC_BASE_PATH,
});
const usersApi = new UsersApi(configuration);

export function NavbarNested() {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false); // 狀態用於切換登入或註冊頁面
  const [user, setUser] = useState<{ id: number; username: string } | null>(null); // 管理登入狀態

  const items = links.map((item) => <LinksGroup {...item} key={item.label} />);
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
        } catch (error:any) {
          console.error('檢查登入狀態失敗:', error);
        }
      }
  
      checkLoginStatus();
    }, []);

  // 打開登入或註冊 Modal，並設定模式
  const openAuthModal = (signUp = false) => {
    setIsSignUp(signUp);
    setAuthModalOpen(true);
  };

  const toggleAuthPage = () => {
    setIsSignUp((prev) => !prev);
  };

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

  return (
    <>
      <div className={classes.header}>
        <Group justify="space-between">
          {user ? (
            <Button variant="subtle" onClick={() => router.push(`/u/${user.id}`)}>
              {user.username}，您好
            </Button>
          ) : (
            '您尚未登入 您好！伊隆馬。'
          )}
          <Code fw={700}>v3.1.2</Code>
        </Group>
      </div>

      <ScrollArea className={classes.links}>
        <div className={classes.linksInner}>{items}</div>
      </ScrollArea>

      <div className={classes.footer}>
        {user ? (
          <Button variant="default" onClick={handleLogout}>
            登出
          </Button>
        ) : (
          <>
            <Button variant="default" onClick={() => openAuthModal(false)}>
              Log in
            </Button>
            <Button onClick={() => openAuthModal(true)}>Sign up</Button>
          </>
        )}
      </div>

      <Link href="/SiteMap/SiteMap" passHref>
        <Button component="a" variant="outline">
          網站導覽
        </Button>
      </Link>

      {/* Modal 彈出介面，根據 isSignUp 狀態顯示不同內容 */}
      <Modal
        opened={authModalOpen}
        onClose={() => setAuthModalOpen(false)}

        // title={isSignUp ? "Sign Up" : "Authentication"}
      >
        {isSignUp ? (
          <SignUp
            onToggle={toggleAuthPage} // 切換到登入
            onClose={() => setAuthModalOpen(false)} // 關閉 Modal
            onLoginSuccess={handleLoginSuccess}
          />
        ) : (
          <AuthenticationTitle
            onToggle={toggleAuthPage} // 切換到註冊
            onClose={() => setAuthModalOpen(false)} // 關閉 Modal
            onLoginSuccess={handleLoginSuccess}
          />
        )}{' '}
      </Modal>
    </>
  );
}
