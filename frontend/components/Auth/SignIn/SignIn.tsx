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
import classes from './SignIn.module.css';

interface AuthenticationTitleProps {
  onToggle: () => void;
  onClose: () => void;
  onLoginSuccess: (data: { id: number; username: string }) => void;
}

export function AuthenticationTitle({
  onToggle,
  onClose,
  onLoginSuccess,
}: AuthenticationTitleProps) {
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
        value.length < 1 || value.length > 32 ? '使用者名稱在 1 到 32 個字之間' : null,
      password: (value) => (value.length < 1 ? '密碼不能為空' : null),
    },
  });

  return (
    <Container size={420} my={40}>
      <Title ta="center" className={classes.title}>
        歡迎回來！
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        還沒有帳號嗎?{' '}
        <Anchor size="sm" component="button" onClick={onToggle}>
          建立帳號
        </Anchor>
      </Text>
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form
          onSubmit={form.onSubmit(async (values) => {
            setIsSubmitting(true);
            try {
              await api.apiUsersLoginPost({
                username: values.username,
                password: values.password,
              });
              console.log('登入成功:', values.username);
              console.log('註冊成功:', values.username);
              // 登入成功後，調用 apiUsersCurrentGet() 獲取用戶資訊
              const userData = await api.apiUsersCurrentGet();

              if (userData?.id && userData?.username) {
                console.log('用戶資訊:', userData);
                onLoginSuccess({ id: userData.id, username: userData.username });
                onClose();
              } else {
                console.error('無法獲取用戶資訊');
              }
            } catch (error: any) {
              const status = error.response.status;
              if (status === 400) {
                console.error('請求錯誤:');
                window.alert('登入失敗：請檢查輸入的使用者名稱或密碼');
              } else if (status === 401) {
                console.error('驗證失敗:');
                window.alert('登入失敗：使用者名稱或密碼不正確');
              } else {
                console.error('伺服器錯誤:');
                window.alert('伺服器錯誤，請稍後再試');
              }
            } finally {
              setIsSubmitting(false);
            }
          })}
        >
          <TextInput
            label="使用者名稱"
            placeholder="您的使用者名稱"
            required
            key={form.key('username')}
            {...form.getInputProps('username')}
          />
          <PasswordInput
            label="密碼"
            placeholder="您的密碼"
            required
            mt="md"
            key={form.key('password')}
            {...form.getInputProps('password')}
          />
          <Button fullWidth mt="xl" type="submit" disabled={isSubmitting}>
            {isSubmitting ? '處理中...' : '登入'}
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
