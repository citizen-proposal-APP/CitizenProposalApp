import React, { useState } from 'react';
import { GetServerSidePropsContext, GetServerSideProps } from 'next';
import { Container, Title, Badge, Image, Modal, Text, Textarea, Button, Grid, Group, Box, Flex, Stack, Paper, Avatar, AspectRatio, SimpleGrid } from '@mantine/core';
import { Layout } from '../../components/Layout/Layout';
import { ProposalData } from '../../types/ProposalData';
import { Comment } from '@/types/Comment';


export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const { id } = context.params!; // 使用 "!" 來告訴 TypeScript id 是必定存在的

  // 透過 fetch 讀取 public/mockdata/${id}.json
  const response = await fetch(`http://localhost:3000/mockdata/${id}.json`);
  
  // 確保資料讀取成功
  if (!response.ok) {
    return { notFound: true }; // 如果沒有找到資料，回傳 404
  }

  const proposalData: ProposalData = await response.json();

  return {
    props: { proposalData }, // 將 proposalData 傳給頁面組件
  };
};

interface ProposalSubpageProps {
  proposalData: ProposalData; // 明確指定 proposalData 的類型
}

const ProposalSubpage: React.FC<ProposalSubpageProps> = ({ proposalData }) => {
  // 狀態管理
  const [opened, setOpened] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [liked, setLiked] = useState<boolean>(proposalData.is_like);
  const [numLikes, setNumLikes] = useState<number>(proposalData.num_like); // 初始化按讚數量
  const [newComment, setNewComment] = useState<string>('');
  const [commentList, setCommentList] = useState<Comment[]>(proposalData.comments);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // 控制 Modal 開關
  const maxChars = 300; //留言最大字數
  // 點擊圖片時的處理函數
  const handleImageClick = (imageSrc:string):void => {
    setSelectedImage(imageSrc);
    setOpened(true);
  };
  const handleLikeClick = () => {
    setLiked((prevLiked) => {
      const newLiked = !prevLiked; // 切換點擊狀態
      setNumLikes((prevNumLikes) => newLiked ? prevNumLikes + 1 : prevNumLikes - 1); // 更新按讚數量
      return newLiked;
    });
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim() === '') return; // 禁止提交空白留言
  
    setIsModalOpen(true); // 打開確認 Modal
  };
  
  const confirmSubmit = () => {
    const newCommentData:Comment = {
      id: Date.now(),
      name: proposalData.user_name || '匿名用戶', // 使用者名稱，預設匿名
      icon: proposalData.user_icon || 'default-icon.png', // 使用者頭像，預設圖示
      content: newComment,
    };
  
    setCommentList((prevComments) => [...prevComments, newCommentData]); // 新增留言
    setNewComment(''); // 清空輸入框
    setIsModalOpen(false); // 關閉確認 Modal
  };

  return (
    <Layout>
      <Container>
        <Title order={1} mt="md" size={40}>
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
          <SimpleGrid  
            cols={{ base: 2, sm: 3, lg: 5 }}
            spacing={{ base: 'md', sm: 'xl' }}
            verticalSpacing={{ base: 'md', sm: 'xl' }}
            >
            {proposalData.attachments.map((attachment: { id: number; content: string }) => (
              <AspectRatio ratio={1} key={attachment.id}>
                <Image
                  src={`/${attachment.content}`}
                  alt={`Attachment ${attachment.id}`}
                  fit="contain"
                  radius="md"
                  onClick={() => handleImageClick(`/${attachment.content}`)}
                />
              </AspectRatio>
            ))}
          </SimpleGrid>
        </Box>

        {/* Modal 用於顯示較大的圖片 */}
        <Modal
          opened={opened}
          onClose={() => setOpened(false)}
          size="lg" // 可以根據需要調整大小
        >
          <Image
            src={selectedImage}
            alt="Large view"
            fit="contain"
            w="100%"
            h="auto"
          />
        </Modal>

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

        <div>
          {/* 其他相似提案 標題 */}
          <Title order={1} mt={50} fz={28}>
            其他相似提案 | 猜你想看...
          </Title>
          {/* 三個附件的縮圖與標題 */}
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
        </div>

        <Box>
          <Flex align="center" mt={50} gap={8}>
            <Image
              src={liked ? '../mockdata/image/iine-blue.png' : '../mockdata/image/iine.png'}
              alt="good"
              onClick={handleLikeClick}
              width={40} // 寬度
              height={40} // 高度
              fit="contain" // 確保圖片完整顯示
            />

            {/* 顯示按讚數量 */}
            <Text
              size="xl" // Mantine 預設較大字體
              fw={500} // 半粗體字
            >
              {numLikes}
            </Text>
          </Flex>
        </Box>
        
        <Box>
          {/* 留言區標題 */}
          <Title order={2} mt={50} mb={20} size="h2">
            留言區
          </Title>

          {/* 留言輸入框 */}
          <form onSubmit={handleCommentSubmit}>
            <Stack>
              <Textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="請輸入留言... 限300字內"
                radius="md"
                size="lg"
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
            {commentList.map((comment) => (
              <Paper
                key={comment.id}
                withBorder
                shadow="sm"
                radius="md"
                p="md"
                mb="md"
              >
                <Stack>
                  <Box>
                    <Avatar src={`/${comment.icon}`} radius="xl" size="md" alt={`${comment.name} 的頭像`} />
                    <Text fw={500}>
                      {comment.name}
                    </Text>
                  </Box>
                  <Text size="lg" fw={700} lh="lg">
                    {comment.content}
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
