import React, { useEffect, useState } from 'react';
import { Table } from '@consta/uikit/Table';
import type { TableColumn } from '@consta/uikit/Table';
import { Select } from '@consta/uikit/Select';
import { Card } from '@consta/uikit/Card';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { CustomPagination } from './CustomPagination';

type User = { id: string; firstName: string; lastName: string; email: string };

const perPageOptions = [
  { label: '10', value: 10 },
  { label: '25', value: 25 },
  { label: '50', value: 50 },
];

export const UserTable: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(perPageOptions[0]);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get('/users', { params: { page, per_page: perPage.value } });
        const mappedData = res.data.map((u: any) => {
          const nameParts = u.name.split(' ');
          return { 
            id: String(u.id), 
            firstName: nameParts[0] || '—',
            lastName: nameParts.slice(1).join(' ') || '—',
            email: u.email 
          };
        });
        setUsers(mappedData);
        const totalPagesHeader = res.headers['x-pagination-pages'];
        if (totalPagesHeader) setTotalPages(Number(totalPagesHeader));
      } catch (e) {
        console.error(e);
      }
    };
    fetchUsers();
  }, [page, perPage]);

  const columns: TableColumn<User>[] = [
    { title: 'Имя', accessor: 'firstName' },
    { title: 'Фамилия', accessor: 'lastName' },
    { title: 'Email', accessor: 'email' },
  ];

  return (
    <Card verticalSpace="xl" horizontalSpace="xl" style={{ backgroundColor: 'var(--color-bg-default)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h2 style={{ margin: 0 }}>Список пользователей</h2>
        <Select 
          items={perPageOptions} 
          value={perPage} 
          onChange={(item) => { if (item) { setPerPage(item); setPage(1); } }}
          getItemKey={(item) => String(item.value)}
          label="Элементов на странице" 
        />
      </div>
      <Table columns={columns} rows={users} onRowClick={(row) => navigate(`/users/${row.id}`)} borderBetweenRows borderBetweenColumns />
      <CustomPagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
    </Card>
  );
};