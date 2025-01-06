import { useState, useEffect } from 'react';
import { IconSearch } from '@tabler/icons-react';
import { Badge, TextInput, SimpleGrid } from '@mantine/core';
import { Configuration, PostsApi } from '@/openapi';
import { ProposalCard } from '../ProposalCard/ProposalCard';

const configuration = new Configuration({
  basePath: process.env.NEXT_PUBLIC_BASE_PATH!,
  credentials: 'include',
});

const postsApi = new PostsApi(configuration);

interface KeywordSearchProps {
  sortOption: string;
  tags: string[];
  author: string;
}

export function KeywordSearch({ sortOption, tags, author }: KeywordSearchProps) {
  const [AI, setAI] = useState(false);
  const [keyword, setKeyword] = useState(''); // 用來儲存使用者輸入的關鍵字
  const [searchResults, setSearchResults] = useState<any[]>([]); // 用來儲存搜尋結果

  const aiOnClick = () => setAI(!AI);

  const searchPostsByCondition = async (keyword: string) => {
    try {
      const response = await postsApi.apiPostsGet({});
      const allPosts = response.posts || [];

      const keywords = keyword
      .split(/[ ,]+/) // 根據空格或逗號分隔
      .map((k) => k.trim().toLowerCase()) // 去除空白並轉小寫
      .filter((k) => k); // 過濾掉空字串


      const filteredPosts = allPosts.filter(post => {
      const titleMatch = post.title?.toLowerCase().includes(keyword.toLowerCase());
      const contentMatch = post.content?.toLowerCase().includes(keyword.toLowerCase());
  
      // 標籤篩選
      const tagsMatch = tags.every(tagName =>
        post.tags.some(tag => tag.name === tagName)
      );
  
      // 作者篩選
      const authorMatch = author ? post.author.username === author : true;
  
      return (titleMatch || contentMatch) && tagsMatch && authorMatch;
      });

      // 根據排序條件進行排序
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

    if (value) {
      searchPostsByCondition(value);
    } else {
      setSearchResults([]);
    }
  };

  useEffect(() => {
    if (keyword) {
      searchPostsByCondition(keyword);
    }
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
