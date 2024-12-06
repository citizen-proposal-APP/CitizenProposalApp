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
import classes from './SignIn.module.css';

interface AuthenticationTitleProps {
  onToggle: () => void;
}

export function AuthenticationTitle({ onToggle }: AuthenticationTitleProps) {
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
        <TextInput label="使用者名稱" placeholder="您的使用者名稱" required />
        <PasswordInput label="密碼" placeholder="您的密碼" required mt="md" />
        <Button fullWidth mt="xl">
          登入
        </Button>
      </Paper>
    </Container>
  );
}
