import React, { useEffect, useState } from 'react';
import { Table } from '@consta/uikit/Table';
import type { TableColumn } from '@consta/uikit/Table';
import { Select } from '@consta/uikit/Select';
import { Card } from '@consta/uikit/Card';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { CustomPagination } from './CustomPagination';

type Post = { id: string; title: string };

const perPageOptions = [
  { label: '10', value: 10 },
  { label: '25', value: 25 },
  { label: '50', value: 50 },
];

export const PostTable: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(perPageOptions[0]);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await api.get('/posts', { params: { page, per_page: perPage.value } });
        const mappedData = res.data.map((p: any) => ({ ...p, id: String(p.id) }));
        setPosts(mappedData);
        const totalPagesHeader = res.headers['x-pagination-pages'];
        if (totalPagesHeader) setTotalPages(Number(totalPagesHeader));
      } catch (e) {
        console.error(e);
      }
    };
    fetchPosts();
  }, [page, perPage]);

  const columns: TableColumn<Post>[] = [
    { title: 'ID', accessor: 'id', width: 100 },
    { title: 'Заголовок', accessor: 'title' },
  ];

  return (
    <Card verticalSpace="xl" horizontalSpace="xl" style={{ backgroundColor: 'var(--color-bg-default)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h2 style={{ margin: 0 }}>Список постов</h2>
        <Select 
          items={perPageOptions} 
          value={perPage} 
          onChange={(item) => { if (item) { setPerPage(item); setPage(1); } }}
          getItemKey={(item) => String(item.value)}
          label="Элементов на странице" 
        />
      </div>
      <Table columns={columns} rows={posts} onRowClick={(row) => navigate(`/posts/${row.id}`)} borderBetweenRows borderBetweenColumns />
      <CustomPagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
    </Card>
  );
};