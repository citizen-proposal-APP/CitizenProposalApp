import React, { useState, useEffect } from 'react';
import { Container, Stack, Alert, Text } from '@mantine/core';
import UserInfoSection from './UserInfoSection';
import PostSection from './PostSection';
import { Proposal } from '@/types/Proposal';
import { Configuration, UsersApi, PostsApi, PostsQueryResponseDto, PostQueryResponseDto } from '@/openapi';
import { Tag, TagType } from '@/types/Tag';

interface User {
  id: number;
  username: string;
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

const ProfilePage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [publishedProposals, setPublishedProposals] = useState<Proposal[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isProposalsSet, setIsProposalsSet] = useState(false); // 新增標記變數

  useEffect(() => {
    const pathParts = window.location.pathname.split('/');
    const extractedUserId = pathParts[pathParts.length - 1];
    const userId = Number(extractedUserId);

    if (isNaN(userId)) {
      setError('無效的使用者 ID');
      return;
    }

    const fetchData = async () => {
      try {
        const userResponse = await usersApi.apiUsersIdGet({ id: userId });
        setUser({ id: userResponse.id, username: userResponse.username });

        const postsResponse: PostsQueryResponseDto = await postsApi.apiPostsGet({ author: userResponse.username });
        const postIds = postsResponse.posts?.map((post) => post.id) || [];

        const proposals: Proposal[] = [];
        for (const postId of postIds) {
          const postDetail: PostQueryResponseDto = await postsApi.apiPostsIdGet({ id: postId });
          proposals.push(convertPostToProposal(postDetail));
        }

        setPublishedProposals(proposals);
        setIsProposalsSet(true); // 設置標記為已完成
      } catch (err) {
        setError('無法取得使用者或貼文資料');
      }
    };

    fetchData();
  }, []); // 只在首次渲染時執行

  // 加載中
  if (!user && !error) return <div>Loading...</div>;

  if (error) return <Alert color="red">{error}</Alert>;

  return (
    <Container>
      <Stack gap="md">
        {user && <UserInfoSection user={user} />}
        {/* 當已發表文章數為 0 時不顯示已發表區塊 */}
        {isProposalsSet && publishedProposals.length > 0 && (
          <PostSection title="已發表" proposals={publishedProposals} />
        )}
        {/* 當已發表文章數為 0 時顯示提示文字 */}
        {isProposalsSet && publishedProposals.length === 0 && (
          <Text style={{ textAlign: 'center' }}>該使用者尚未發表任何文章。</Text>
        )}
      </Stack>
    </Container>
  );
};

export default ProfilePage;
