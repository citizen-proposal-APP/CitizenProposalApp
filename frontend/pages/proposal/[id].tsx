import React, { useState, useEffect } from 'react';
import { 
  Container, Title, Badge, 
  Group, Box, SimpleGrid,
  Button, Text, Image,
  AspectRatio, Modal, Stack,
  Paper, Textarea, Flex
} from '@mantine/core';

import { 
  Configuration, PostsApi, UsersApi, 
  AttachmentsApi, PostQueryResponseDto, UserQueryResponseDto, 
  CommentsQueryResponseDto, VoteCountsQueryResponseDto 
} from '@/openapi';

import { Layout } from '../../components/Layout/Layout';
import { Proposal } from '../../types/Proposal';
import { Tag, TagType } from '../../types/Tag';
import { ProposalCard } from '@/components/ProposalCard/ProposalCard';
import { useRouter } from 'next/router';


const configuration = new Configuration({
  basePath: process.env.NEXT_PUBLIC_BASE_PATH!,
  credentials: 'include',
});

const postsApi = new PostsApi(configuration);
const userApi = new UsersApi(configuration);
const attachmentsApi = new AttachmentsApi(configuration);

const proposalSubpage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [proposalData, setProposalData] = useState<PostQueryResponseDto | null>(null);
  const [currentUser, setCurrentUser] = useState<UserQueryResponseDto | null>(null);
  const [attachments, setAttachments] = useState<{ id: number; name: string; blob: Blob; url:string }[]>([]);
  const [likes,setLike] = useState<VoteCountsQueryResponseDto | null>(null);
  const [comments, setComments] = useState<CommentsQueryResponseDto | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<Proposal[]>([]);
  const [newComment, setNewComment] = useState<string>(''); 
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const maxChars = 200;

  //onclick 狀態
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [opened, setOpened] = useState<boolean>(false);
  const handleImageClick = (imageSrc: string): void => {
    setSelectedImage(imageSrc);
    setOpened(true);
  };

  interface CommonPost {
    id: number;
    title: string;
    postedTime: string; // 統一為 string 格式
    tags: Tag[]; // 使用 Tag 型態
  }

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim() === '') return; // 禁止提交空白留言
  
    setIsModalOpen(true); // 打開確認 Modal
  };
  
  const confirmSubmit = async () => {
    if (!newComment.trim()) return; // 確保有留言才進行提交
  
    try {
      // 創建 PostsApi 實例，並提交留言
      const postsApi = new PostsApi(configuration);
      const postId = Number(id); // 確保 postId 是數字
      const content = newComment; // 要提交的留言內容
      
      // 執行 API 請求來提交留言
      await postsApi.apiPostsPostIdCommentsPost({
        postId, // 傳遞 postId
        content, // 傳遞留言內容
      });
  
      // 提交成功後，重置輸入框並關閉確認 Modal
      setNewComment(''); // 清空輸入框
      setIsModalOpen(false); // 關閉確認 Modal
  
      // 重新請求留言列表，獲取最新留言
      const response = await postsApi.apiPostsPostIdCommentsGet({
        postId, // 傳遞 postId 以獲取該帖子的留言
      });
  
      // 更新狀態顯示最新的留言
      setComments(response); // 更新留言狀態為最新留言
  
    } catch (err) {
      setError('提交評論失敗'); // 發生錯誤時設置錯誤信息
      setIsModalOpen(false); // 即使提交失敗，也關閉 Modal
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
  
      try {
        setLoading(true);
  
        // 獲取提案資料
        const proposalResponse = await postsApi.apiPostsIdGet({ id: Number(id) });
        setProposalData(proposalResponse);
  
        // 獲取當前用戶資料
        const userResponse = await userApi.apiUsersCurrentGet();
        setCurrentUser(userResponse);

        const likeResponse = await postsApi.apiPostsPostIdVotesGet({ postId: Number(id) });
        setLike(likeResponse);

        // 獲取附件資料
        if (proposalResponse.attachments) {
          const attachmentPromises = proposalResponse.attachments.map(async (attachment) => {
            const response = await attachmentsApi.apiAttachmentsIdGet({ id: attachment.id });
            return {
              id: attachment.id,
              name: attachment.filename,
              blob: response,
              url: URL.createObjectURL(response),
            };
          });
          const fetchedAttachments = await Promise.all(attachmentPromises);
          setAttachments(fetchedAttachments);
        }
  
        // 獲取評論資料
        const commentsResponse = await postsApi.apiPostsPostIdCommentsGet({
          postId: Number(id),
          start: 0,
          range: 50,
          sortDirection: 'ascending',
        });
        setComments(commentsResponse);

        // 獲取相關貼文資料
      const response1 = await postsApi.apiPostsGet({
        range: 2,
        tag: proposalResponse.tags[0].name,
      });
      const response2 = await postsApi.apiPostsGet({
        range: 1,
        tag: proposalResponse.author.username,
      });

      const mergedPosts: CommonPost[] = [...(response1?.posts?? []), ...(response2?.posts?? [])].map((post) => ({
        id: post.id,
        title: post.title,
        postedTime: new Date(post.postedTime).toISOString(),
        tags: post.tags.map((tag) => ({ id: tag.id, name: tag.name, tagType: tag.tagType})),
      }));

      
      const proposals: Proposal[] = mergedPosts.map((post) => ({
        ...post,
        status: '1',
        thumbnail: '',
        
       }));
       setRelatedPosts(proposals);
      

        setLoading(false);
      } catch (err) {
        setError('無法獲取資料');
        setLoading(false);
      }
    };
  
    fetchData();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Layout>
      <Container>
        {proposalData ? (
          <>
            {/* 提案標題與標籤 */}
            <Title order={1} mt="md" size={36}>
              {proposalData.title}
            </Title>

            <Group mt="md">
              {proposalData.tags.map((tag) => (
                <Badge key={tag.id} size="lg" color="gray">
                  {tag.name}
                </Badge>
              ))}
            </Group>

            {/* 提案附件 */}
            <Box mt={30}>
              <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing={{ base: 'md', sm: 'xl' }} verticalSpacing={{ base: 'md', sm: 'xl' }}>
                {attachments.map((attachment) => (
                  <div key={attachment.id}>
                    {attachment.name.endsWith('.jpg') || attachment.name.endsWith('.png') || attachment.name.endsWith('.jpeg') ? (
                      <div>
                        <AspectRatio ratio={4 / 3} key={attachment.id} style={{ borderRadius: '16px', overflow: 'hidden', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }}>
                          <Image src={attachment.url} alt={`Attachment ${attachment.id}`} fit="cover" onClick={() => handleImageClick(attachment.url)} />
                        </AspectRatio>
                      </div>
                    ) : (
                      <Button variant="outline" component="a" href={attachment.url} target="_blank" rel="noopener noreferrer">
                        {attachment.name} - Download
                      </Button>
                    )}
                  </div>
                ))}
              </SimpleGrid>
            </Box>
            <Modal opened={opened} onClose={() => setOpened(false)} size="lg">
              <Image src={selectedImage} alt="Large view" fit="contain" w="100%" h="auto" />
            </Modal>

            {/* 提案內容 */}
            <Title order={1} mt={50}>
              提案內容
            </Title>
            <Box mt={30}>
              <Text size="xl" component="div">
                {proposalData.content.split('\n').map((line: string, index: number) => (
                  <Text key={index} mb="sm">
                    {line}
                  </Text>
                ))}
              </Text>
            </Box>

            {/* 相似提案 */}
            <Title order={2} mt={30}>
              相似的提案 | 猜你想看...
            </Title>
            <Flex
              mt={30}
              gap="md" // 使用 Mantine 的主题间距：'xs', 'sm', 'md', 'lg', 'xl'
              wrap="wrap" // 自动换行
              justify="center" // 设置对齐方式
            >
              {relatedPosts.length > 0 ? (
                relatedPosts.map((proposal) => (
                  proposal.thumbnail='../mockdata/image/john hutcherson.jpg',
                  <ProposalCard

                    key={proposal.id}
                    data={proposal}
                    height="auto"
                    width="45%"
                  />
                ))
              ) : (
                <Text>沒有相似的提案</Text>
              )}
            </Flex>
            
            {/* 按讚或倒讚 */}
            


            <Title order={2} mt={30}>
              留言區
            </Title>
            {/* 留言輸入區 */}
            <form onSubmit={handleSubmitComment}>
              <Stack>
                <Textarea
                  mt={30}
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="請輸入留言... 限300字內"
                  radius="md"
                  size="lg"
                  maxLength={300}
                  rightSection={
                    <Text size="xs" c={newComment.length >= maxChars ? 'red' : 'orange'}>
                      {newComment.length}/300
                    </Text>
                  }
                />
                <Button type="submit" color="blue" size="md" disabled={newComment.trim() === ''}>
                  提交留言
                </Button>
              </Stack>
            </form>
            {/* Mantine Modal 確認框 */}
            <Modal
              opened={isModalOpen}
              onClose={() => setIsModalOpen(false)} // 關閉 Modal
              title="確認送出留言"
              centered
            >
              <Text>確定發表這則留言嗎?</Text>
              <Group mt="md">
                <Button variant="default" onClick={() => setIsModalOpen(false)}>
                  取消
                </Button>
                <Button color="blue" onClick={confirmSubmit}>
                  確定送出
                </Button>
              </Group>
            </Modal>

            {/* 留言顯示區 */}
            <Box mt={30}>
            {comments && comments.comments && comments.comments.length > 0 ? (
              comments.comments.map((comment) => (
                <Paper key={comment.id} withBorder shadow="sm" radius="md" p="md" mb="md">
                  <Stack>
                    <Box>
                      <Text fw={500}>{comment.author.username}</Text>
                    </Box>
                    <Text size="lg" fw={700} lh="lg">{comment.content}</Text>
                  </Stack>
                </Paper>
              ))
            ) : (
              <Text>目前沒有留言。</Text> 
            )}
          </Box>
          </>
        ) : (
          <div>Loading proposal details...</div>
        )}
      </Container>
    </Layout>
  );
};

export default proposalSubpage;
