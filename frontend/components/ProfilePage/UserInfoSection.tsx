import { Button, Card, Grid, Text } from '@mantine/core';

// 定義使用者資料的型別
interface User {
  id: number;
  username: string;
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
