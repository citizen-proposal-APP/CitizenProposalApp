import { useState } from 'react';
import {
  Anchor,
  Button,
  Container,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { Configuration, UsersApi } from '@/openapi';
import classes from './SignUp.module.css';

interface SignUpProps {
  onToggle: () => void; // switch between login and sign up
  onClose: () => void; // 關閉 Modal
  onLoginSuccess: (data: { id: number; username: string }) => void;
}

export function SignUp({ onToggle, onClose, onLoginSuccess }: SignUpProps) {
  const configuration = new Configuration({
    basePath: process.env.NEXT_PUBLIC_BASE_PATH,
    credentials: 'include',
  });
  const api = new UsersApi(configuration);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    mode: 'uncontrolled',
    validate: {
      username: (value) =>
        value.length < 1 || value.length > 32 ? '使用者名稱必須在 1 到 32 個字之間' : null,
      password: (value) => (value.length < 1 ? '密碼不能為空' : null),
      confirmPassword: (value, values) => (value !== values.password ? '密碼不符' : null),
    },
  });

  return (
    <Container size={420} my={40}>
      <Title ta="center" className={classes.title}>
        建立帳號
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        已經有帳號了嗎？{' '}
        <Anchor size="sm" component="button" onClick={onToggle}>
          登入
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form
          onSubmit={form.onSubmit(async (values) => {
            setIsSubmitting(true);
            try {
              await api.apiUsersRegisterPost({
                username: values.username,
                password: values.password,
              });
              console.log('註冊成功:', values.username);

              // 登入成功後，調用 apiUsersCurrentGet() 獲取用戶資訊
              const userData = await api.apiUsersCurrentGet();
              
              if (userData?.id && userData?.username) {
                // 確保 userData 正確
                console.log('用戶資訊:', userData);
                onLoginSuccess({ id: userData.id, username: userData.username }); // 傳遞完整的用戶資訊
                onClose(); // 關閉 Modal
              } else {
                console.error('無法獲取用戶資訊');
              }
            } catch (error) {
              console.error('註冊失敗', error);
            } finally {
              setIsSubmitting(false);
            }
          })}
        >
          <TextInput
            label="使用者名稱"
            placeholder="任何您想要的使用者名稱"
            required
            mt="md"
            key={form.key('username')}
            {...form.getInputProps('username')}
          />
          <PasswordInput
            label="密碼"
            placeholder="任何您想要的密碼（至少一個字）"
            required
            mt="md"
            key={form.key('password')}
            {...form.getInputProps('password')}
          />
          <PasswordInput
            label="確認密碼"
            placeholder="再輸入一次您設定的密碼"
            required
            mt="md"
            key={form.key('confirmPassword')}
            {...form.getInputProps('confirmPassword')}
          />
          <Button fullWidth mt="xl" type="submit" disabled={isSubmitting}>
            {isSubmitting ? '處理中...' : '建立帳號'}
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
