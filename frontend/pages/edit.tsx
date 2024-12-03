import { Layout } from '@/components/Layout/Layout';
import { ProposalCard } from '@/components/ProposalCard/ProposalCard';
import { Proposal } from '@/types/Proposal';
import { Tag, TagType } from '@/types/Tag';
import React, { useState, useRef } from 'react';
import { IconUpload, IconX } from '@tabler/icons-react';
import { Badge, Button, Card, CheckIcon, Combobox, Container, FileInput, Flex, Grid, Group, Image, MantineProvider, Modal, Pill, PillsInput, rem, ScrollArea, SimpleGrid, Stack, Text, Textarea, Timeline, useCombobox } from '@mantine/core';
import { useDisclosure, useValidatedState, useViewportSize } from '@mantine/hooks';
import { Dropzone } from '@mantine/dropzone';
import '@mantine/dropzone/styles.css';
import { Notifications, notifications } from '@mantine/notifications';
import '@mantine/notifications/styles.css';
import { IconPhoto, IconVideo } from '@tabler/icons-react';

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
  const [tagValue, setTagValue] = useState<any[]>([]);
  const [tagNameValue, setTagNameValue] = useState<string[]>([]);
  const [publishModalOpened, { open: openPublishModal, close: closePublishModal }] = useDisclosure(false);
  
  const MAX_TAGS = 3;
  const MAX_PILL_LENGTH = 10;
  const CARD_HEIGHT = 250;
  const CARD_WIDTH = 250;
  const timelineProgress = onFirstStep ? 0 : 1
  const WIDTH_OFFSET = 65;
  const { height, width } = useViewportSize();
  const tagList = [
    { id: 1, tagType: TagType.department, name: "交通部" },
    { id: 2, tagType: TagType.department, name: "文化部" },
    { id: 3, tagType: TagType.department, name: "國防部" },
    { id: 4, tagType: TagType.department, name: "想不到了" },
    { id: 5, tagType: TagType.topic, name: "文化幣" },
    { id: 6, tagType: TagType.topic, name: "食品安全" },
    { id: 7, tagType: TagType.topic, name: "asdfg" },
    { id: 8, tagType: TagType.topic, name: "還有啥來著" },
    { id: 9, tagType: TagType.topic, name: "1234567" },
    { id: 10, tagType: TagType.topic, name: "bbbb bbbbbb bbb" },
    { id: 11, tagType: TagType.topic, name: "🍌" },
    { id: 12, tagType: TagType.topic, name: "" },
  ];
  const autoTags = [
    tagList[2],
    tagList[5],
    tagList[7],
    tagList[8],
  ];
  const testProposals: Proposal[] = [
    {
      id: 0,
      status: "",
      title: "相似提案 1",
      thumbnail: "https://via.placeholder.com/150",
      postedTime: "",
      tags: [
        { id: 1, tagType: TagType.department, name: "交通部" },
        { id: 7, tagType: TagType.topic, name: "asdfg" },
      ],
    },
    {
      id: 1,
      status: "",
      title: "相似提案 2",
      thumbnail: "https://via.placeholder.com/150",
      postedTime: "",
      tags: [
        { id: 2, tagType: TagType.department, name: "文化部" },
        { id: 5, tagType: TagType.topic, name: "文化幣" },
        { id: 11, tagType: TagType.topic, name: "🍌" },
        { id: 12, tagType: TagType.topic, name: "" },
      ],
    },
    {
      id: 2,
      status: "",
      title: "相似提案 3",
      thumbnail: "https://via.placeholder.com/150",
      postedTime: "",
      tags: [
        { id: 3, tagType: TagType.department, name: "國防部" },
      ],
    },
    {
      id: 3,
      status: "",
      title: "相似提案 4",
      thumbnail: "https://via.placeholder.com/150",
      postedTime: "",
      tags: [
        { id: 4, tagType: TagType.department, name: "想不到了" },
        { id: 5, tagType: TagType.topic, name: "文化幣" },
        { id: 6, tagType: TagType.topic, name: "食品安全" },
        { id: 7, tagType: TagType.topic, name: "asdfg" },
        { id: 8, tagType: TagType.topic, name: "還有啥來著" },
        { id: 9, tagType: TagType.topic, name: "1234567" },
        { id: 10, tagType: TagType.topic, name: "bbbb bbbbbb bbb" },
        { id: 11, tagType: TagType.topic, name: "🍌" },
        { id: 12, tagType: TagType.topic, name: "" },
      ],
    },
  ];
  

  function inputValidation() {
		(titleValue.length > 0 && contentValue.length > 0 && titleValid && contentValid) ? nextStep() : invalidNotification()
  }
  function nextStep() {
    setOnFirstStep(false)
    setOnSecondStep(true)
    tagValue.forEach(element => {
      handleTagValueRemove(element.name)
    });
    autoTags.forEach(element => {
      handleTagValueSelect(element.name)
    });
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
  function uploadFile(newFiles:File[]) {
    if (newFiles.length == 0) 
    {
      setFileValue(newFiles)
      console.log('cleared files')
    }
    else
    {
      setFileValue(fileValue.concat(newFiles))
      console.log('accepted files', newFiles)
    }
  }
  function extractTagNames(tags: Tag[]): string[] {
    return tags.map((tag) => tag.name);
  }
  function findTag(input:string): Tag | undefined {
    return tagList.find((tag) => tag.name == input)
  }

	const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
    onDropdownOpen: () => combobox.updateSelectedOptionIndex('active'),
  });

  const handleTagValueSelect = (val: string) => {
    setTagValue((current) =>
      current.includes(findTag(val)) ? current.filter((v) => v != findTag(val)) : [...current, findTag(val)]
    );
    setTagNameValue((current) =>
      current.includes(val) ? current.filter((v) => v != val) : [...current, val]
    );
    //setTagNameValue(extractTagNames(tagValue))
  }

  const handleTagValueRemove = (val: string) =>  {
    setTagValue((current) => current.filter((v) => v != findTag(val)));
    setTagNameValue((current) => current.filter((v) => v != val))
  }

  const tagPills = tagNameValue.map((item) => (
    <Pill key={item} withRemoveButton onRemove={() => handleTagValueRemove(item)}>
      {item}
    </Pill>
  ));

  const scrollAreaRef = useRef(null);
  const handleWheel = (event: any) => {
    event.preventDefault();
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollBy({
        left: event.deltaY,
        behavior: "smooth",
      });
    }
  };

  const options = extractTagNames(tagList)
    .filter((item) => item.toLowerCase().includes(tagSearch.trim().toLowerCase()))
    .map((item) => (
      <Combobox.Option value={item} key={item} active={tagNameValue.includes(item)}>
        <Group gap="sm">
          {tagNameValue.includes(item) ? <CheckIcon size={12} /> : null}
          <span>{item}</span>
        </Group>
      </Combobox.Option>
    ));
	

	return (
    <Layout>
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
    <MantineProvider>
        <Group justify="center" gap={"xl"} >              
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
          <Stack w={width < 990 + WIDTH_OFFSET ? (width - WIDTH_OFFSET) : 990} gap={"xl"}>
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
              accept="image/png, image/gif, image/jpeg, image/svg+xml, image/webp, image/avif, image/heic, image/heif, video/mp4"
              radius="lg"
              clearable
              multiple
              value={fileValue} 
              onChange={uploadFile}
            />
            <Dropzone
              onDrop={(files) => uploadFile(files)}
              onReject={(files) => console.log('rejected files', files)}
              maxSize={5 * 1024 ** 2}
              accept={['image/png', 'image/gif', 'image/jpeg', 'image/svg+xml', 'image/webp', 'image/avif', 'image/heic', 'image/heif', 'video/mp4']}
            >
              {fileValue.length == 0 &&
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
                    將圖片/影像檔拖至此處或點擊以選取檔案
                  </Text>
                  <Text size="sm" c="dimmed" inline mt={7}>
                    檔案總數不限，每份檔案大小不應超過5mb
                  </Text>
                  <Text size="sm" c="dimmed" inline mt={7}>
                    可接受png/gif/jpeg/svg/xml/webp/avif/heic/heif/mp4等格式
                  </Text>
                </div>
              </Group>
              }
              {(fileValue.length != 0) &&
              <Grid gutter="md">
                {fileValue.map((file, index) => (
                  <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
                    <Stack justify="center" align="center">
                      {file.type != "video/mp4" &&
                      <IconPhoto
                        style={{ width: rem(80), height: rem(80) }}
                        stroke={1.5}
                        color="var(--mantine-color-blue-filled)"
                      />
                      }
                      {file.type == "video/mp4" &&
                      <IconVideo
                        style={{ width: rem(80), height: rem(80) }}
                        stroke={1.5}
                        color="var(--mantine-color-blue-filled)"
                      />
                      }
                      <Text align="center">
                        {file.name}
                      </Text>
                    </Stack>
                  </Grid.Col>
                ))}
              </Grid>
              }
            </Dropzone>
            <Group justify="space-between" gap={"xl"} grow>
              <Button variant="filled" size="lg" onClick={openSaveModal}>保留草稿</Button>
              <Button variant="filled" size="lg" onClick={inputValidation}>填寫完成</Button>
            </Group>
          </Stack>
          }
          {onSecondStep &&
          <Stack w={width < 990 + WIDTH_OFFSET ? (width - WIDTH_OFFSET) : 990} gap={"xl"}>
            <Combobox store={combobox} onOptionSubmit={handleTagValueSelect}>
              <Combobox.DropdownTarget>
                <PillsInput onClick={() => combobox.openDropdown()} label="標籤選擇" radius={"lg"}>
                  <Group>
                    {tagPills}
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
                  </Group>
                </PillsInput>
              </Combobox.DropdownTarget>
              <Combobox.Dropdown>
                <Combobox.Options mah={200} style={{ overflowY: 'auto' }}>
                  {options.length > 0 ? options : <Combobox.Empty>無此標籤</Combobox.Empty>}
                </Combobox.Options>
              </Combobox.Dropdown>
            </Combobox>
            <Text fw={700} size="lg">
              或許你想看看...？
            </Text>
            <ScrollArea
              style={{ width: "100%", overflowX: "auto" }}
              scrollbarSize={8}
              type="hover"
              viewportRef={scrollAreaRef}
              onWheel={handleWheel}
            >
              <Group gap={"md"} style={{ display: "flex", flexWrap: "nowrap" }}>
                {testProposals.map((card, index) => (
                  <Card
                    key={index}
                    withBorder 
                    radius="md" 
                    component="a" 
                    href="#"
                    shadow="sm"
                    padding="lg"
                    style={{ width: `${CARD_WIDTH}px`, height: `${CARD_HEIGHT}px`,  flex: "0 0 auto" }}
                  >
                    <Card.Section>
                      <Image src={card.thumbnail} alt={card.title} height={130} />
                    </Card.Section>
                    <Text size="lg" mt="md">
                      {card.title}
                    </Text>
                    <Group gap={"xs"} mt="xs">
                      {card.tags.slice(0, MAX_TAGS).map((tag, tagIndex) => (
                        <Badge
                          key={tagIndex}
                          variant={tag.tagType === TagType.department ? 'white' : 'light'}
                          color="blue"
                          radius="xl"
                          style={{
                            maxWidth: "80px",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {tag.name.length > MAX_PILL_LENGTH
                            ? `${tag.name.slice(0, MAX_PILL_LENGTH)}...`
                            : tag.name}
                        </Badge>
                      ))}
                      {card.tags.length > MAX_TAGS && (
                        <Badge variant="outline" color="gray" radius="xl">
                          +{card.tags.length - MAX_TAGS} more
                        </Badge>
                      )}
                    </Group>
                  </Card>
                ))}
              </Group>
            </ScrollArea>
            {/*
            <Container>
              <SimpleGrid cols={3} spacing="lg">
                {testProposals.map((proposal) => (
                  <ProposalCard key={proposal.id} data={proposal} />
                ))}
              </SimpleGrid>
            </Container>
            */}
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
      </MantineProvider>
    </Layout>
	)
}