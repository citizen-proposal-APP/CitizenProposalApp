import { Layout } from '@/components/Layout/Layout';
import React from "react";
import { useState } from 'react';
import { IconUpload, IconX } from '@tabler/icons-react';
import { Button, CheckIcon, Combobox, Container, FileInput, Group, MantineProvider, Modal, Pill, PillsInput, rem, Stack, Text, Textarea, Timeline, useCombobox } from '@mantine/core';
import { useDisclosure, useValidatedState } from '@mantine/hooks';
import { Dropzone } from '@mantine/dropzone';
import '@mantine/dropzone/styles.css';
import { Notifications, notifications } from '@mantine/notifications';
import '@mantine/notifications/styles.css';


export default function EditPage() {
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
  const [onFirstStep, setOnFirstStep] = useState(true);
  const [onSecondStep, setOnSecondStep] = useState(false);
  const [saveModalOpened, { open: openSaveModal, close: closeSaveModal }] = useDisclosure(false);
  const [tagSearch, setTagSearch] = useState('');
  const [tagValue, setTagValue] = useState<string[]>([]);
  const [publishModalOpened, { open: openPublishModal, close: closePublishModal }] = useDisclosure(false);
  
  const timelineProgress = onFirstStep ? 0 : 1
  const tags = [
    '文化幣',
    '食品安全',
    '交通部',
    '想不到了',
    '還有啥來著',
    'asdfg',
    '1234567',
    'bbbb bbbbbb bbb',
    '🍌',
    '',
    'bbbb bbbbb bbb',
    'bbbb bbb bbb',
    'bbbb bbbb bbb',
    'bbbb b bbb',
    'bbbb bb bbb',
    'bbbbb bbb',
    'bbbb bbb',
    'bbb bbb',
    'bb bbb',
    'bbbb ',
    'bb',
    'a'
  ];
  const autoTags = [
    '文化幣',
    '🍌',
    '',
    'bbbb bbbbb bbb',
    'a'
  ];

  function inputValidation() {
		(titleValue.length > 0 && contentValue.length > 0 && titleValid && contentValid) ? nextStep() : invalidNotification()
  }
  function nextStep() {
    setOnFirstStep(false)
    setOnSecondStep(true)
    setTagValue(autoTags)
  }
  function prevStep() {
    setOnFirstStep(true)
    setOnSecondStep(false)
  }
  function invalidNotification() {
    notifications.show({
      title: '無法送出',
      message: '請依照要求填寫必填欄位!'
    })
  }

	const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
    onDropdownOpen: () => combobox.updateSelectedOptionIndex('active'),
  });

  const handleTagValueSelect = (val: string) =>
    setTagValue((current) =>
      current.includes(val) ? current.filter((v) => v !== val) : [...current, val]
    );

  const handleTagValueRemove = (val: string) =>
    setTagValue((current) => current.filter((v) => v !== val));

  const values = tagValue.map((item) => (
    <Pill key={item} withRemoveButton onRemove={() => handleTagValueRemove(item)}>
      {item}
    </Pill>
  ));

  const options = tags
    .filter((item) => item.toLowerCase().includes(tagSearch.trim().toLowerCase()))
    .map((item) => (
      <Combobox.Option value={item} key={item} active={tagValue.includes(item)}>
        <Group gap="sm">
          {tagValue.includes(item) ? <CheckIcon size={12} /> : null}
          <span>{item}</span>
        </Group>
      </Combobox.Option>
    ));
	

	return (
    <Layout>
      <MantineProvider>
        <Container>
          <Notifications position="top-right" zIndex={1000}/>
          <Modal opened={publishModalOpened} onClose={closePublishModal} title="送出確認" centered>
            <Text size="sm">確認送出提案？</Text>
            <Group justify="flex-end" gap={"xl"}>
              <Button variant="filled" size="sm">是</Button>
              <Button variant="default" size="sm" onClick={closePublishModal}>否</Button>
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
            {onFirstStep &&
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
            }
            {onSecondStep &&
              <Stack w={600} gap={"xl"}>
              <Combobox store={combobox} onOptionSubmit={handleTagValueSelect}>
                <Combobox.DropdownTarget>
                  <PillsInput onClick={() => combobox.openDropdown()} label="標籤選擇" radius={"lg"}>
                    <Pill.Group>
                      {values}
                      <Combobox.EventsTarget>
                        <PillsInput.Field
                          onFocus={() => combobox.openDropdown()}
                          onBlur={() => combobox.closeDropdown()}
                          value={tagSearch}
                          placeholder="請輸入關鍵字，並選取推薦標籤"
                          onChange={(event) => {
                            combobox.updateSelectedOptionIndex();
                            setTagSearch(event.currentTarget.value);
                          }}
                          onKeyDown={(event) => {
                            if (event.key === 'Backspace' && tagSearch.length === 0) {
                              event.preventDefault();
                              handleTagValueRemove(tagValue[tagValue.length - 1]);
                            }
                          }}
                        />
                      </Combobox.EventsTarget>
                    </Pill.Group>
                  </PillsInput>
                </Combobox.DropdownTarget>
                <Combobox.Dropdown>
                  <Combobox.Options mah={200} style={{ overflowY: 'auto' }}>
                    {options.length > 0 ? options : <Combobox.Empty>無此標籤</Combobox.Empty>}
                  </Combobox.Options>
                </Combobox.Dropdown>
              </Combobox>
              <Group justify="space-between" gap={"xl"} grow>
                <Button variant="filled" size="lg" onClick={openSaveModal}>保留草稿</Button>
                <Button variant="filled" size="lg" onClick={prevStep}>回上一步</Button>
              </Group>
              <Group justify="space-between" gap={"xl"} grow>
                <Button variant="filled" size="lg" onClick={openPublishModal}>送出提案</Button>
              </Group>
            </Stack>
          }
          </Group>
        </Container>
      </MantineProvider>
    </Layout>
	)
}