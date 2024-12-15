
import React from 'react';
import { Container, Title, Text, Group, Anchor, Center } from '@mantine/core';
import styles from './contact-us.module.css';
import { Layout } from '@/components/Layout/Layout';

export default function ContactUs() {
    return (
        <Layout>
            <Container size="lg" py="md" className={styles.contactForm}>
                {/* 頁面標題 */}
                <Title
                    order={2}
                    className={styles.contactTitle} // 美化標題樣式
                >

                </Title>

                {/* 說明文字 */}
                <Text mb="lg" className={styles.description}>
                    如果您有任何問題或建議，歡迎聯絡我們。我們將在 1-2 個工作日內回覆您的訊息，感謝您的耐心。
                </Text>

                {/* 聯絡資訊 */}
                <Group style={{ justifyContent: 'center', marginTop: 'var(--mantine-spacing-lg)' }} className={styles.emailGroup}>
                    <Text size="lg" className={styles.contactLabel}>
                        聯絡信箱：
                    </Text>
                    <Anchor
                        href="mailto:support@example.com"
                        className={styles.emailButton}
                    >
                        support@example.com
                    </Anchor>
                </Group>

            </Container>
        </Layout>
    );
}

