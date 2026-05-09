import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '@consta/uikit/Card';
import { Text } from '@consta/uikit/Text';
import { Button } from '@consta/uikit/Button';
import api from '../api';

type Post = { id: number; title: string; body: string };
type Comment = { id: number; name: string; body: string; email: string };

export const PostDetailPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    if (id) {
      api.get(`/posts/${id}`).then(res => setPost(res.data));
      api.get(`/posts/${id}/comments`).then(res => setComments(res.data));
    }
  }, [id]);

  if (!post) return <Text>Загрузка...</Text>;

  return (
    <div>
      <Button label="Назад к списку" onClick={() => navigate(-1)} style={{ marginBottom: '16px' }} />
      <Card verticalSpace="xl" horizontalSpace="xl" style={{ marginBottom: '24px' }}>
        <Text size="3xl" weight="bold">{post.title}</Text>
        <Text style={{ marginTop: '16px' }}>{post.body}</Text>
      </Card>

      <Text size="2xl" weight="bold" style={{ marginBottom: '16px' }}>Комментарии</Text>
      {comments.length === 0 ? <Text>Комментариев пока нет</Text> : (
        comments.map(c => (
          <Card key={c.id} verticalSpace="l" horizontalSpace="l" style={{ marginBottom: '12px' }}>
            <Text weight="bold">{c.name}</Text>
            <Text size="s" view="ghost">{c.email}</Text>
            <Text style={{ marginTop: '8px' }}>{c.body}</Text>
          </Card>
        ))
      )}
    </div>
  );
};