import React, { useState, useEffect } from 'react';
import { Container, Stack, Modal, Button, Text, TextInput, Alert } from '@mantine/core';
import { useForm } from '@mantine/form'; // 引入 Mantine 的 useForm
import UserInfoSection from './UserInfoSection';
import PostSection from './PostSection';
import { Proposal } from '@/types/Proposal'; // 引入 Proposal 類型
import { Configuration, UsersApi, PostsApi, PostsQueryResponseDto, PostQueryResponseDto } from '@/openapi';
import { Tag, TagType } from '@/types/Tag';

interface User {
  id: number;
  username: string;
}

interface ProfilePageProps {
  userId: string; // 新增 userId 作為屬性
}

const convertPostToProposal = (post: PostQueryResponseDto): Proposal => {
  const tags: Tag[] = post.tags.map((tag) => ({
    id: tag.id,
    tagType: tag.tagType || TagType.topic,
    name: tag.name,
  }));

  return {
    id: post.id,
    status: 'published',
    title: post.title,
    thumbnail: '',
    postedTime: post.postedTime instanceof Date
      ? post.postedTime.toISOString()
      : post.postedTime,
    tags: tags,
  };
};

const configuration = new Configuration({
  basePath: process.env.NEXT_PUBLIC_BASE_PATH!,
  credentials: 'include',
});

const usersApi = new UsersApi(configuration);
const postsApi = new PostsApi(configuration);

const ProfilePage = ({ userId }: ProfilePageProps) => { // 接收 userId 作為屬性
  const [user, setUser] = useState<User | null>(null);
  const [publishedProposals, setPublishedProposals] = useState<Proposal[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null); // 用來儲存錯誤訊息
  const [isProposalsSet, setIsProposalsSet] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null); // 儲存當前登入的使用者資料

  // 使用 Mantine 的 useForm 來處理表單
  const form = useForm({
    initialValues: {
      username: '', // 設定初始值
    },
    validate: {
      username: (value) => (value.trim().length >= 1 ? null : '使用者名稱最少要有一個字'),
    },
  });

  useEffect(() => {
    if (!userId) {
      setError('無效的使用者 ID');
      return;
    }

    const fetchData = async () => {
      try {
        const userResponse = await usersApi.apiUsersIdGet({ id: Number(userId) });
        setUser({ id: userResponse.id, username: userResponse.username });
        form.setValues({ username: userResponse.username });

        const postsResponse: PostsQueryResponseDto = await postsApi.apiPostsGet({ author: userResponse.username });
        const postIds = postsResponse.posts?.map((post) => post.id) || [];

        const proposals: Proposal[] = [];
        for (const postId of postIds) {
          const postDetail: PostQueryResponseDto = await postsApi.apiPostsIdGet({ id: postId });
          proposals.push(convertPostToProposal(postDetail));
        }

        setPublishedProposals(proposals);
        setIsProposalsSet(true);
      } catch (err) {
        console.error('錯誤:', err);
        setError('無法取得使用者或貼文資料');
      }
    };

    fetchData();
  }, [userId]);

  // 獲取當前登入的使用者資料
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const data = await usersApi.apiUsersCurrentGet();
        setCurrentUser(data); // 設定當前使用者資料
      } catch (error) {
        // console.error('錯誤:', error);
        // setError('無法取得當前使用者資料');
      }
    };

    fetchCurrentUser();
  }, []);

  // 檢查資料是否加載完成，還沒加載完成時顯示 loading
  if (!user && !error) return <div>Loading...</div>;  // 加載中

  if (error) return <Alert color="red">{error}</Alert>;  // 顯示錯誤訊息

  const handleSave = () => {
    // 如果表單無法通過驗證，則不繼續進行保存
    if (form.validate().hasErrors) {
      return;
    }

    // 更新資料並關閉彈窗
    setIsModalOpen(false);

    // 提交更新 (只傳遞必要的資料)
    usersApi
    .apiUsersIdGet({ id: Number(userId) }) // 假設你有 API 可用於更新
    .then(() => {
      console.log('Updated username:', form.values.username);
    })
    .catch((error) => {
      console.error('錯誤:', error);
      setError('更新失敗');
    });
  };

  return (
    <Container>
      <Stack gap="md">
        {user && (
          <UserInfoSection
            user={user}
            // 只有當前登入的使用者 id 和 profile 頁面的 id 相同時顯示編輯按鈕
            onEdit={currentUser?.id === Number(userId) ? () => setIsModalOpen(true) : undefined}
          />
        )}
        {isProposalsSet && publishedProposals.length > 0 && (
          <PostSection title="已發表" proposals={publishedProposals} />
        )}
        {isProposalsSet && publishedProposals.length === 0 && (
          <Text style={{ textAlign: 'center' }}>該使用者尚未發表任何文章。</Text>
        )}

        <Modal
          opened={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="編輯個人資料"
          centered
        >
          <Stack gap="md">
            <TextInput
              label="使用者名稱"
              placeholder="請輸入使用者名稱"
              {...form.getInputProps('username')} // 綁定表單欄位
              maxLength={32} // 設置最大字數為 32
              description="最多可輸入 32 個字"
              error={form.errors.username} // 顯示錯誤信息
            />
            <Button onClick={handleSave}>確認修改</Button>
          </Stack>
        </Modal>
      </Stack>
    </Container>
  );
};

export default ProfilePage;
