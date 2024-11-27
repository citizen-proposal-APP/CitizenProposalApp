import React, { useState } from 'react';
import { Container, Title, Badge, Image, Modal, Text, TextInput, Button, Grid } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import { Layout } from '@/components/Layout/Layout';

export async function getServerSideProps() {
  // 模擬取得 API 數據
  const proposalData = {
    title: '[密技] 義大利麵就應該拌 42 號混凝土',
    tags: ['社會', '教育', '未來發展', '123', 'abc'], // 假設這些是後端回傳的標籤
    content: '我個人認為\n義大利麵就應該拌 42 號混泥土\n因為這個螺絲釘的長度很容易直接影響到挖掘機的扭矩\n你往裡砸的時候\n一瞬間他就會產生大量的高能蛋白\n俗稱 UFO，會嚴重影響經濟的發展\n以至於對整個太平洋和充電器的核污染\n再或者說\n透過這勾股定理\n很容易推斷出人工飼養的東條英機\n他是可以捕獲野生的三角函數\n所以說\n不管這秦始皇的切面是否具有放射性\n川普的 N 次方是否有沈澱物\n都不會影響到沃爾瑪跟維爾康在南極匯合\n',
    user_name: 'guo',
    user_icon: 'image/user_icon.gif',
    num_like: 42,
    attachments: [
      { id: 1, content: 'image/attachment_test1.png' },
      { id: 2, content: 'image/attachment_test2.png' },
      { id: 3, content: 'image/attachment_test3.png' },
      { id: 4, content: 'image/attachment_test4.gif' },
      { id: 5, content: 'image/attachment_test5.gif' },
      // 可以根據需要添加更多附件
    ],
    //測試用資料
    similar_attachments: [
      { id: 1, content: 'image/rick astley.jpg', title: 'Rick Astley', link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
      { id: 2, content: 'image/john hutcherson.jpg', title: 'John Hutcherson', link: 'https://www.youtube.com/watch?v=BbeeuzU5Qc8' },
      { id: 3, content: 'image/heeeeeeyayayaya.jpg', title: 'heeeeeeyayayaya', link: 'https://www.youtube.com/watch?v=ZZ5LpwO-An4' },
    ],
    comments: [
      { id: 1,
        name: '醜狗1號',
        icon: 'image/Doge_icon.png',
        content: '工三小?',
        replies: [
          { id: 1, name: '醜狗3號', icon: 'image/Doge_icon.png', content: '不要那麼火爆 老兄' },
          { id: 2, name: '醜狗4號', icon: 'image/Doge_icon.png', content: '直言不諱' }],
      },

      { id: 2,
        name: '醜狗2號',
        icon: 'image/doge_samurai_icon.png',
        content: '已購買 小孩很愛吃',
        replies: [
          { id: 1,
            name: '醜狗5號',
            icon: 'image/doge_samurai_icon.png',
            content: '已購買小孩 很愛吃' },
          { id: 2,
            name: '醜狗6號',
            icon: 'image/doge_samurai_icon.png',
            content: 'ᕕ(◠ڼ◠)ᕗ.' },
        ],
      },
    ],

  };
  return { props: { proposalData } };
}

export default function ProposalSubpage({ proposalData }) {
  // 狀態管理
  const [opened, setOpened] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [liked, setLiked] = useState(false);
  const [numLikes, setNumLikes] = useState(proposalData.num_like); // 初始化按讚數量
  const [newComment, setNewComment] = useState('');
  const [commentList, setCommentList] = useState(proposalData.comments);
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyContent, setReplyContent] = useState('');
  // 點擊圖片時的處理函數
  const handleImageClick = (imageSrc) => {
    setSelectedImage(imageSrc);
    setOpened(true);
  };
  const handleLikeClick = () => {
    setLiked(!liked); // 切換點擊狀態
    setNumLikes((prev) => (liked ? prev - 1 : prev + 1)); // 更新按讚數量
  };
  const handleCommentChange = (event) => {
    setNewComment(event.currentTarget.value);
  };

  const handleCommentSubmit = async () => {
    // 在這裡你可以將新留言發送到後端
    // 假設我們直接將其添加到本地狀態
    if (newComment.trim() !== '') {
      const newCommentData = {
        id: Date.now(),
        name: proposalData.user_name, // 使用者名稱
        icon: proposalData.user_icon, // 使用者頭像
        content: newComment,
        replies: [], // 初始時沒有回覆
      };

      setCommentList([...commentList, newCommentData]);
      setNewComment('');
    }
  };
  const handleReplyChange = (event) => {
    setReplyContent(event.currentTarget.value);
  };

  const handleReplySubmit = (commentId) => {
    if (replyContent.trim() !== '') {
      const replyData = {
        id: Date.now(),
        name: proposalData.user_name,
        icon: proposalData.user_icon,
        content: replyContent,
      };

      setCommentList((prevComments) =>
        prevComments.map((comment) =>
          comment.id === commentId
            ? { ...comment, replies: [...comment.replies, replyData] }
            : comment
        )
      );
      setReplyContent('');
      setReplyingTo(null);
    }
  };
  return (
    <Layout>
      <Container>
        {/* 標題部分 */}
        <Title order={1} style={{ marginTop: '20px', fontSize: '40px' }}>{proposalData.title}</Title>
        {/* 標籤部分 */}
        <div
          className="tags-container"
          style={{
            marginTop: '20px',
            display: 'flex',
            gap: '8px',
            flexWrap: 'wrap', // 版面寬度不夠時自動換行
          }}
        >
          {proposalData.tags.map((tag, index) => (
            <Badge
              key={index}
              variant="filled"
              color="gray"
              className="badge-item"
              style={{
                fontSize: '14px',
                padding: '12px 18px',
                borderRadius: '16px',
                textAlign: 'center',
              }}
            >
              {tag}
            </Badge>
          ))}
        </div>

        {/* 提案附件部分 */}
        <div style={{
          marginTop: '90px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          }}>
          <Carousel
            withIndicators
            height={250} // Carousel 高度 250px
            slideSize="33.333%" // 每個圖佔1/3版面
            align="start" // 這些圖片為頂部對齊
            loop
            styles={{
              viewport: {
                padding: '0', // 將左右邊距移除 最大化圖片的顯示
                maxWidth: '850px', // Carousel 最寬為850px 不會超過螢幕寬度
              },
              slide: {
                paddingRight: '50px', // 每個圖間隔50px
              },
            }}
          >
            {proposalData.attachments.map((attachment) => (
              <Carousel.Slide key={attachment.id}>
                <Image
                  src={`/${attachment.content}`}
                  alt={`Slide ${attachment.id}`}
                  fit="contain"
                  style={{
                    width: 250,
                    height: 250,
                    cursor: 'pointer',
                  }}
                  onClick={() => handleImageClick(`/${attachment.content}`)} // 點擊圖片時觸發的事件
                />
              </Carousel.Slide>
            ))}
          </Carousel>
        </div>

        {/* Modal 用於顯示較大的圖片 */}
        <Modal
          opened={opened}
          onClose={() => setOpened(false)}
          size="lg" // 可以根據需要調整大小
        >
          <Image src={selectedImage} alt="Large view" fit="contain" style={{ width: '100%', height: 'auto' }} />
        </Modal>

        {/* 提案內容 標題及文本 */}
        <Title order={1} style={{ marginTop: '50px', fontSize: '28px' }}>提案內容</Title>
        <div style={{ marginTop: '15px', padding: '20px' }}>
          <Text style={{ whiteSpace: 'pre-line', fontSize: '20px', lineHeight: '1.6' }}>
            {proposalData.content}
          </Text>
        </div>

        <div>
          {/* 其他相似提案 標題 */}
          <Title order={1} style={{ marginTop: '50px', fontSize: '28px' }}>其他相似提案 | 猜你想看...</Title>
          {/* 三個附件的縮圖與標題 */}
          <Grid style={{ marginTop: '20px' }}>
            {proposalData.similar_attachments.map((similar_attachment) => (
              <Grid.Col
                key={similar_attachment.id}
                span={{ base: 12, sm: 8, md: 4 }} // 手機版每行 1 個，平板每行 2(2*4=8) 個，電腦每行 3(3*4=12) 個
              >
                <a
                  href={similar_attachment.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    textDecoration: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                  }}
                >
                  <div
                    style={{
                      width: '100%', // 自適應寬度
                      maxWidth: '200px', // 限制最大寬度
                      height: '200px',
                      overflow: 'hidden',
                    }}
                  >
                    <Image
                      src={`/${similar_attachment.content}`}
                      alt={`Thumbnail for ${similar_attachment.title}`}
                      fit="cover"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  </div>
                  <Text style={{ marginTop: '15px', fontSize: '16px', fontWeight: 500 }}>
                    {similar_attachment.title}
                  </Text>
                </a>
              </Grid.Col>
            ))}
          </Grid>
        </div>

        <div style={{ display: 'flex', alignItems: 'center' }}>
            {/* 留言區 圖標 留言輸入欄位 */}
            <Image
              src={liked ? 'image/iine-blue.png' : 'image/iine.png'}
              alt="good"
              onClick={handleLikeClick}
              style={{
                    marginTop: '50px',
                    width: '40px',
                    height: '40px',
                    objectFit: 'contain',
                    cursor: 'pointer', // 鼠標懸停時變成手型
                }}
            />
            {/* 顯示按讚數量 */}
            <Text style={{ marginTop: '55px', marginLeft: '16px', fontSize: '24px' }}>
                {numLikes}
            </Text>
        </div>
        {/* 留言區域 */}
        <Title order={1} style={{ marginTop: '50px', fontSize: '28px' }}>留言區</Title>
        <TextInput
          value={newComment}
          onChange={handleCommentChange}
          placeholder="請輸入留言... 限300字內"
          style={{ marginTop: '20px', marginBottom: '10px' }}
        />
        <Button onClick={handleCommentSubmit}>提交留言</Button>

        {/* Display comments */}
        <div style={{ marginTop: '20px' }}>
          {commentList.map((comment) => (
            <div key={comment.id} style={{ marginBottom: '15px', border: '1px solid #eee', padding: '10px', borderRadius: '5px' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Image
                  src={`/${comment.icon}`}
                  alt={`${comment.name} 的頭像`}
                  style={{ width: '30px', height: '30px', borderRadius: '50%', marginRight: '10px' }}
                />
                <Text style={{ fontWeight: 'bold' }}>{comment.name}</Text>
              </div>
              <Text style={{ fontSize: '16px' }}>{comment.content}</Text>
              <Button
                onClick={() => setReplyingTo(comment.id)}
                style={{
                  fontSize: '10px',
                  padding: '5px 10px',
                  borderRadius: '2px',
                }}
              >
              回覆
              </Button>

              {replyingTo === comment.id && (
                <div style={{ marginTop: '10px' }}>
                  <TextInput
                    value={replyContent}
                    onChange={handleReplyChange}
                    placeholder="請輸入回覆..."
                    style={{ marginBottom: '10px' }}
                  />
                  <Button onClick={() => handleReplySubmit(comment.id)}>提交回覆</Button>
                </div>
              )}

              {/* Display replies */}
              {comment.replies && comment.replies.length > 0 && (
                <div style={{ marginTop: '10px', marginLeft: '20px', borderLeft: '2px solid #0070f3', paddingLeft: '10px' }}>
                  {comment.replies.map((reply) => (
                    <div key={reply.id} style={{ marginBottom: '5px', display: 'flex', alignItems: 'center' }}>
                      <Image
                        src={`/${reply.icon}`}
                        alt={`${reply.name} 的頭像`}
                        style={{ width: '25px', height: '25px', borderRadius: '50%', marginRight: '8px' }}
                      />
                      <Text style={{ fontSize: '14px' }}>
                        <strong>{reply.name}:</strong> {reply.content}
                      </Text>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </Container>
    </Layout>
  );
}
