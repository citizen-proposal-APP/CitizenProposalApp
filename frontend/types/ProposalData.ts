import { Tag } from './Tag'
import { Comment } from './Comment'
export interface ProposalData {
    id: number;
    title: string;
    tags: Tag[];
    content: string;
    user_name: string;
    user_icon: string;  //url?
    num_like: number;
    is_like: boolean;
    attachments: { id: number; content: string }[];
    similar_attachments: { id: number; content: string; title: string; link: string }[];
    comments: Comment[];
  }