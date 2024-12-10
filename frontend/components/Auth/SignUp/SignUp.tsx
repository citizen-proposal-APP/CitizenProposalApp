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
import classes from './signup.module.css';

interface SignUpProps {
  onToggle: () => void; // switch between login and sign up
}

export function SignUp({ onToggle }: SignUpProps) {
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
        {/* <TextInput label="Name" placeholder="Your name" required /> */}
        <TextInput label="使用者名稱" placeholder="任何您想要的使用者名稱" required mt="md" />
        <PasswordInput label="密碼" placeholder="任何您想要的密碼（至少一個字）" required mt="md" />
        <PasswordInput label="確認密碼" placeholder="再輸入一次您設定的密碼" required mt="md" />

        <Button fullWidth mt="xl">
          建立帳號
        </Button>
      </Paper>
    </Container>
  );
}
