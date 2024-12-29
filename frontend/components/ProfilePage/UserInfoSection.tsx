import { Card, Grid, Text } from '@mantine/core';

// 定義使用者資料的型別
interface User {
  id: number;
  username: string;
}

interface UserInfoSectionProps {
  user: User;
}

const UserInfoSection = ({ user }: UserInfoSectionProps) => (
  <Card shadow="sm" padding="lg" radius="md" style={{ marginBottom: '20px' }}>
    <Grid
      align="center"
      gutter="sm"
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        textAlign: 'left',
      }}
    >
      {/* 使用者資訊區域 */}
      <Grid.Col
        span={12}
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <Text size="xl" fw={700}>
          {user.username}的個人頁面
        </Text>
      </Grid.Col>
    </Grid>
  </Card>
);

export default UserInfoSection;
