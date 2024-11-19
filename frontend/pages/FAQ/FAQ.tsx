import React from 'react';
import { Accordion, Container, Title, Text } from '@mantine/core';
import styles from './FAQ.module.css';
import { Layout } from '@/components/Layout/Layout';

export default function FAQ() {
    return (
        <Layout>
            <Container size="lg" py="md">
                {/* 頁面標題 */}
                <Title
                    order={2}
                    mb="lg"
                    className={styles.textAlignCenter} // 引用已定義的 CSS 類
                >
                    以下是一些常見問題與解答，若有更多問題，歡迎聯繫我們。
                </Title>

                {/* 說明文字 */}
                <Text className={styles.textAlignCenter} color="dimmed" mb="lg">
                    
                </Text>

                {/* 常見問題結構 */}
                <Accordion multiple>
                    {/* 帳號問題 */}
                    <Accordion.Item value="account-issues">
                        <Accordion.Control>
                            <span className={styles.accordionLabel}>1. 帳號問題</span>
                        </Accordion.Control>
                        <Accordion.Panel>
                            <Text>
                                <strong>1-1. 我該如何註冊帳號？</strong>
                                <br />
                                請前往註冊頁面，填寫您的電子郵件與密碼後提交申請，並完成驗證即可。
                            </Text>
                            <br />
                            <Text>
                                <strong>1-2. 忘記密碼該怎麼辦？</strong>
                                <br />
                                您可以在登入頁面點選「忘記密碼」，按照指示重設密碼。
                            </Text>
                        </Accordion.Panel>
                    </Accordion.Item>

                    {/* 意見提交 */}
                    <Accordion.Item value="feedback-issues">
                        <Accordion.Control>
                            <span className={styles.accordionLabel}>2. 意見提交相關</span>
                        </Accordion.Control>
                        <Accordion.Panel>
                            <Text>
                                <strong>2-1. 我該如何提交意見？</strong>
                                <br />
                                請登入後點選「提交意見」，填寫您的建議或問題並送出。
                            </Text>
                            <br />
                            <Text>
                                <strong>2-2. 如何查看其他人的意見？</strong>
                                <br />
                                您可以使用「搜尋與篩選」功能，瀏覽其他用戶提交的意見。
                            </Text>
                        </Accordion.Panel>
                    </Accordion.Item>

                    {/* 通知相關問題 */}
                    <Accordion.Item value="notification-issues">
                        <Accordion.Control>
                            <span className={styles.accordionLabel}>3. 通知相關問題</span>
                        </Accordion.Control>
                        <Accordion.Panel>
                            <Text>
                                <strong>3-1. 為什麼我沒有收到通知？</strong>
                                <br />
                                請確認您已啟用通知功能，並檢查垃圾郵件夾。
                            </Text>
                            <br />
                            <Text>
                                <strong>3-2. 可以關閉通知嗎？</strong>
                                <br />
                                是的，您可以在個人設定中關閉通知。
                            </Text>
                        </Accordion.Panel>
                    </Accordion.Item>

                    {/* 安全性相關 */}
                    <Accordion.Item value="security-issues">
                        <Accordion.Control>
                            <span className={styles.accordionLabel}>4. 安全性問題</span>
                        </Accordion.Control>
                        <Accordion.Panel>
                            <Text>
                                <strong>4-1. 我的數據是安全的嗎？</strong>
                                <br />
                                我們使用業界標準的加密技術來保護您的數據安全。
                            </Text>
                            <br />
                            <Text>
                                <strong>4-2. 如何報告安全性漏洞？</strong>
                                <br />
                                若發現漏洞，請聯繫我們的技術支援團隊。
                            </Text>
                        </Accordion.Panel>
                    </Accordion.Item>
                </Accordion>
            </Container>
        </Layout>
    );
}
