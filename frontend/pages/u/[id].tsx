import { useRouter } from 'next/router';
import ProfilePage from '../../components/ProfilePage/ProfilePage';
import { Layout } from '@/components/Layout/Layout';

export default function UserProfile() {
  const router = useRouter();
  const { id } = router.query; // 從 URL 參數中獲取 id

  return (
    <Layout>
      <ProfilePage userId={id as string} /> {/* 傳遞 id 給 ProfilePage */}
    </Layout>
  );
}