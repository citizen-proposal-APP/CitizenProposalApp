import { Layout } from '@/components/Layout/Layout';
import { ProposalCard } from '@/components/ProposalCard/ProposalCard';
import { Proposal } from '@/types/Proposal';
import { Tag, TagType } from '@/types/Tag';
import React, { useState, useRef } from 'react';
import { IconUpload, IconX } from '@tabler/icons-react';
import { Badge, Button, Card, CheckIcon, Combobox, Container, Grid, Group, Image, MantineProvider, Modal, Pill, PillsInput, rem, ScrollArea, SimpleGrid, Stack, TagsInput, Text, Textarea, Timeline, Title, useCombobox } from '@mantine/core';
import { useDisclosure, useValidatedState, useViewportSize } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import { Dropzone } from '@mantine/dropzone';
import '@mantine/dropzone/styles.css';
import { Notifications, notifications } from '@mantine/notifications';
import '@mantine/notifications/styles.css';
import { IconPhoto, IconVideo } from '@tabler/icons-react';
import { Configuration, AiApi, PostsApi, TagsApi } from '@/openapi';

export default function EditPage() {
	const [titleValue, setTitleValue] = useState<string>("");
	const [contentValue, setContentValue] = useState<string>("");
  const [fileValue, setFileValue] = useState<File[]>([]);
  const [replacingQueue, setReplacingQueue] = useState<File[]>([]);
  const [currentReplacingFile, setCurrentReplacingFile] = useState<File | null>(null);
  const [onFirstStep, setOnFirstStep] = useState(true);
  const [onSecondStep, setOnSecondStep] = useState(false);
  const [saveModalOpened, { open: openSaveModal, close: closeSaveModal }] = useDisclosure(false);
  const [publishModalOpened, { open: openPublishModal, close: closePublishModal }] = useDisclosure(false);
  const [replaceModalOpened, setReplaceModalOpened] = useState(false);  
  const [confirmModalOpened, setConfirmModalOpened] = useState(false);  
  /*
  const [tagSearch, setTagSearch] = useState('');
  const [tagValue, setTagValue] = useState<any[]>([]);
  */
  const [tagList, setTagList] = useState<any[]>([]);
  const [tagNameValue, setTagNameValue] = useState<string[]>([]);
  const MAX_FILE_SIZE = 50 * 1024 ** 2;
  const WIDTH_OFFSET = 65;
  /*
  const MAX_TAGS = 3;
  const MAX_PILL_LENGTH = 10;
  const CARD_HEIGHT = 250;
  const CARD_WIDTH = 250;
  */
  const timelineProgress = onFirstStep ? 0 : 1
  const { height, width } = useViewportSize();

  const form = useForm({
    mode: 'uncontrolled',
    validateInputOnChange: true,
    validateInputOnBlur: true,
    initialValues: { title: '', content: '' },
    validate: {
      title: () => titleValue.length == 0 
        ? '此欄位為必填' 
        : titleValue.length > 100
          ? '此欄位字數不得超過100字'
          : null,
      content: () => contentValue.length == 0 
        ? '此欄位為必填' 
        : contentValue.length > 2000
          ? '此欄位字數不得超過2000字'
          : null,
    },
  });

  const similarProposals: Proposal[] = [
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
        { id: 10, tagType: TagType.topic, name: "bbbb bbbbbb bbb" },
        { id: 6, tagType: TagType.topic, name: "食品安全" },
        { id: 9, tagType: TagType.topic, name: "1234567" },
        { id: 8, tagType: TagType.topic, name: "還有啥來著" },
        { id: 11, tagType: TagType.topic, name: "🍌" },
        { id: 12, tagType: TagType.topic, name: "" },
      ],
    },
  ];
  
  function inputValidation() {
		form.isValid() ? nextStep() : handleNotification("text")
  }
  function nextStep() {
    setOnFirstStep(false)
    setOnSecondStep(true)
    /*
    tagValue.forEach(element => {
      handleTagValueRemove(element.name)
    });
    autoTags.forEach(element => {
      handleTagValueSelect(element.name)
    });
    */
  }
  function prevStep() {
    setOnFirstStep(true)
    setOnSecondStep(false)
  }
  function handleNotification(sig: string) {
    switch (sig) {
      case "text":
        notifications.show({
          title: '無法送出',
          message: '請依照要求填寫必填欄位'
        })
        break;
      case "file":
        notifications.show({
          title: '檔案無法上傳',
          message: '請確認欲上傳檔案之大小和格式'
        })
        break
      case "sighin":
        notifications.show({
          title: '尚未登入',
          message: '請先登入後即可發布提案'
        })
        break
      case "unknown":
        notifications.show({
          title: '發生未知錯誤',
          message: '請稍候再嘗試'
        })
        break
  
      default:
        break;
    }
    
  }
  function uploadFile(newFiles: File[]) {
    if (newFiles.length === 0) {
      setFileValue([]);
      console.log("cleared files");
    } 
    else {
      const duplicateFiles: File[] = [];
      newFiles.forEach((newFile) => {
        if (newFile.size <= MAX_FILE_SIZE) {
          if (fileValue.some((file) => file.name === newFile.name)) {
            duplicateFiles.push(newFile);
            console.log("duplicate file", newFile);
          } else {
            setFileValue((current) => [...current, newFile]);
            console.log("accepted file", newFile);
          }
        }
      });
      if (duplicateFiles.length > 0) {
        console.log("handle duplicate files");
        setReplacingQueue((queue) => [...queue, ...duplicateFiles]);
        console.log("replacing files", replacingQueue);
        processNextReplacement();
      }
    }
  }
  function clearFile() {
    uploadFile([])
  }
  function processNextReplacement() {
    setReplacingQueue((queue) => {
      const [nextFile, ...remainingQueue] = queue;
      setCurrentReplacingFile(nextFile || null);
      console.log("current replacing file", nextFile);
      setReplaceModalOpened(Boolean(nextFile));
      return remainingQueue;
    });
  }
  function replaceFile() {
    if (currentReplacingFile) {
      setFileValue((current) =>
        current.filter((file) => file.name !== currentReplacingFile.name)
      );
      setFileValue((current) => [...current, currentReplacingFile]);
      console.log("replaced file", currentReplacingFile);
    }
    setCurrentReplacingFile(null);
    setReplaceModalOpened(false);
    processNextReplacement()
  }
  function skipFile() {
    console.log("skipped file", currentReplacingFile);
    setCurrentReplacingFile(null);
    setReplaceModalOpened(false);
    processNextReplacement()
  }
  function extractTagNames(tags: Tag[]): string[] {
    return tags.map((tag) => tag.name);
  }
  /*
  function findTag(input:string): Tag | undefined {
    return tagList.find((tag) => tag.name == input)
  }
  */

  /*
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
  */

  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const handleWheel = (event: any) => {
    event.preventDefault();
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollBy({
        left: event.deltaY,
        behavior: "smooth",
      });
    }
  };

  /*
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
	*/

  const conf = new Configuration({
    basePath: process.env.NEXT_PUBLIC_BASE_PATH!,
    credentials: 'include',
  });

  const aiApi = new AiApi(conf)
  const postsApi = new PostsApi(conf)
  const tagsApi = new TagsApi(conf)

  const publishProposal = async () => {
    try {
      await postsApi.apiPostsPost({title: titleValue, content: contentValue, tags: tagNameValue, attachments: fileValue})
    } catch (error: any) {
      if (error.response) {
        switch (error.response.status) {
          case 400:
            console.error('錯誤: 格式不符', error.response.data)
            handleNotification("text")
            break;
          case 401:
            console.error('錯誤: 使用者未登入', error.response.data)
            handleNotification("sighin")
            break;
          
          default:
            console.error('錯誤: 未知錯誤', error.response.data)
            handleNotification("unknown")
            break;
        }
      }
    } finally {
      closePublishModal();
    }
  };

  const searchTagList = async (keyword: string) => {
    if (keyword.length == 0) {
      setTagList([])
    }
    else {
      try {
        const response = await tagsApi.apiTagsGet({keyword: keyword})
        setTagList(response.tags)
      } catch (error) {
        console.error("錯誤: ", error);
      }
    }
  }

  const autoGenerateTags = async () => {
    try {
      const response = await aiApi.apiAiGuesstagsGet({title: titleValue})
      setTagNameValue(response)
    } catch (error) {
      console.error("錯誤: ", error);
    }
  }

	return (
    <Layout>
      <Notifications position="top-right" zIndex={1000}/>
      <Modal opened={publishModalOpened} onClose={closePublishModal} title="送出確認" centered size={"lg"}>
        <Text size={"md"}>確認送出提案？</Text>
        <Group justify="flex-end" gap={"xl"}>
          <Button variant="filled" size={"md"} onClick={() => publishProposal()}>是</Button>
          <Button variant="default" size={"md"} onClick={closePublishModal}>否</Button>
        </Group>
      </Modal>
      <Modal opened={saveModalOpened} onClose={closeSaveModal} title="保存成功" centered size={"lg"}>
        <Text size={"md"}>是否退出編輯？</Text>
        <Group justify="flex-end" gap={"xl"}>
          <Button variant="filled" size={"md"}>是</Button>
          <Button variant="default" size={"md"} onClick={closeSaveModal}>否</Button>
        </Group>
      </Modal>
      <Modal opened={replaceModalOpened} onClose={skipFile} title="已存在同名檔案" centered size={"lg"}>
        <Text size={"md"}>上傳區已存在名為「{currentReplacingFile?.name}」的檔案，是否取代檔案？</Text>
        <Group justify="flex-end" gap={"xl"}>
          <Button variant="filled" size={"md"} onClick={replaceFile}>是</Button>
          <Button variant="default" size={"md"} onClick={skipFile}>否</Button>
        </Group>
      </Modal>
      <Modal opened={confirmModalOpened} onClose={() => setConfirmModalOpened(false)} title="成功！" centered size={"lg"}>
        <Text size={"md"}>提案已送出！</Text>
        <Group justify="flex-end" gap={"xl"}>
          <Button variant="filled" size={"md"} onClick={() => setConfirmModalOpened(false)}>確認</Button>
        </Group>
      </Modal>
    <MantineProvider>
        <Group justify="center" gap={"xl"} >              
          <Stack>
            <Text fw={"bold"} size={"xl"}>輕鬆提案三步驟</Text>
            <Timeline title="輕鬆提案三步驟" active={timelineProgress} bulletSize={24} lineWidth={4}>
              <Timeline.Item title="第一步：填寫資料">          
                <Text c="dimmed" size={"lg"}>
                  輸入標題與內文，並上傳附件（非必要）
                </Text>
              </Timeline.Item>
              <Timeline.Item title="第二步：選擇相關標籤">        
                <Text c="dimmed" size={"lg"}>
                  依內容搜尋並選擇想加上的標籤
                </Text>
              </Timeline.Item>
              <Timeline.Item title="第三步：公開此提議">   
                <Text c="dimmed" size={"lg"}>
                  點擊「送出提案」即可將提議公開
                </Text>
              </Timeline.Item>
            </Timeline>
          </Stack>
          {onFirstStep &&
          <form onSubmit={form.onSubmit((values) => console.log(values))}>
            <Stack w={width < 990 + WIDTH_OFFSET ? (width - WIDTH_OFFSET) : 990} gap={"xl"}>
              <Title size="lg">
                主題（必填）
              </Title>
              <Textarea 
                placeholder="請輸入主題，100字以內，必填" 
                radius={"lg"}
                size={"lg"}
                autosize
                minRows={2}
                key={form.key('title')}
                {...form.getInputProps('title')}
                value={titleValue}
                onChange={(event) => setTitleValue(event.currentTarget.value)}
              />
              <Title size="lg">
                提案內容或建議事項（必填）
              </Title>
              <Textarea 
                placeholder="請輸入內容或建議事項，2000字以內，必填" 
                radius={"lg"}
                size={"lg"}
                autosize
                minRows={10}
                key={form.key('content')}
                {...form.getInputProps('content')}
                value={contentValue}
                onChange={(event) => setContentValue(event.currentTarget.value)}
              />
              <Title size="lg">
                上傳附件（支援圖片、影像格式）
              </Title>
              <Dropzone
                onDrop={(files) => uploadFile(files)}
                onReject={(files) => handleNotification("file")}
                maxSize={MAX_FILE_SIZE}
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
                    <Text size={"xl"} inline>
                      將圖片/影像檔拖至此處或點擊以選取檔案
                    </Text>
                    <Text size={"sm"} c="dimmed" inline mt={7}>
                      檔案總數不限，每份檔案大小不應超過50mb
                    </Text>
                    <Text size={"sm"} c="dimmed" inline mt={7}>
                      可接受png/gif/jpeg/svg/xml/webp/avif/heic/heif/mp4等格式
                    </Text>
                  </div>
                </Group>
                }
                {(fileValue.length != 0) &&
                <Grid gutter={"md"}>
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
                        <Text ta="center">
                          {file.name}
                        </Text>
                      </Stack>
                    </Grid.Col>
                  ))}
                </Grid>
                }
              </Dropzone>
              {fileValue.length > 0 &&
              <Button variant="filled" size="lg" onClick={clearFile}>清除已上傳的檔案</Button>
              }
              <Group justify="space-between" gap={"xl"} grow>
                {/*<Button variant="filled" size={"lg"} onClick={openSaveModal}>保留草稿</Button>*/}
                <Button variant="filled" size={"lg"} type="submit" onClick={inputValidation}>填寫完成</Button>
              </Group>
            </Stack>
          </form>
          }
          {onSecondStep &&
          <Stack w={width < 990 + WIDTH_OFFSET ? (width - WIDTH_OFFSET) : 990} gap={"xl"}>
            {/*
            <Combobox store={combobox} onOptionSubmit={handleTagValueSelect}>
              <Combobox.DropdownTarget>
                <PillsInput onClick={() => combobox.openDropdown()} label="標籤選擇" radius={"lg"} size={"lg"}>
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
            */}
            <Title size="lg">
              標籤選擇
            </Title>
            <TagsInput
              radius={"lg"} 
              size={"lg"}
              placeholder="請輸入關鍵字，並選取推薦標籤"
              data={extractTagNames(tagList)}
              clearable
              value={tagNameValue}
              onChange={setTagNameValue}
              onSearchChange={(keyword) => searchTagList(keyword)}
            />
            <Group justify="space-between" gap={"xl"} grow>
              <Button variant="filled" size="lg" onClick={autoGenerateTags}>自動生成標籤</Button>
            </Group>
            <Title size="lg">
              或許你想看看...？
            </Title>
            {/*
            <ScrollArea
              style={{ width: "100%", overflowX: "auto" }}
              scrollbarSize={8}
              type="hover"
              viewportRef={scrollAreaRef}
              onWheel={handleWheel}
            >
              <Group gap={"md"} style={{ display: "flex", flexWrap: "nowrap" }} h={300}>
                {similarProposals.map((proposal) =>
                  <ProposalCard key={proposal.id} data={proposal} width={300} height="100%"/>
                )}
              <Group gap={"md"} style={{ height: "260px", display: "flex", flexWrap: "nowrap" }}>
                {similarProposals.map((proposal, index) => (
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
                      <Image src={proposal.thumbnail} alt={proposal.title} height={130} />
                    </Card.Section>
                    <Text size="lg" mt="md" fw={"bold"}>
                      {proposal.title}
                    </Text>
                    <Group gap={"xs"} mt="xs">
                      {proposal.tags.slice(0, MAX_TAGS).map((tag, tagIndex) => (
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
                      {proposal.tags.length > MAX_TAGS && (
                        <Badge variant="outline" color="gray" radius="xl">
                          +{proposal.tags.length - MAX_TAGS} more
                        </Badge>
                      )}
                    </Group>
                  </Card>
                ))}
              </Group>
            </ScrollArea>
            */}
            <ScrollArea
              style={{ width: "100%", overflowX: "auto" }}
              scrollbarSize={8}
              type="hover"
              viewportRef={scrollAreaRef}
              onWheel={handleWheel}
            >
              <Group gap={"md"} style={{ display: "flex", flexWrap: "nowrap" }} h={300}>
                {similarProposals.map((proposal) =>
                  <ProposalCard key={proposal.id} data={proposal} width={300} height="100%"/>
                )}
              </Group>
            </ScrollArea>
            {/*
            <Container>
              <SimpleGrid cols={3} spacing="lg">
                {similarProposals.map((proposal) => (
                  <ProposalCard key={proposal.id} data={proposal}/>
                ))}
              </SimpleGrid>
            </Container>
            */}
            <Group justify="space-between" gap={"xl"} grow>
              {/*<Button variant="filled" size="lg" onClick={openSaveModal}>保留草稿</Button>*/}
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