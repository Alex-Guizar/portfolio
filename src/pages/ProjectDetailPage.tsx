import React from 'react';
import { ProjectDetail } from '../components/ProjectDetail';
import { PROFILE } from '../data/profile';
import { useParams, useNavigate } from 'react-router-dom';

const STORAGE_KEY = "alex-profile-mode";

export function ProjectDetailPage() {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const [plain, setPlain] = React.useState(() => {
    try { return localStorage.getItem(STORAGE_KEY) === "plain"; } catch { return false; }
  });

  const onToggle = React.useCallback(() => {
    setPlain((cur) => {
      const next = !cur;
      try { localStorage.setItem(STORAGE_KEY, next ? "plain" : "full"); } catch {}
      return next;
    });
  }, []);

  const project = PROFILE.work.find((w) => w.id === projectId);

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <ProjectDetail 
      project={project} 
      onTogglePlain={onToggle} 
      plain={plain} 
      onBack={() => navigate('/')} 
    />
  );
}
