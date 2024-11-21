import { Layout } from '@/components/Layout/Layout';
import React from "react";
import { useState } from 'react';
import { IconUpload, IconX } from '@tabler/icons-react';
import { Button, Container, FileInput, Group, MantineProvider, Modal, Pill, PillsInput, rem, Stack, Text, Textarea, Timeline, useCombobox } from '@mantine/core';
import { useDisclosure, useValidatedState } from '@mantine/hooks';
import { Dropzone } from '@mantine/dropzone';
import '@mantine/dropzone/styles.css';
import { Notifications, notifications } from '@mantine/notifications';
import '@mantine/notifications/styles.css';


export default function EditPage_1() {
	const [{ value: titleValue, valid: titleValid }, setTitleValue] = useValidatedState(
    '',
    (val) => val.length > 0 && val.length <= 30,
    true
  );
	const [{ value: contentValue, valid: contentValid }, setContentValue] = useValidatedState(
    '',
    (val) => val.length > 0 && val.length <= 300,
    true
  );
  const [fileValue, setFileValue] = useState<File[]>([]);
  const [nextStepModalOpened, { open: openNextStepModal, close: closeNextStepModal }] = useDisclosure(false);
  const [saveModalOpened, { open: openSaveModal, close: closeSaveModal }] = useDisclosure(false);

  const inputValidation = () =>
		(titleValue.length > 0 && contentValue.length > 0 && titleValid && contentValid) ? openNextStepModal() : invalidNotification()

  const invalidNotification = () => notifications.show({
	  title: '無法送出',
	  message: '請依照要求填寫必填欄位!'
	})

  const timelineProgress = 0

	return (
    <Layout>
      <MantineProvider>
        <Container>
          <Notifications position="top-right" zIndex={1000}/>
          <Modal opened={nextStepModalOpened} onClose={closeNextStepModal} title="完成確認" centered>
            <Text size="sm">進行至下一步？</Text>
            <Group justify="flex-end" gap={"xl"}>
              <Button component="a" href="/edit_2" variant="filled" size="sm">是</Button>
              <Button variant="default" size="sm" onClick={closeNextStepModal}>否</Button>
            </Group>
          </Modal>
          <Modal opened={saveModalOpened} onClose={closeSaveModal} title="保存成功" centered>
            <Text size="sm">是否退出編輯？</Text>
            <Group justify="flex-end" gap={"xl"}>
              <Button variant="filled" size="sm">是</Button>
              <Button variant="default" size="sm" onClick={closeSaveModal}>否</Button>
            </Group>
          </Modal>
          <Group justify="space-between" gap={"xl"} >
            <Stack>
              <Text fw={700} size="lg">輕鬆提案三步驟</Text>
              <Timeline title="輕鬆提案三步驟" active={timelineProgress} bulletSize={24} lineWidth={4}>
                <Timeline.Item title="第一步：填寫資料">          
                  <Text c="dimmed" size="sm">
                    輸入標題與內文，並上傳附件（非必要）
                  </Text>
                </Timeline.Item>
                <Timeline.Item title="第二步：選擇相關標籤">        
                  <Text c="dimmed" size="sm">
                    依內容搜尋並選擇想加上的標籤
                  </Text>
                </Timeline.Item>
                <Timeline.Item title="第三步：公開此提議">   
                  <Text c="dimmed" size="sm">
                    點擊「送出提案」即可將提議公開
                  </Text>
                </Timeline.Item>
              </Timeline>
            </Stack>
            <Stack w={600} gap={"xl"}>
              <Textarea 
                label="主題（必填）"
                placeholder="請輸入主題，30字以內，必填" 
                required
                radius="lg"
                autosize
                minRows={4}
                value={titleValue}
                onChange={(event) => setTitleValue(event.currentTarget.value)}
                error={!titleValid}
              />
              <Textarea 
                label="提案內容或建議事項（必填）"
                placeholder="請輸入內容或建議事項，300字以內，必填" 
                required
                radius="lg"
                autosize
                minRows={15}
                value={contentValue}
                onChange={(event) => setContentValue(event.currentTarget.value)}
                error={!contentValid}
              />
              <FileInput
                label="上傳附件（支援圖片、影像格式）"
                placeholder="選擇檔案或將檔案拖至此處（支援圖片、影像格式）"
                accept="image/png,image/jpeg,video/mp4"
                radius="lg"
                clearable
                multiple
                value={fileValue} 
                onChange={setFileValue}
              />
              <Dropzone
                onDrop={(files) => console.log('accepted files', files)}
                onReject={(files) => console.log('rejected files', files)}
                maxSize={5 * 1024 ** 2}
                accept={['image/png', 'image/gif', 'image/jpeg', 'image/svg+xml', 'image/webp', 'image/avif', 'image/heic', 'image/heif', 'video/mp4']}
              >
                <Group justify="center" gap="xl" mih={220} style={{ pointerEvents: 'none' }}>
                  <Dropzone.Accept>
                    <IconUpload
                      style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-blue-6)' }}
                      stroke={1.5}
                    />
                  </Dropzone.Accept>
                  <Dropzone.Reject>
                    <IconX
                      style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-red-6)' }}
                      stroke={1.5}
                    />
                  </Dropzone.Reject>
                  <Dropzone.Idle>
                    <IconUpload
                      style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-dimmed)' }}
                      stroke={1.5}
                    />
                  </Dropzone.Idle>

                  <div>
                    <Text size="xl" inline>
                      Drag images here or click to select files
                    </Text>
                    <Text size="sm" c="dimmed" inline mt={7}>
                      Attach as many files as you like, each file should not exceed 5mb
                    </Text>
                  </div>
                </Group>
              </Dropzone>
              <Group justify="space-between" gap={"xl"} grow>
                <Button variant="filled" size="lg" onClick={openSaveModal}>保留草稿</Button>
                <Button variant="filled" size="lg" onClick={inputValidation}>填寫完成</Button>
              </Group>
            </Stack>
          </Group>
        </Container>
      </MantineProvider>
    </Layout>
	)
}