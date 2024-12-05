import { useState } from 'react';
import {
  Anchor,
  Button,
  Container,
  Group,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { ForgotPassword } from '../ForgotPassword/ForgotPassword';
import classes from './SignIn.module.css';

interface AuthenticationTitleProps {
  onToggle: () => void;
}

export function AuthenticationTitle({ onToggle }: AuthenticationTitleProps) {
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  return (
    <Container size={420} my={40}>
      {showForgotPassword ? (
        <ForgotPassword onBack={() => setShowForgotPassword(false)} />
      ) : (
        <>
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
            <TextInput label="使用者名稱" placeholder="您的使用者名稱" required />
            <PasswordInput label="密碼" placeholder="您的密碼" required mt="md" />
            <Group justify="space-between" mt="lg">
              <Anchor component="button" size="sm" onClick={() => setShowForgotPassword(true)}>
                忘記密碼？
              </Anchor>
            </Group>
            <Button fullWidth mt="xl">
              登入
            </Button>
          </Paper>
        </>
      )}
    </Container>
  );
}
