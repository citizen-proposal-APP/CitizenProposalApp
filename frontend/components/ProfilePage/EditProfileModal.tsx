import React, { useState, useEffect } from 'react';
import { Alert, Modal, TextInput, Button, Group } from '@mantine/core';
import { useForm } from '@mantine/form';

const EditProfileModal = ({ userId }: { userId: string }) => {
  const [opened, setOpened] = useState(false);
  const [loading, setLoading] = useState(false); // 加入 loading 狀態
  const [error, setError] = useState<string | null>(null); // 錯誤訊息
  const form = useForm({
    initialValues: {
      username: '', // 預設值為空
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/Users/${userId}`);
        if (!res.ok) {
          throw new Error('無法獲取使用者資料');
        }
        const data = await res.json();
        form.setFieldValue('username', data.username); // 設定表單的初始值
      } catch (error) {
        setError('無法加載使用者資料');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId, form]);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/Users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: form.values.username, // 直接使用表單的值
        }),
      });
      if (!res.ok) {
        throw new Error('更新失敗');
      }
      console.log('Updated Data:', { username: form.values.username });
      setOpened(false); // 關閉彈窗
    } catch (error) {
      setError('更新失敗');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button onClick={() => setOpened(true)}>編輯個人資料</Button>

      <Modal opened={opened} onClose={() => setOpened(false)} title="編輯個人資料" centered>
        {loading && <div>Loading...</div>} {/* 顯示載入中的提示 */}
        {error && <Alert color="red">{error}</Alert>} {/* 顯示錯誤訊息 */}
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
          <Button onClick={handleSubmit} disabled={loading}>
            保存變更
          </Button>
        </Group>
      </Modal>
    </>
  );
};


export default EditProfileModal;
