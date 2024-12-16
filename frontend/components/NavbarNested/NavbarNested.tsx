import { useState } from 'react';
import Link from 'next/link';
import { Button, Code, Group, Modal, ScrollArea } from '@mantine/core';
import { AuthenticationTitle } from '@/components/Auth/SignIn/SignIn';
import { SignUp } from '@/components/Auth/SignUp/SignUp';
import { links } from '@/data/links';
import { LinksGroup } from './LinksGroup';
import classes from './NavbarNested.module.css';

export function NavbarNested() {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false); // 狀態用於切換登入或註冊頁面
  const [username, setUsername] = useState<string | null>(null); // 管理登入狀態和使用者名稱

  const items = links.map((item) => <LinksGroup {...item} key={item.label} />);

  // 打開登入或註冊 Modal，並設定模式
  const openAuthModal = (signUp = false) => {
    setIsSignUp(signUp);
    setAuthModalOpen(true);
  };

  const toggleAuthPage = () => {
    setIsSignUp((prev) => !prev);
  };

  return (
    <>
      <div className={classes.header}>
        <Group justify="space-between">
          您尚未登入 您好！伊隆馬。
          <Code fw={700}>v3.1.2</Code>
        </Group>
      </div>

      <ScrollArea className={classes.links}>
        <div className={classes.linksInner}>{items}</div>
      </ScrollArea>

      <div className={classes.footer}>
        <Button variant="default" onClick={() => openAuthModal(false)}>
          Log in
        </Button>
        <Button onClick={() => openAuthModal(true)}>Sign up</Button>
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
            onLoginSuccess={(user) => setUsername(user)} // 註冊成功後回傳使用者名稱
          />
        ) : (
          <AuthenticationTitle
            onToggle={toggleAuthPage} // 切換到註冊
            onClose={() => setAuthModalOpen(false)} // 關閉 Modal
            onLoginSuccess={(user) => setUsername(user)} // 登入成功後回傳使用者名稱
          />
        )}{' '}
      </Modal>
    </>
  );
}
