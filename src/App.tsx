import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Theme, presetGpnDefault } from '@consta/uikit/Theme'; // ИМПОРТИРОВАЛИ ТЕМУ
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { UserDetailPage } from './pages/UserDetailPage';
import { PostDetailPage } from './pages/PostDetailPage';

const App: React.FC = () => (
  <Theme preset={presetGpnDefault}> {/* ОБОЧНУЛИ В ТЕМУ */}
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/users/:id" element={<UserDetailPage />} />
          <Route path="/posts" element={<HomePage />} />
          <Route path="/posts/:id" element={<PostDetailPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  </Theme>
);

export default App;