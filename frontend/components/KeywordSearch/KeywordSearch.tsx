import { useState } from 'react';
import { IconSearch } from '@tabler/icons-react';
import { Badge, TextInput } from '@mantine/core';

export function KeywordSearch() {
  const [AI, setAI] = useState(false);
  const aiOnClick = () => setAI(!AI);

  return (
    <TextInput
      placeholder="輸入關鍵字"
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
  );
}
