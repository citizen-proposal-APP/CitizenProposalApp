import React from 'react';
import { Container, Title, Text, Group, Image } from '@mantine/core';
import styles from './AboutUs.module.css';
import { Layout } from '@/components/Layout/Layout';

export default function AboutUs() {
    return (
        <Layout>
            <Container size="lg" py="md" className={styles.aboutCard}>
                {/* 頁面標題 */}
                <Title
                    order={2}
                    className={styles.aboutTitle}
                >
                    
                </Title>

                {/* 說明文字 */}
                <Text color="dimmed" mb="lg" className={styles.description}>
                    我們只是學分小狗，不要好奇🙂🙂
                </Text>

                {/* 圖片展示 */}
                <Group style={{ justifyContent: 'center', marginTop: 'var(--mantine-spacing-lg)' }} mb="lg">
                    {/* <Image
                        src="/images/team.jpg"
                        alt="我們的團隊"
                        className={styles.teamImage}
                    /> */}
                </Group>

                {/* 使命與願景
                <Title order={3} className={styles.sectionTitle}>
                    我們的使命
                </Title>
                <Text className={styles.textBlock}>
                    提供最專業的數位工具，幫助用戶更有效率地完成工作。我們相信科技可以改變世界，因此我們致力於創造真正有影響力的產品。
                </Text>

                <Title order={3} className={styles.sectionTitle}>
                    我們的願景
                </Title>
                <Text className={styles.textBlock}>
                    成為全球領先的數位服務提供商，透過技術與創新驅動社會進步，為用戶帶來全新的價值與可能性。
                </Text> */}
            </Container>
        </Layout>
    );
}
