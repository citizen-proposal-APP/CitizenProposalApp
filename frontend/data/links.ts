import { IconBook, IconBubbleText, IconBuildingBank, IconInfoCircle } from '@tabler/icons-react';

export const links = [
  { link: '/proposals', label: '議題與討論', icon: IconBubbleText },
  { link: '/departments', label: '認識部門', icon: IconBuildingBank },
  { link: '/manual/manual', label: '使用說明', icon: IconBook },
  {
    link: '#2',
    label: '關於',
    icon: IconInfoCircle,
    links: [
      { link: '/faq/faq', label: '常見問題' },
      { link: '/contact-us/contact-us', label: '聯絡我們' },
      { link: '/about-us/about-us', label: '關於我們' },
    ],
  },
];
