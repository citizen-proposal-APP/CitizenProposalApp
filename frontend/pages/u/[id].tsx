import { useRouter } from 'next/router';
import ProfilePage from '../../components/ProfilePage/ProfilePage';
import { Layout } from '@/components/Layout/Layout';

export default function UserProfile() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <Layout>
      {id ? <ProfilePage userId={id as string} /> : <div>Loading...</div>} {/* 傳遞 id */}
    </Layout>
  );
}
