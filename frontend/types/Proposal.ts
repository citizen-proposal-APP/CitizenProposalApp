import { Tag } from './Tag';

// import { User } from './User';

export interface Proposal {
  id: number;
  status: string;
  title: string;
  thumbnail: string; // url
  // content: string;
  postedTime: string;
  tags: Tag[];
  // author: User;
}
