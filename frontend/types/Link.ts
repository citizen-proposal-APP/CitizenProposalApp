export const LinkStyleType = {
  whiteBg: 'whiteBg',
};

export interface Link {
  link: string;
  title: string;
  thumbnail: string; // path
  style?: string;
}
