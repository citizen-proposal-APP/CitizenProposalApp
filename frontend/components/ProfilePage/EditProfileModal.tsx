import React, { useState, useEffect } from 'react';
import { Modal, TextInput, Button, Group } from '@mantine/core';
import { useForm } from '@mantine/form';

const EditProfileModal = ({ userId }: { userId: string }) => {
  const [opened, setOpened] = useState(false);
  
  // 使用 Mantine 的 useForm 來處理表單
  const form = useForm({
    initialValues: {
      username: '', // 預設值為空
    },
  });

  // 獲取當前使用者的 username
  useEffect(() => {
    // 確保只有第一次獲取資料時才設置表單初始值
    const fetchData = async () => {
      const res = await fetch(`/api/user${userId}`);
      const data = await res.json();
      form.setFieldValue('username', data.username); // 設定表單的初始值
    };

    fetchData();
  }, [userId, form]); // 確保 form 只會在首次加載時設置初始值

  const handleSubmit = () => {
    // 提交更新資料
    fetch(`/api/user${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: form.values.username, // 直接使用表單的值
      }),
    }).then(() => {
      console.log('Updated Data:', { username: form.values.username });
      setOpened(false); // 關閉彈窗
    });
  };

  return (
    <>
      <Button onClick={() => setOpened(true)}>編輯個人資料</Button>

      <Modal opened={opened} onClose={() => setOpened(false)} title="編輯個人資料" centered>
        <TextInput
          label="使用者名稱"
          placeholder="請輸入使用者名稱"
          {...form.getInputProps('username')} // 使用 form.getInputProps 綁定表單欄位
          maxLength={32} // 設置最大字數為 32
          description="最多可輸入 32 個字"
        />
        <Group justify="center" mt="md">
          <Button variant="outline" onClick={() => setOpened(false)}>
            取消
          </Button>
          <Button onClick={handleSubmit}>保存變更</Button>
        </Group>
      </Modal>
    </>
  );
};

export default EditProfileModal;
