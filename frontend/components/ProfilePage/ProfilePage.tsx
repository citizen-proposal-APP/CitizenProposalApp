import React, { useState, useEffect } from 'react';
import { Container, Stack, Modal, Button, TextInput, Alert } from '@mantine/core';
import { useForm } from '@mantine/form'; // 引入 Mantine 的 useForm
import UserInfoSection from './UserInfoSection';
import PostSection from './PostSection';
import { Proposal } from '@/types/Proposal'; // 引入 Proposal 類型

interface User {
  id: number;
  username: string;
}

interface ProfilePageProps {
  userId: string; // 接收 userId 作為屬性
}

const ProfilePage = ({ userId }: ProfilePageProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [publishedProposals, setPublishedProposals] = useState<Proposal[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null); // 用來儲存錯誤訊息
  const [currentUser, setCurrentUser] = useState<User | null>(null); // 儲存當前登入的使用者資料
  
  // 使用 Mantine 的 useForm 來處理表單
  const form = useForm({
    initialValues: {
      username: '', // 設定初始值
    },
    validate: {
      username: (value) => (value.trim().length >= 1 ? null : '使用者名稱最少要有一個字'),
    },
  });

  // 獲取指定 userId 的使用者資料
  useEffect(() => {
    fetch(`/api/Users/${userId}`)  // 使用 `userId` 來獲取該用戶的資料
      .then((res) => {
        if (!res.ok) {
          throw new Error('無法取得使用者資料');
        }
        return res.json();
      })
      .then((data) => {
        setUser(data); // 更新使用者資料
        setPublishedProposals(data.publishedProposals || []); // 設定已發表的提案
        form.setValues({ username: data.username }); // 設定表單預設值
      })
      .catch((error) => {
        console.error('錯誤:', error);
        setError('無法取得使用者資料'); // 顯示錯誤訊息
      });
  }, [userId]);  // 當 userId 變更時重新執行

  // 獲取當前登入的使用者資料
  useEffect(() => {
    fetch('/api/Users/current')  // 獲取當前登入的使用者資料
      .then((res) => {
        if (!res.ok) {
          throw new Error('無法取得當前使用者資料');
        }
        return res.json();
      })
      .then((data) => {
        setCurrentUser(data);  // 更新當前使用者資料
      })
      .catch((error) => {
        console.error('錯誤:', error);
        setError('無法取得當前使用者資料'); // 顯示錯誤訊息
      });
  }, []);

  // 檢查資料是否加載完成，還沒加載完成時顯示 loading
  if (!user && !error) return <div>Loading...</div>;  // 加載中

  if (error) return <Alert color="red">{error}</Alert>;  // 顯示錯誤訊息

  const handleSave = () => {
    // 如果表單無法通過驗證，則不繼續進行保存
    if (form.validate().hasErrors) {
      return;
    }

    // 更新資料並關閉彈窗
    setIsModalOpen(false);

    // 提交更新 (只傳遞必要的資料)
    fetch(`/api/Users/${userId}`, {  // 修改這裡，使用正確的 `userId` 來發送 PUT 請求
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: form.values.username, // 使用 form.values.username 提交更新
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('更新失敗');
        }
        return res.json();
      })
      .then(() => {
        console.log('Updated username:', form.values.username);
      })
      .catch((error) => {
        console.error('錯誤:', error);
        setError('更新失敗'); // 顯示錯誤訊息
      });
  };

  return (
    <Container>
      <Stack gap="md">
        {user && currentUser?.id === Number(userId) && (  // 只有當前登入的使用者 id 和 profile 頁面的 id 相同時顯示編輯按鈕
          <UserInfoSection user={user} onEdit={() => setIsModalOpen(true)} />
        )}
        {user && <PostSection title="已發表" proposals={publishedProposals} />}

        <Modal
          opened={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="編輯個人資料"
          centered
        >
          <Stack gap="md">
            <TextInput
              label="使用者名稱"
              placeholder="請輸入使用者名稱"
              {...form.getInputProps('username')} // 綁定表單欄位
              maxLength={32} // 設置最大字數為 32
              description="最多可輸入 32 個字"
              error={form.errors.username} // 顯示錯誤信息
            />
            <Button onClick={handleSave}>確認修改</Button>
          </Stack>
        </Modal>
      </Stack>
    </Container>
  );
};

export default ProfilePage;
