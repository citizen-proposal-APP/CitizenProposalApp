import { useState, useEffect } from 'react';
import { IconSearch } from '@tabler/icons-react';
import { Badge, TextInput, SimpleGrid } from '@mantine/core';
import { Configuration, PostsApi, AiApi } from '@/openapi';
import { ProposalCard } from '../ProposalCard/ProposalCard';

const configuration = new Configuration({
  basePath: process.env.NEXT_PUBLIC_BASE_PATH!,
  credentials: 'include',
});

const postsApi = new PostsApi(configuration);
const aiApi = new AiApi(configuration);

interface KeywordSearchProps {
  sortOption: string;
  tags: string[];
  author: string;
}

export function KeywordSearch({ sortOption, tags, author }: KeywordSearchProps) {
  const [AI, setAI] = useState(false);
  const [keyword, setKeyword] = useState(''); // 用來儲存使用者輸入的關鍵字
  const [searchResults, setSearchResults] = useState<any[]>([]); // 用來儲存搜尋結果
  const [aiTags, setAiTags] = useState<string[]>([]);
  
  const aiOnClick = () => setAI(!AI);

  const searchPostsByCondition = async (keyword: string) => {
    try {
      const response = await postsApi.apiPostsGet({});
      const allPosts = response.posts || [];
  
      // 確保所有 post 的 attachments 是陣列
      const normalizedPosts = allPosts.map(post => ({
        ...post,
        attachments: Array.isArray(post.attachments) ? post.attachments : [], // 保證 attachments 是陣列
      }));
  
      let filteredPosts :any = [];
      if (keyword) {
        if (AI) {
          // AI 啟用狀態：呼叫 AI API 生成標籤後進行篩選
          try {
            const generatedTags = await aiApi.apiAiGuesstagsGet({ title: keyword });
            setAiTags(generatedTags || []);
    
            filteredPosts = normalizedPosts.filter(post => {
              // 僅篩選符合 AI 生成標籤的貼文
              return generatedTags.some(tagName =>
                post.tags.some(tag => tag.name === tagName)
              );
            });
          } catch (error) {
            console.error('AI 生成 TAG 時發生錯誤:', error);
          }
        } else {
          // 非 AI 狀態：執行原本的篩選邏輯
          filteredPosts = normalizedPosts.filter(post => {
            const titleMatch = post.title?.toLowerCase().includes(keyword.toLowerCase());
            const contentMatch = post.content?.toLowerCase().includes(keyword.toLowerCase());
    
            const tagsMatch = tags.every(tagName =>
              post.tags.some(tag => tag.name === tagName)
            );
    
            const authorMatch = author ? post.author.username === author : true;
    
            return (titleMatch || contentMatch) && tagsMatch && authorMatch;
          });
        }
      } else {
        // 顯示所有提案並篩選條件
        filteredPosts = normalizedPosts.filter(post => {
          const tagsMatch = tags.every(tagName =>
            post.tags.some(tag => tag.name === tagName)
          );
          const authorMatch = author ? post.author.username === author : true;

          return tagsMatch && authorMatch;
        });
      }
      
      // 排序處理
      let sortedPosts = [...filteredPosts];
      if (sortOption === '根據議題 ID 升序') {
        sortedPosts = sortedPosts.sort((a, b) => a.id - b.id);
      } else if (sortOption === '根據議題 ID 降序') {
        sortedPosts = sortedPosts.sort((a, b) => b.id - a.id);
      } else if (sortOption === '根據發佈時間升序') {
        sortedPosts = sortedPosts.sort((a, b) => new Date(a.postedTime).getTime() - new Date(b.postedTime).getTime());
      } else if (sortOption === '根據發佈時間降序') {
        sortedPosts = sortedPosts.sort((a, b) => new Date(b.postedTime).getTime() - new Date(a.postedTime).getTime());
      }
  
      const formattedPosts = sortedPosts.map((post) => ({
        ...post,
        postedTime: post.postedTime
          ? typeof post.postedTime === 'string'
            ? post.postedTime
            : post.postedTime instanceof Date
            ? post.postedTime.toISOString()
            : null
          : null,
      }));
  
      setSearchResults(formattedPosts);
    } catch (error) {
      console.error('搜尋時發生錯誤:', error);
      setSearchResults([]);
    }
  };
  

  
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.trim();
    setKeyword(value);

    searchPostsByCondition(value);
  };
  useEffect(() => {
    searchPostsByCondition(keyword);
  }, [sortOption, tags, author]);

  return (
    <div>
      <TextInput
        placeholder="輸入關鍵字"
        value={keyword}
        onChange={handleInputChange}
        leftSection={<IconSearch size={16} />}
        rightSectionWidth={50}
        rightSection={
          <Badge
            variant={AI ? 'default' : 'gradient'}
            gradient={{ from: 'blue', to: 'grape', deg: 90 }}
            onClick={aiOnClick}
          >
            AI
          </Badge>
        }
        styles={
          AI
            ? {
                input: { color: 'black', background: 'linear-gradient(90deg, Gold, HotPink)' },
              }
            : {}
        }
      />
      <SimpleGrid cols={3} spacing="md" mt="md">
        {keyword && searchResults.length === 0 ? (
          <p>沒有符合條件的結果</p>
        ) : (
          searchResults.map((post) => <ProposalCard key={post.id} data={post} />)
        )}
      </SimpleGrid>
    </div>
  );
}
