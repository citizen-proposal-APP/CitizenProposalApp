import React, { useRef, useState } from 'react';
import { Container, Stack, Modal, Button, TextInput, Avatar, Text } from '@mantine/core';
import { Dropzone } from '@mantine/dropzone';
import Cropper from 'react-easy-crop';
import UserInfoSection from './UserInfoSection';
import PostSection from './PostSection';
import { Proposal } from '@/types/Proposal'; // 引入 Proposal 類型

interface User {
  avatar: string;
  name: string;
  email: string;
  nickname: string;
  points: number;
}

const ProfilePage = () => {
  const [user, setUser] = useState<User>({
    avatar: '/path/to/avatar.png',
    name: '謝*佳',
    email: 'example@gmail.com',
    nickname: 'lululala',
    points: 32767,
  });

  const [followedProposals, setFollowedProposals] = useState<Proposal[]>([
    {
      id: 1,
      status: 'abcd',
      title: '提案標題 1',
      thumbnail: '/images/thumb1.png',
      postedTime: '2024-12-01T10:00:00',
      tags: [{ id: 1, name: '標籤 1', tagType: 'department' }],
    },
    {
      id: 2,
      status: 'abcd',
      title: '提案標題 2',
      thumbnail: '/images/thumb2.png',
      postedTime: '2024-12-01T10:00:00',
      tags: [{ id: 2, name: '標籤 2', tagType: 'department' }],
    },
    {
      id: 3,
      status: 'abcd',
      title: '提案標題 3',
      thumbnail: '/images/thumb3.png',
      postedTime: '2024-12-01T10:00:00',
      tags: [{ id: 3, name: '標籤 3', tagType: 'department' }],
    },
    {
      id: 4,
      status: 'abcd',
      title: '提案標題 4',
      thumbnail: '/images/thumb4.png',
      postedTime: '2024-12-01T10:00:00',
      tags: [{ id: 4, name: '標籤 4', tagType: 'department' }],
    },
    // 其他 Proposal...
  ]);
  const [publishedProposals, setPublishedProposals] = useState<Proposal[]>([
    {
      id: 1,
      status: 'abcd',
      title: '提案標題 1',
      thumbnail: '/images/thumb1.png',
      postedTime: '2024-12-01T10:00:00',
      tags: [{ id: 1, name: '標籤 1', tagType: 'department' }],
    },
    {
      id: 2,
      status: 'abcd',
      title: '提案標題 2',
      thumbnail: '/images/thumb2.png',
      postedTime: '2024-12-01T10:00:00',
      tags: [{ id: 2, name: '標籤 2', tagType: 'department' }],
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tempUser, setTempUser] = useState<Partial<User>>({});
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleEditClick = () => {
    setTempUser({ nickname: user.nickname, email: user.email });
    setIsModalOpen(true);
  };

  const handleSave = () => {
    setUser((prev) => ({
      ...prev,
      ...tempUser,
      avatar: croppedImage || prev.avatar,
    }));
    setIsModalOpen(false);
  };

  const handleImageUpload = (files: File[]) => {
    const file = files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setSelectedImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleCropComplete = async (_: any, croppedAreaPixels: any) => {
    const croppedImg = await getCroppedImage(selectedImage!, croppedAreaPixels);
    setCroppedImage(croppedImg);
  };

  const createImage = (url: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
      const image = new Image();
      image.src = url;
      image.crossOrigin = 'anonymous'; // 避免 CORS 問題
      image.onload = () => resolve(image);
      image.onerror = (error) => reject(error);
    });

  const getCroppedImage = async (
    imageSrc: string,
    croppedAreaPixels: { width: number; height: number; x: number; y: number }
  ): Promise<string> => {
    const image = await createImage(imageSrc); // 生成 HTML 圖片元素
    const canvas = document.createElement('canvas'); // 建立 Canvas
    const ctx = canvas.getContext('2d');

    if (!ctx) throw new Error('Canvas context not available');

    canvas.width = croppedAreaPixels.width;
    canvas.height = croppedAreaPixels.height;

    ctx.drawImage(
      image,
      croppedAreaPixels.x,
      croppedAreaPixels.y,
      croppedAreaPixels.width,
      croppedAreaPixels.height,
      0,
      0,
      croppedAreaPixels.width,
      croppedAreaPixels.height
    );

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(URL.createObjectURL(blob)); // 回傳裁剪後的圖片 URL
        }
      }, 'image/jpeg'); // 設定圖片格式為 JPEG
    });
  };

  return (
    <Container>
      <Stack gap="md">
        <UserInfoSection user={user} onEdit={handleEditClick} />
        <PostSection title="已追蹤" proposals={followedProposals} />
        <PostSection title="已發表" proposals={publishedProposals} />

        <Modal
          opened={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="編輯個人資料"
          centered
        >

          <Stack gap="md">
            <Text size="sm" color="dimmed" style={{ textAlign: 'center' }}>
              拖曳圖片到頭像或點擊頭像來更換圖片
            </Text>
            {/* 可點擊的頭像 */}
            <Dropzone onDrop={handleImageUpload} accept={{ 'image/*': [] }}>
              <Avatar
                src={croppedImage || user.avatar}
                radius="xl"
                size={120}
                style={{ cursor: 'pointer' }}
                onClick={() => fileInputRef.current?.click()} // 點擊觸發檔案選擇
              />
            </Dropzone>
            
            {/* 隱藏的檔案選擇框 */}
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={(e) =>
                e.target.files && handleImageUpload(Array.from(e.target.files))
              }
            />

            {/* 裁剪工具 */}
            {selectedImage && (
              <div style={{ position: 'relative', height: 200, width: '100%' }}>
                <Cropper
                  image={selectedImage}
                  crop={crop}
                  zoom={zoom}
                  aspect={1} // 1:1 的裁剪比例
                  minZoom={1} // 設定最小縮放比例
                  maxZoom={4} // 設定最大縮放比例
                  onCropChange={setCrop}
                  //onZoomChange={setZoom}
                  
                  onZoomChange={(newZoom) => {
                    const zoomStep = 0.05; // 設定每次變動的步長
                    setZoom((prevZoom) => {
                      // 確保縮放不會超過最大或最小範圍
                      if (newZoom > zoom && prevZoom < 4) {
                        return prevZoom + zoomStep;
                      }
                      if (newZoom < zoom && prevZoom > 1) {
                        return prevZoom - zoomStep;
                      }
                      return prevZoom;
                    });
                  }} // 每次變動 0.05

                  onCropComplete={handleCropComplete}
                />
              </div>
            )}
            <TextInput
              label="暱稱"
              placeholder="請輸入暱稱"
              value={tempUser.nickname || ''}
              onChange={(e) =>
                setTempUser((prev) => ({ ...prev, nickname: e.target.value }))
              }
            />
            <TextInput
              label="電子郵件"
              placeholder="請輸入電子郵件"
              value={tempUser.email || ''}
              onChange={(e) =>
                setTempUser((prev) => ({ ...prev, email: e.target.value }))
              }
            />
            <Button onClick={handleSave}>確認修改</Button>
          </Stack>
        </Modal>
      </Stack>
    </Container>
  );
};

export default ProfilePage;
