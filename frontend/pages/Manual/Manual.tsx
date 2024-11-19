import React from 'react';
import { Accordion, Anchor, Container, Title, Text } from '@mantine/core';
import styles from './Manual.module.css';
import { Layout } from '@/components/Layout/Layout';

export default function Manual() {
    return (
        <Layout>
            <Container size="lg" py="md">
                {/* 頁面標題 */}
                <Title
                    order={2}
                    mb="lg"
                    className={styles.textAlignCenter} // 引用已定義的 CSS 類
                >
                    網站導覽
                </Title>


                {/* 說明文字 */}
                <Text className={styles.textAlignCenter} color="dimmed" mb="lg">
                    以下是本網站的導覽結構，包含主要功能模塊與其相關子功能。請點擊展開各模塊以查看詳細資訊。
                </Text>

                {/* 網站導覽結構 */}
                <Accordion multiple>
                    {/* 帳號註冊與登錄 */}
                    <Accordion.Item value="account">
                        <Accordion.Control>
                            <span className={styles.accordionLabel}>1. 帳號註冊與登錄</span>
                        </Accordion.Control>
                        <Accordion.Panel>
                            <Anchor className={styles.anchorLink} href="#email-registration">
                                1-1. 電子郵件註冊
                            </Anchor>
                            <br />
                            <Anchor className={styles.anchorLink} href="#system-verification">
                                1-2. 系統驗證
                            </Anchor>
                        </Accordion.Panel>
                    </Accordion.Item>

                    {/* 用戶意見提交與管理 */}
                    <Accordion.Item value="user-feedback">
                        <Accordion.Control>
                            <span className={styles.accordionLabel}>2. 用戶意見提交與管理</span>
                        </Accordion.Control>
                        <Accordion.Panel>
                            <Anchor className={styles.anchorLink} href="#submit-opinion">
                                2-1. 撰寫與提交意見
                            </Anchor>
                            <br />
                            <Anchor className={styles.anchorLink} href="#review-duplicates">
                                2-2. 重複檢查
                            </Anchor>
                            <br />
                            <Anchor className={styles.anchorLink} href="#department-classification">
                                2-3. 部門分類與彙整
                            </Anchor>
                        </Accordion.Panel>
                    </Accordion.Item>

                    {/* 意見搜尋與篩選 */}
                    <Accordion.Item value="search">
                        <Accordion.Control>
                            <span className={styles.accordionLabel}>3. 意見搜尋與篩選</span>
                        </Accordion.Control>
                        <Accordion.Panel>
                            <Anchor className={styles.anchorLink} href="#search-by-topic">
                                3-1. 主題搜尋
                            </Anchor>
                            <br />
                            <Anchor className={styles.anchorLink} href="#department-search">
                                3-2. 部門篩選
                            </Anchor>
                            <br />
                            <Anchor className={styles.anchorLink} href="#similar-proposals">
                                3-3. 相似提案推薦
                            </Anchor>
                        </Accordion.Panel>
                    </Accordion.Item>

                    {/* 通知系統 */}
                    <Accordion.Item value="notification">
                        <Accordion.Control>
                            <span className={styles.accordionLabel}>4. 通知系統</span>
                        </Accordion.Control>
                        <Accordion.Panel>
                            <Anchor className={styles.anchorLink} href="#new-comments">
                                4-1. 新留言通知
                            </Anchor>
                            <br />
                            <Anchor className={styles.anchorLink} href="#proposal-updates">
                                4-2. 提案更新通知
                            </Anchor>
                        </Accordion.Panel>
                    </Accordion.Item>

                    {/* 安全性需求 */}
                    <Accordion.Item value="security">
                        <Accordion.Control>
                            <span className={styles.accordionLabel}>5. 安全性需求</span>
                        </Accordion.Control>
                        <Accordion.Panel>
                            <Anchor className={styles.anchorLink} href="#user-data-encryption">
                                5-1. 用戶數據加密
                            </Anchor>
                            <br />
                            <Anchor className={styles.anchorLink} href="#sql-injection-prevention">
                                5-2. SQL 注入防護
                            </Anchor>
                            <br />
                            <Anchor className={styles.anchorLink} href="#xss-protection">
                                5-3. 防範 XSS 攻擊
                            </Anchor>
                        </Accordion.Panel>
                    </Accordion.Item>

                    {/* 易用性需求 */}
                    <Accordion.Item value="usability">
                        <Accordion.Control>
                            <span className={styles.accordionLabel}>6. 易用性需求</span>
                        </Accordion.Control>
                        <Accordion.Panel>
                            <Anchor className={styles.anchorLink} href="#user-guide">
                                6-1. 使用者導覽
                            </Anchor>
                            <br />
                            <Anchor className={styles.anchorLink} href="#simple-interface">
                                6-2. 簡潔頁面設計
                            </Anchor>
                        </Accordion.Panel>
                    </Accordion.Item>
                </Accordion>
            </Container>
        </Layout>
    );
}
