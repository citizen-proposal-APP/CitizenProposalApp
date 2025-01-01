import React, { useState } from 'react';
import { GetServerSidePropsContext, GetServerSideProps } from 'next';
import { Container, Title, Badge, Image, Modal, Text, Textarea, Button, Grid, Group, Box, Flex, Stack, Paper, Avatar, AspectRatio, SimpleGrid } from '@mantine/core';
import { PostsApi } from '../../openapi/apis/PostsApi';
import { UsersApi } from '../../openapi/apis/UsersApi';
import { AttachmentsApi } from '../../openapi/apis/AttachmentsApi';
import { PostQueryResponseDto } from '../../openapi/models/PostQueryResponseDto'; 
import { UserQueryResponseDto } from '../../openapi/models/UserQueryResponseDto';
import { CommentQueryResponseDto } from '../../openapi/models/CommentQueryResponseDto';
import { Layout } from '../../components/Layout/Layout';
import { ProposalData } from '../../types/ProposalData';


export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const { id } = context.params!;

  // 初始化 API 實例
  const postsApi = new PostsApi();
  const usersApi = new UsersApi();
  const attachmentsApi = new AttachmentsApi();
  
  try {
    // 並行獲取數據
    const [post, currentUser] = await Promise.all([
      postsApi.apiPostsIdGet({ id: Number(id) }),
      usersApi.apiUsersCurrentGet(),
    ]);

    // 獲取附件並轉換為 URL 陣列
    const attachments = await Promise.all(
      post.attachmentIds.map(async (attachmentID: number) => {
        const attachment = await attachmentsApi.apiAttachmentsIdGet({ id: attachmentID });
        // 使用 URL.createObjectURL() 將 Blob 轉換為 URL
        const objectUrl = URL.createObjectURL(attachment);
        return objectUrl; // 返回 URL
      })
    );

    // 組合數據為 ProposalData 格式
    const proposalData: ProposalData = {
      ...post,
      current_user: currentUser.username, // 提取當前用戶名稱
      comments: await postsApi.apiPostsPostIdCommentsGet({ postId: Number(id) }), // 獲取評論數據
      attachments, // 將附件 URL 存入 proposalData (attachments 是陣列)
    };
    
    return {
      props: { proposalData }, // 將數據傳遞給頁面
    };

  } catch (error) {
    console.error("Error fetching data:", error);
    return { notFound: true }; // 如果出現錯誤，返回 404 頁面
  }
};

interface ProposalSubpageProps {
  proposalData: ProposalData; // 明確指定 proposalData 的類型
  postsApi: PostsApi;
}

