import React from 'react';
import { Container, Title, Text, Center, Space, List } from '@mantine/core';
import { Layout } from '@/components/Layout/Layout';

export default function AboutUs() {
  return (
    <Layout>
      <Container size="lg" py="md">
        {/* 頁面標題 */}
        <Center>
          <Title order={1}>關於我們</Title>
        </Center>

        {/* 領域間距 */}
        <Space h="xl" />

        {/* 系統簡介 */}
        <Text size="lg" weight={500} align="center">
          國民參與國家規劃 APP 致力於打造一個簡單、透明且高效的平台，
          讓國民能夠輕鬆參與國家政策的討論與規劃。
          我們的願景是透過技術創新，提升公共政策的參與度，讓每個人的聲音都能被聽見。
        </Text>

        {/* 領域間距 */}
        <Space h="lg" />

        {/* 主要功能 */}
        <Title order={2} mt="lg">主要功能</Title>
        <List withPadding>
          <List.Item>註冊並登入個人帳戶，提交您的意見提案</List.Item>
          <List.Item>瀏覽最新熱門議題，了解國民的關注點</List.Item>
          <List.Item>使用關鍵字與 AI 自動分類功能，快速找到您感興趣的提案</List.Item>
          <List.Item>系統自動推薦相關提案，提升參與效率</List.Item>
        </List>

        {/* 領域間距 */}
        <Space h="lg" />

        {/* 我們的團隊 */}
        <Title order={2} mt="lg">我們的團隊</Title>
        <Text size="lg">
          我們來自中正大學資訊工程學系，是一支充滿熱情的團隊，專注於後端開發、AI 技術整合與前端設計。
          我們的每一步努力，都是為了讓國民參與變得更簡單、更高效。
        </Text>

      </Container>
    </Layout>
  );
}
