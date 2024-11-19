import { IconBook, IconBubbleText, IconBuildingBank, IconInfoCircle } from '@tabler/icons-react';

export const links = [
  { link: '/ideas', label: '議題與討論', icon: IconBubbleText },
  {
    link: '#1',
    label: '認識部門',
    icon: IconBuildingBank,
    links: [
      { link: 'https://youtu.be/dQw4w9WgXcQ?si=5u9AE9FgJMvLcuZ3', label: '春日部' },
      { link: 'https://youtu.be/dQw4w9WgXcQ?si=5u9AE9FgJMvLcuZ3', label: '俱樂部' },
      { link: 'https://youtu.be/dQw4w9WgXcQ?si=5u9AE9FgJMvLcuZ3', label: '立山黑部' },
    ],
  },
  { link: '/Manual/Manual', label: '使用說明', icon: IconBook },
  {
    link: '#2',
    label: '關於',
    icon: IconInfoCircle,
    links: [
      { link: '/faq', label: '常見問題' },
      { link: '/contact', label: '聯絡我們' },
      { link: '/about_us', label: '關於我們' },
    ],
  },
];
