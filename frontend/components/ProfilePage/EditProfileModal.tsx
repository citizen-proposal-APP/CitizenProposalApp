import React, { useState } from 'react';
import { Modal, TextInput, PasswordInput, Button, Group } from '@mantine/core';

const EditProfileModal = () => {
  const [opened, setOpened] = useState(false);
  const [email, setEmail] = useState('example@gmail.com');
  const [nickname, setNickname] = useState('lululala');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    console.log('Updated Data:', { email, nickname, password });
    setOpened(false); // 關閉彈窗
  };

  return (
    <>
      {/* 彈窗開啟按鈕 */}
      <Button onClick={() => setOpened(true)}>編輯個人資料</Button>

      {/* 彈窗內容 */}
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="編輯個人資料"
        centered
      >
        <TextInput
          label="暱稱"
          value={nickname}
          onChange={(e) => setNickname(e.currentTarget.value)}
          mb="sm"
        />
        <TextInput
          label="電子信箱"
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
          mb="sm"
        />
        <PasswordInput
          label="新密碼"
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
          mb="sm"
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
