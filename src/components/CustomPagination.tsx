import React from 'react';
import { Button } from '@consta/uikit/Button';

interface CustomPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const CustomPagination: React.FC<CustomPaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5; // Сколько номеров показывать одновременно
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);
    
    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }
    
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center', marginTop: '16px' }}>
      <Button 
        label="Предыдущая" 
        size="s" 
        view="secondary" 
        onClick={() => onPageChange(currentPage - 1)} 
        disabled={currentPage <= 1} 
      />
      
      <div style={{ display: 'flex', gap: '4px' }}>
        {getPageNumbers().map(p => (
          <Button 
            key={p} 
            label={String(p)} 
            size="s" 
            view={p === currentPage ? "primary" : "secondary"} 
            onClick={() => onPageChange(p)} 
          />
        ))}
      </div>

      <Button 
        label="Следующая" 
        size="s" 
        view="secondary" 
        onClick={() => onPageChange(currentPage + 1)} 
        disabled={currentPage >= totalPages} 
      />
    </div>
  );
};