const ProposalSubpage: React.FC<ProposalSubpageProps> = ({ proposalData, postsApi }) => {
  // 狀態管理
  const [opened, setOpened] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string>('');
  //const [liked, setLiked] = useState<boolean>(proposalData.is_like);
  //const [numLikes, setNumLikes] = useState<number>(proposalData.num_like); // 初始化按讚數量
  const [newComment, setNewComment] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false); // 用來控制提交狀態（顯示加載指示器）
  const [commentList, setCommentList] = useState<CommentQueryResponseDto[]>(proposalData.comments.comments); // 存儲留言數組
  const [commentCount, setCommentCount] = useState<number>(proposalData.comments.count); // 存儲留言數量
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // 控制 Modal 開關
  const maxChars = 300; //留言最大字數
  

  // const handleLikeClick = () => {
  //   setLiked((prevLiked) => {
  //     const newLiked = !prevLiked; // 切換點擊狀態
  //     setNumLikes((prevNumLikes) => newLiked ? prevNumLikes + 1 : prevNumLikes - 1); // 更新按讚數量
  //     return newLiked;
  //   });
  // };

  const handleCommentSubmit = async () => {
    if (newComment.trim() === '') return;
  
    setIsSubmitting(true);
    try {
      await postsApi.apiPostsPostIdCommentsPost({
        postId: proposalData.id,
        content: newComment,
      });
  
      const updatedComments = await postsApi.apiPostsPostIdCommentsGet({
        postId: proposalData.id,
      });
  
      setCommentList(updatedComments.comments);
      setCommentCount(updatedComments.count);
      setNewComment('');
    } catch (error) {
      console.error('Error submitting comment:', error);
      alert('提交留言失敗，請稍後再試。');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Modal 確認提交邏輯
  const confirmSubmit = async () => {
    setIsModalOpen(false);
    await handleCommentSubmit();
  };
  
  // 表單提交邏輯
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim() === '') return;
  
    setIsModalOpen(true);
  };
  

  return (
    <Layout>
      <Container>
        <Title order={1} mt="md" size={36}>
          {proposalData.title}
        </Title>
        {/* 標籤部分 */}
        <Group mt="md">
          {proposalData.tags.map((tag:{id:number ,name:string}) => (
            <Badge key={tag.id} size="lg" color="gray">
              {tag.name}
            </Badge>
          ))}
        </Group>

        <Box mt={50}>
          <SimpleGrid cols={{ base: 2, sm: 3, lg: 5 }} spacing={{ base: 'md', sm: 'xl' }} verticalSpacing={{ base: 'md', sm: 'xl' }}>
            {proposalData.attachments.map((attachmentUrl, index) => {
              const contentType = attachmentUrl.split('.').pop();

              if (!contentType) {
                return (
                  <Box key={index}>
                    <Text>不明的檔案類型或檔案擴展名遺失</Text>
                  </Box>
                );
              }

              if (['jpg', 'jpeg', 'png', 'gif'].includes(contentType)) {
                // 顯示圖片
                return (
                  <Box key={index}>
                    <Image src={attachmentUrl} alt={`Attachment ${index + 1}`} fit="contain" w="100%" h="auto" onClick={() => {
                      setSelectedImage(attachmentUrl);
                      setOpened(true);
                    }} />
                  </Box>
                );
              } else if (['mp4', 'webm', 'ogg'].includes(contentType)) {
                // 顯示影片，無需透過 Modal
                return (
                  <Box key={index}>
                    <video controls width="100%">
                      <source src={attachmentUrl} type={`video/${contentType}`} />
                      您的瀏覽器不支援該影片類型
                    </video>
                  </Box>
                );
              } else if (['pdf'].includes(contentType)) {
                // 顯示 PDF 並支持在 Modal 中查看
                return (
                  <Box key={index}>
                    <Text onClick={() => {
                      setSelectedImage(attachmentUrl); // 假設是 PDF URL
                      setOpened(true);
                    }}>瀏覽PDF</Text>
                  </Box>
                );
              } else {
                // 其他類型的文件（可根據需要添加更多類型處理）
                return (
                  <Box key={index}>
                    <Text>不支援的檔案類型</Text>
                  </Box>
                );
              }
            })}
          </SimpleGrid>

          {/* Modal 用於顯示較大的圖片或 PDF */}
          <Modal
            opened={opened}
            onClose={() => setOpened(false)}
            size="lg"
          >
            {selectedImage.endsWith('.pdf') ? (
              // 使用 <embed> 顯示 PDF
              <embed src={selectedImage} type="application/pdf" width="100%" height="400px" />
            ) : (
              // 顯示圖片
              <Image
                src={selectedImage}
                alt="Large view"
                fit="contain"
                w="100%"
                h="auto"
              />
            )}
          </Modal>
        </Box>

        {/* 提案內容 標題及文本 */}
        <Title order={1} mt={50}>
          提案內容
        </Title>

        <Box mt={30}>
          <Text size="xl" component="div">
            {proposalData.content.split('\n').map((line: string, index: number) => (
              // 使用 Text 元素來保證一致的樣式
              <Text key={index} mb="sm">
                {line}
              </Text>
            ))}
          </Text>
        </Box>

        {/* <div>
          <Title order={1} mt={50} fz={28}>
            其他相似提案 | 猜你想看...
          </Title>
          
          <Grid mt={20}>
            {proposalData.similar_attachments.map((similar_attachment:{id: number; content: string; title: string; link: string}) => (
              <Grid.Col
                key={similar_attachment.id}
                span={{ base: 12, sm: 8, md: 4 }} // 手機版每行 1 個，平板每行 2(2*4=8) 個，電腦每行 3(3*4=12) 個
              >
                <Box
                  component="a"
                  href={similar_attachment.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src={`/${similar_attachment.content}`}
                    alt={`Thumbnail for ${similar_attachment.title}`}
                    width={200}
                    height={200}
                    fit="cover"
                    radius="md" // 添加圓角
                  />
                  <Text
                    size="lg" // 字體大小，lg 表示較大
                    fw={600} // 半粗字體
                    lh="md"
                    ta="center"
                  >
                    {similar_attachment.title}
                  </Text>
                </Box>
              </Grid.Col>
            ))}
          </Grid>
        </div> */}

        {/* <Box>
          <Flex align="center" mt={50} gap={8}>
            <Image
              src={liked ? '../mockdata/image/iine-blue.png' : '../mockdata/image/iine.png'}
              alt="good"
              onClick={handleLikeClick}
              width={40} // 寬度
              height={40} // 高度
              fit="contain" // 確保圖片完整顯示
            />

            
            <Text
              size="xl" // Mantine 預設較大字體
              fw={500} // 半粗體字
            >
              {numLikes}
            </Text>
          </Flex>
        </Box> */}
        
        <Box>
          {/* 留言區標題 */}
          <Title order={2} mt={50} mb={20} size="h2">
            留言區
          </Title>

          {/* 留言輸入框 */}
          <form onSubmit={handleFormSubmit}>
            <Stack>
              <Textarea
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

          {/* 留言列表 */}
          <Box mt={30}>
            {proposalData.comments.comments.map((comment_map) => (
              <Paper
                key={comment_map.id}
                withBorder
                shadow="sm"
                radius="md"
                p="md"
                mb="md"
              >
                <Stack>
                  {/* 顯示留言者名稱 */}
                  <Box>
                    <Text fw={500}>
                      {comment_map.author.username}
                    </Text>
                  </Box>
                  {/* 顯示留言內容 */}
                  <Text size="lg" fw={700} lh="lg">
                    {comment_map.content}
                  </Text>
                </Stack>
              </Paper>
            ))}
          </Box>
        </Box>
      </Container>
    </Layout>
  );
};
export default ProposalSubpage;
