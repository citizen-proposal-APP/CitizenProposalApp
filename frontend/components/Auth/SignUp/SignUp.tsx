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
import classes from './SignUp.module.css';

interface SignUpProps {
  onToggle: () => void; // switch between login and sign up
}

export function SignUp({ onToggle }: SignUpProps) {
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
        <form onSubmit={form.onSubmit(console.log)}>
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
          <Button fullWidth mt="xl" type="submit">
            建立帳號
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
