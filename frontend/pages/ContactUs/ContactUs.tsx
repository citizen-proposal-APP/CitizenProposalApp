// import React from 'react';
// import { Container, Title, Text, Group, Button, TextInput, Textarea } from '@mantine/core';
// import styles from './ContactUs.module.css';
// import { Layout } from '@/components/Layout/Layout';

// export default function ContactUs() {
//     return (
//         <Layout>
//             <Container size="lg" py="md">
//                 {/* 頁面標題 */}
//                 <Title
//                     order={2}
//                     mb="lg"
//                     className={styles.textAlignCenter} // 引用已定義的 CSS 類
//                 >
//                     {/* 聯絡我們 */}
//                 </Title>

//                 {/* 說明文字 */}
//                 <Text className={styles.textAlignCenter} color="dimmed" mb="lg">
//                     如果您有任何問題或建議，歡迎使用以下表單聯繫我們，我們將盡快回覆您。
//                 </Text>

//                 {/* 聯絡表單 */}
//                 <form className={styles.contactForm}>
//                     <TextInput
//                         label="您的姓名"
//                         placeholder="請輸入您的姓名"
//                         required
//                         mb="md"
//                     />
//                     <TextInput
//                         label="電子郵件"
//                         placeholder="請輸入您的電子郵件地址"
//                         type="email"
//                         required
//                         mb="md"
//                     />
//                     <Textarea
//                         label="留言內容"
//                         placeholder="請輸入您的問題或建議"
//                         required
//                         minRows={4}
//                         mb="md"
//                     />
//                     <Group style={{ justifyContent: 'center', marginTop: 'var(--mantine-spacing-lg)' }}>
//                         <Button type="submit" variant="filled" color="blue">
//                             提交
//                         </Button>
//                     </Group>

//                 </form>
//             </Container>
//         </Layout>
//     );
// }

import React from 'react';
import { Container, Title, Text, Group, Anchor, Center } from '@mantine/core';
import styles from './ContactUs.module.css';
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

