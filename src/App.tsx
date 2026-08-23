import { Routes, Route } from 'react-router-dom';
import { HomePage } from '@/pages/HomePage';
import { ProjectDetailPage } from '@/pages/ProjectDetailPage';
import { NotFoundPage } from '@/pages/NotFoundPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/project/:projectId" element={<ProjectDetailPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
