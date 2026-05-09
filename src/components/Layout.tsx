import React, { useState } from 'react';
import { TextField } from '@consta/uikit/TextField';
import { Button } from '@consta/uikit/Button';
import { useStore } from '../store/useStore';
import { useNavigate, useLocation } from 'react-router-dom';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { token, setToken } = useStore();
  const [inputValue, setInputValue] = useState<string | null>(token);
  const [error, setError] = useState<string | undefined>(undefined);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSaveToken = () => {
    if (!inputValue || inputValue.trim() === '') {
      setError('Токен не может быть пустым');
      setToken('');
    } else {
      setError(undefined);
      setToken(inputValue.trim());
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-bg-secondary)' }}>
      {/* Шапка */}
      <header style={{ 
        backgroundColor: 'var(--color-bg-default)', 
        padding: '16px 24px', 
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        flexWrap: 'wrap', 
        gap: '16px',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button 
            label="Пользователи" 
            view={location.pathname === '/' || location.pathname.startsWith('/users') ? 'primary' : 'secondary'}
            onClick={() => navigate('/')}
          />
          <Button 
            label="Посты" 
            view={location.pathname.startsWith('/posts') ? 'primary' : 'secondary'}
            onClick={() => navigate('/posts')}
          />
        </div>
        
        <div style={{ display: 'flex', gap: '8px', flexGrow: 1, maxWidth: '500px' }}>
          <TextField 
            value={inputValue} 
            onChange={(val) => { setInputValue(val); if (error) setError(undefined); }} 
            placeholder="Access Token"
            form="default"
            status={error ? 'alert' : undefined}
            caption={error}
            style={{ flexGrow: 1 }}
          />
          <Button label="Сохранить" onClick={handleSaveToken} />
        </div>
      </header>
      
      {/* Контентная область */}
      <main style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
        {children}
      </main>
    </div>
  );
};