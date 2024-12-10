// ForgotPassword.tsx
import {
  TextInput,
  Paper,
  Title,
  Text,
  Container,
  Button,
} from '@mantine/core';
import classes from './ForgotPassword.module.css';

interface ForgotPasswordProps {
  onBack: () => void; // 返回到登入頁面的函數
}

export function ForgotPassword({ onBack }: ForgotPasswordProps) {
  return (
      <Container size={420} my={40}>
          <Title ta="center" className={classes.title}>
              忘記密碼
          </Title>
          <Text c="dimmed" size="sm" ta="center" mt={5}>
              請輸入您的電子信箱，我們將發送密碼重置連結給您。
          </Text>

          <Paper withBorder shadow="md" p={30} mt={30} radius="md">
              <TextInput label="電子信箱 Email" placeholder="your@gmail.com" required />
              <Button fullWidth mt="xl">
                  發送重置連結
              </Button>
              <Button fullWidth mt="md" variant="outline" onClick={onBack}>
                  返回登入介面
              </Button>
          </Paper>
      </Container>
  );
}
