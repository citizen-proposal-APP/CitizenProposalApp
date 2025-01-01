// proposalData.ts
import { PostQueryResponseDto } from '../openapi/models/PostQueryResponseDto'; 
import { CommentsQueryResponseDto } from '../openapi/models/CommentsQueryResponseDto';

export type ProposalData = PostQueryResponseDto 
    & { current_user: string }
    & { comments: CommentsQueryResponseDto; }
    ;
