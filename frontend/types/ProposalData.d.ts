export interface ProposalData {
    title: string;
    tags: string[];
    content: string;
    user_name: string;
    user_icon: string;
    num_like: number;
    is_like: boolean;
    attachments: { id: number; content: string }[];
    similar_attachments: { id: number; content: string; title: string; link: string }[];
    comments: { id: number; name: string; icon: string; content: string }[];
  }