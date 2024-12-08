import { Avatar, Button, Card, Grid, Text } from '@mantine/core';

// 定義使用者資料的型別
interface User {
  avatar: string;
  name: string;
  email: string;
  nickname: string;
  points: number;
}

interface UserInfoSectionProps {
  user: User;
  onEdit: () => void; // 新增 onEdit 屬性
}

const UserInfoSection = ({ user, onEdit }: UserInfoSectionProps) => (
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
      {/* 頭像區域 */}
      <Grid.Col
        span={6}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <Avatar src={user.avatar} alt={`${user.name} 的頭像`} radius="xl" size={120} />
      </Grid.Col>

      {/* 使用者資訊區域 */}
      <Grid.Col
        span={6}
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <Text size="xl" fw={700}>
          {user.name}，你好
        </Text>
        <Text size="sm">電子信箱：{user.email}</Text>
        <Text size="sm">暱稱：{user.nickname}</Text>
        <Text size="sm">國民之聲 Point：{user.points}</Text>
      </Grid.Col>

      {/* 編輯按鈕區域 */}
      <Grid.Col
        span={12}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '10px',
        }}
      >
        <Button variant="outline" size="xs" onClick={onEdit}>
          編輯個人資訊
        </Button>
      </Grid.Col>
    </Grid>
  </Card>
);

export default UserInfoSection;
