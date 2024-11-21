import { Layout } from '@/components/Layout/Layout';
import React from "react";
import { useState } from 'react';
import { Button, CheckIcon, Combobox, Container, Group, MantineProvider, Modal, Pill, PillsInput, Stack, Text, Timeline, useCombobox } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Notifications, notifications } from '@mantine/notifications';
import '@mantine/notifications/styles.css';

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
export default function EditPage_2() {
	const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
    onDropdownOpen: () => combobox.updateSelectedOptionIndex('active'),
  });

  const [tagSearch, setTagSearch] = useState('');
  const [tagValue, setTagValue] = useState<string[]>([]);
  const [publishModalOpened, { open: openPublishModal, close: closePublishModal }] = useDisclosure(false);
  const [saveModalOpened, { open: openSaveModal, close: closeSaveModal }] = useDisclosure(false);

  const invalidNotification = () => notifications.show({
	  title: '無法送出',
	  message: '請依照要求填寫必填欄位!'
	})

  const timelineProgress = 1

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
                <Button component="a" href="/edit_1" variant="filled" size="lg">回上一步</Button>
                <Button variant="filled" size="lg" onClick={openPublishModal}>送出提案</Button>
              </Group>
            </Stack>
          </Group>
        </Container>
      </MantineProvider>
    </Layout>
	)
}