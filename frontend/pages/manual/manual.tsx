import React, { useState } from 'react';
import { Accordion, Anchor, Container, Grid, Image, Modal, Text, Title } from '@mantine/core';
import { AuthenticationTitle } from '@/components/Auth/SignIn/SignIn';
import { SignUp } from '@/components/Auth/SignUp/SignUp';
import { Layout } from '@/components/Layout/Layout';
import { LinkCard } from '@/components/LinkCard/LinkCard';
import styles from './manual.module.css';

const fun3 = {
  title: 'manual_func3_意見搜尋',
  link: '#submit-feedback',
  thumbnail: '/images/manual_func3_意見搜尋.png',
};

export default function Manual() {
  const [authModalOpen, setAuthModalOpen] = useState(false); // 控制 Modal 的開關
  const [isSignUp, setIsSignUp] = useState(false); // 控制顯示的表單類型

  // 打開 Modal，根據需要設定為註冊或登入模式
  const openAuthModal = (signUp = false) => {
    setIsSignUp(signUp);
    setAuthModalOpen(true);
  };

  // 切換登入或註冊模式
  const toggleAuthPage = () => {
    setIsSignUp((prev) => !prev);
  };

  return (
    <Layout>
      <Container size="lg" py="md">
        {/* 頁面標題 */}
        <Title order={2} mb="lg" className={styles.textAlignCenter}>
          歡迎來到「國民之聲」！讓我們一起打造更好的國家未來！
        </Title>

        {/* 說明文字 */}
        <Text className={styles.textAlignCenter} mb="lg">
          <b></b>
        </Text>

        {/* 融入功能亮點的文字內容 */}
        <Text mb="md">
          我們的平台提供<strong>用戶友好的意見提交與管理功能</strong>
          ，讓您能快速撰寫並提交您的意見或建議。
          無論是對於政策的看法，還是需要解決的問題，您都可以通過簡單直觀的操作完成。
          <br />
          請參考下方<strong>「2. 用戶意見提交與管理」</strong>
        </Text>

        <Text mb="md">
          為了幫助您更快地找到相關內容，我們還提供<strong>強大的搜尋與篩選工具</strong>。
          您可以使用關鍵字搜尋或篩選條件來定位所需的提案或意見，節省寶貴的時間。
          <br />
          請參考下方<strong>「3. 意見搜尋與篩選」</strong>
        </Text>

        <Text mb="md">
          您不需要擔心錯過重要的更新。我們的平台包含一個
          <strong>即時通知系統</strong>
          ，當有提案變更或新留言時，會第一時間提醒您，確保資訊無縫銜接。
          <br />
          請參考下方<strong>「4. 通知系統」</strong>
        </Text>

        {/* 網站導覽結構 */}
        <Accordion multiple>
          {/* 帳號註冊與登錄 */}
          <Accordion.Item value="account">
            <Accordion.Control>
              <span className={styles.accordionLabel}>1. 帳號註冊與登錄</span>
            </Accordion.Control>
            <Accordion.Panel>
              您需要先註冊帳號才能享受網站的所有功能。我們支持快速且安全的註冊流程：
              <br />
              <Image
                src="/images/manual_func1_帳號.png"
                alt="用戶意見提交"
                width="100%"
                height="auto"
                radius="md"
                // withPlaceholder
              />
              <Anchor
                className={styles.anchorLink}
                onClick={() => openAuthModal(true)} // 註冊模式
                style={{ cursor: 'pointer' }}
              >
                1-1. 電子郵件註冊
              </Anchor>
              ：在頁面頂端的「註冊」頁面進行，提供有效的電子郵件地址，並設置密碼以完成註冊。
              <br />
              <Anchor
                className={styles.anchorLink}
                onClick={() => openAuthModal(false)} // 登錄模式
                style={{ cursor: 'pointer' }}
              >
                1-2. 系統驗證
              </Anchor>
              ：在頁面頂端的「登入」頁面進行，使用您的電子郵件和密碼登錄，開始使用我們的服務。
            </Accordion.Panel>
          </Accordion.Item>

          {/* 用戶意見提交與管理 */}
          <Accordion.Item value="user-feedback">
            <Accordion.Control>
              <span className={styles.accordionLabel}>2. 用戶意見提交與管理</span>
            </Accordion.Control>
            <Accordion.Panel>
              想要提交您的想法或建議嗎？我們的平臺提供了一個結構化的意見提交工具：
              <br />
              <Image
                src="/images/manual_func2_意見撰寫.png"
                alt="用戶意見提交"
                width="100%"
                height="auto"
                radius="md"
                // withPlaceholder
              />
              <Text mb="md">
                <Text size="md" component="span">
                  <b>2-1. 撰寫與提交意見：</b>
                </Text>
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;首先，您可以自由撰寫與提交意見，前往頂部的「議題與討論」頁面，寫下您想表達的內容，並根據需要附上相關的附件（非必要，可以選擇不附上）。提交的過程簡單直觀，讓您可以快速完成操作。
              </Text>
              <Text mb="md">
                <Text size="md" component="span">
                  <b>2-2 重複檢查：</b>
                </Text>
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;在提交意見之前，我們的系統會自動檢查是否已有類似的提案建議存在，幫助減少重複的提案。這不僅能提升效率，還能確保每個建議都能集中討論，避免浪費資源。
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;我們也會自動生成提案標籤供您選擇，讓您的提案可以匹配到最合適的標籤，提高被搜尋到的效率。
              </Text>
              <Text mb="md">
                <Text size="md" component="span">
                  <b>2-3 部門分類與彙整：</b>
                </Text>
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;提交的意見會自動分配至相關頁面。我們使用 AI
                分類工具，確保您的建議能在最適合的部門頁面被呈現與討論。
              </Text>
              <Text mb="md">
                <Text size="md" component="span">
                  <b>2-4 討論與回應：</b>
                </Text>
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;您的意見提交後，其他用戶可在平台上查看並留言參與討論。同時，相關政府人員也可根據建議進行回應，確保您的聲音被聽見並被重視。
              </Text>
            </Accordion.Panel>
          </Accordion.Item>

          {/* 意見搜尋與篩選 */}
          <Accordion.Item value="search">
            <Accordion.Control>
              <span className={styles.accordionLabel}>3. 意見搜尋與篩選</span>
            </Accordion.Control>
            <Accordion.Panel>
              <Image
                src="/images/manual_func3_意見搜尋.png"
                alt="用戶意見提交"
                width="100%"
                height="auto"
                radius="md"
                // withPlaceholder
              />
              <Text mt="sm">
                <strong>3.1 輸入感興趣的關鍵字：</strong>
                當您想要尋找意見提案時，可以前往頂部的「議題討論」頁面，在搜尋欄中輸入想尋找的關鍵字，系統將會根據輸入自動匹配篩選出相關提案。
              </Text>
              <Text mt="sm">
                <strong>3.2 智能推薦功能：</strong>
                系統將根據輸入的關鍵字，自動推薦最符合的議題，幫助您快速找到您想要的訊息。
              </Text>
            </Accordion.Panel>
          </Accordion.Item>

          {/* 通知系統 */}
          <Accordion.Item value="notification">
            <Accordion.Control>
              <span className={styles.accordionLabel}>4. 通知系統</span>
            </Accordion.Control>
            <Accordion.Panel>
              <Image
                src="/images/manual_func4_通知.png"
                alt="用戶意見提交"
                width="100%"
                height="auto"
                radius="md"
                // withPlaceholder
              />
              為了確保您不會錯過任何重要的更新，我們的平台提供了郵件的通知功能。以下是詳細說明：
              <Text mt="sm">
                <strong>4-1. 新留言通知：</strong>
                當有人對您或您所追蹤的提案留言時，系統將即時通知您，讓您可以登入再繼續進行討論。
              </Text>
              <Text mt="sm">
                <strong>4-2. 提案更新通知：</strong>
                若相關部門直接回應您的提案，我們也將通知您，方便了解提案的最新進展，並與相關部門進行更深入的交流。
              </Text>
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>

        {/* Modal*/}
        <Modal
          opened={authModalOpen}
          onClose={() => setAuthModalOpen(false)}
          title={null} // no title
        >
          {isSignUp ? (
            <SignUp
              onToggle={toggleAuthPage}
              onClose={() => setAuthModalOpen(false)} // 當 Modal 關閉時執行
              onLoginSuccess={() => {
                console.log('Login successful');
                setAuthModalOpen(false); // 登錄成功後關閉 Modal
              }}
            />
          ) : (
            <AuthenticationTitle
              onToggle={toggleAuthPage}
              onClose={() => setAuthModalOpen(false)} // 當 Modal 關閉時執行
              onLoginSuccess={() => {
                console.log('Login successful');
                setAuthModalOpen(false); // 登錄成功後關閉 Modal
              }}
            />
          )}
        </Modal>
      </Container>
    </Layout>
  );
}
