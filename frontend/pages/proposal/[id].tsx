import React, { useState } from 'react';
import { Container, Title, Badge, Image, Modal, Text, TextInput, Button, Grid, Group, Box, Flex, Stack, Paper,Avatar } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import { Layout } from '../../components/Layout/Layout';
import { ProposalData } from '../../types/ProposalData';


export async function getServerSideProps(context: any) {
  const { id } = context.params;

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
}

export default function ProposalSubpage({ proposalData }) {
  // 狀態管理
  const [opened, setOpened] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [liked, setLiked] = useState(proposalData.is_like);
  const [numLikes, setNumLikes] = useState(proposalData.num_like); // 初始化按讚數量
  const [newComment, setNewComment] = useState('');
  const [commentList, setCommentList] = useState(proposalData.comments);
  const maxChars = 300; //留言最大字數
  // 點擊圖片時的處理函數
  const handleImageClick = (imageSrc) => {
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

  const handleCommentChange = (event) => {
    const input = event.currentTarget.value;
    if (input.length <= maxChars) {
      setNewComment(input);
    }
  };

   const handleCommentSubmit = () => {
    if (newComment.trim() === '') return; // 禁止提交空白留言

    const newCommentData = {
      id: Date.now(),
      name: proposalData.user_name || '匿名用戶', // 使用者名稱，預設匿名
      icon: proposalData.user_icon || 'default-icon.png', // 使用者頭像，預設圖示
      content: newComment,
    };

    setCommentList((prevComments) => [...prevComments, newCommentData]);
    setNewComment(''); // 清空輸入框
  };

  return (
    <Layout>
      <Container>
        <Title order={1} mt="md" size={40}>
          {proposalData.title}
        </Title>
        {/* 標籤部分 */}
        <Group mt="md" spacing="xs">
          {proposalData.tags.map((tag) => (
            <Badge key={tag} size="lg" color="gray">
              {tag}
            </Badge>
          ))}
        </Group>

        {/* 提案附件部分 */}
        <Box mt={90} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Carousel
            withIndicators
            height={250}
            slideSize="33.333%"
            align="start"
            loop
            sx={{
              maxWidth: 850, // Carousel 最大寬度
              margin: '0 auto', // 水平居中
            }}
          >
            {proposalData.attachments.map((attachment) => (
              <Carousel.Slide key={attachment.id} sx={{ paddingRight: 50 }}>
                <Image
                  src={`/${attachment.content}`}
                  alt={`Slide ${attachment.id}`}
                  fit="contain"
                  width={250}
                  height={250}
                  sx={{ cursor: 'pointer' }}
                  onClick={() => handleImageClick(`/${attachment.content}`)}
                />
              </Carousel.Slide>
            ))}
          </Carousel>
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
            sx={{ width: '100%', height: 'auto' }}
          />
        </Modal>

        {/* 提案內容 標題及文本 */}
        <Title order={1} mt={50}>
          提案內容
        </Title>

        <Box mt={30}>
          <Text size="xl" component="div">
            {proposalData.content.split('\n').map((line, index) => (
              <div key={index}>{line}</div>
            ))}
          </Text>
        </Box>

        <div>
          {/* 其他相似提案 標題 */}
          <Title order={1} mt={40} sx={{ marginTop: 50, fontSize: 28 }}>
            其他相似提案 | 猜你想看...
          </Title>
          {/* 三個附件的縮圖與標題 */}
          <Grid mt={20}>
            {proposalData.similar_attachments.map((similar_attachment) => (
              <Grid.Col
                key={similar_attachment.id}
                span={{ base: 12, sm: 8, md: 4 }} // 手機版每行 1 個，平板每行 2(2*4=8) 個，電腦每行 3(3*4=12) 個
              >
                <Box
                  component="a"
                  href={similar_attachment.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    textDecoration: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    gap: '10px', // 子元素之間的間距
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease', // 平滑過渡效果
                    "&:hover": {
                      transform: 'scale(1.05)', // 懸停時輕微放大
                      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // 加入陰影效果
                    },
                  }}
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
                    weight={600} // 半粗字體
                    sx={{
                      lineHeight: 1.5,
                      textAlign: 'center', // 文字置中
                      textDecoration: 'none', // 移除底線
                      transition: 'color 0.2s ease',
                      "&:hover": {
                        color: 'blue', // 懸停時變色
                      },
                    }}
                  >
                    {similar_attachment.title}
                  </Text>
                </Box>
              </Grid.Col>
            ))}
          </Grid>
        </div>

        <Box sx={{ display: 'flex', alignItems: 'center', mt: 50 }}>
          <Flex align="center" mt={50} gap={8}>
            {/* 留言區圖標 */}
            <Image
              src={liked ? '../mockdata/image/iine-blue.png' : '../mockdata/image/iine.png'}
              alt="good"
              onClick={handleLikeClick}
              width={40} // 寬度
              height={40} // 高度
              fit="contain" // 確保圖片完整顯示
              sx={{
                cursor: 'pointer', // 鼠標懸停時變成手型
                transition: 'transform 0.2s ease',
                '&:hover': { transform: 'scale(1.1)' }, // 懸停時微微放大
              }}
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
          <Stack spacing="sm">
            <TextInput
              value={newComment}
              onChange={handleCommentChange}
              placeholder="請輸入留言... 限300字內"
              radius="md"
              size="md"
              rightSection={
                <Text size="xs" color={newComment.length >= maxChars ? 'red' : 'gray'}>
                  {newComment.length}/{maxChars}
                </Text>
              }
              withAsterisk
            />
            <Button onClick={handleCommentSubmit} color="blue" size="md" disabled={newComment.trim() === ''}>
              提交留言
            </Button>
          </Stack>

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
                <Stack spacing="xs">
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                    <Avatar src={`/${comment.icon}`} radius="xl" size="md" alt={`${comment.name} 的頭像`} />
                    <Text weight={700} sx={{ marginLeft: '10px'}}>
                      {comment.name}
                    </Text>
                  </Box>
                  <Text size="lg" weight={700} sx={{ lineHeight: 1.5 }}>
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
}
