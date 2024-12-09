import { IconBook, IconBubbleText, IconBuildingBank, IconInfoCircle } from '@tabler/icons-react';

export const links = [
  { link: '/proposals', label: '議題與討論', icon: IconBubbleText },
  { link: '/departments', label: '認識部門', icon: IconBuildingBank },
  { link: '/Manual/Manual', label: '使用說明', icon: IconBook },
  {
    link: '#2',
    label: '關於',
    icon: IconInfoCircle,
    links: [
      { link: '/FAQ/FAQ', label: '常見問題' },
      { link: '/ContactUs/ContactUs', label: '聯絡我們' },
      { link: '/AboutUs/AboutUs', label: '關於我們' },
    ],
  },
];
