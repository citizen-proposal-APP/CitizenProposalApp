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
import classes from './SignIn.module.css';

interface AuthenticationTitleProps {
  onToggle: () => void;
}

export function AuthenticationTitle({ onToggle }: AuthenticationTitleProps) {
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
        <form onSubmit={form.onSubmit(console.log)}>
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
          <Button fullWidth mt="xl" type="submit">
            登入
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
