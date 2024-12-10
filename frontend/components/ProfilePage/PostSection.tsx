import { ScrollArea, Box, Text, SimpleGrid } from '@mantine/core';
import { Proposal } from '@/types/Proposal'; // 引入 Proposal 類型
import { ProposalCard } from '../ProposalCard/ProposalCard'; // 引入 ProposalCard

const PostSection = ({ title, proposals }: { title: string; proposals: Proposal[] }) => {
  return (
    <Box style={{ maxWidth: '100%', overflow: 'hidden' }}>
      {/* 標題 */}
      <Text size="lg" fw={700} style={{ marginBottom: '10px' }}>
        {title}
      </Text>

      {/* ScrollArea */}
      <ScrollArea
        style={{ maxWidth: '100%', overflow: 'hidden' }}
        scrollbarSize={8} // 捲軸大小
        type="always" // 總是顯示捲軸
        offsetScrollbars
      >
        <Box
          style={{
            display: 'flex',
            gap: '16px', // 每個卡片的間距
          }}
        >
          {proposals.map((proposal) => (
            <ProposalCard
              key={proposal.id}
              data={proposal}
            />
          ))}
        </Box>
      </ScrollArea>
    </Box>
  );
};

export default PostSection;
