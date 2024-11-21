export const TagType = {
  department: 'department',
  topic: 'topic',
};

export interface Tag {
  id: number;
  tagType: string;
  name: string;
}
