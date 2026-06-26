import { ProjectDetail } from '../components/ProjectDetail';
import { PROFILE } from '../data/profile';
import { useParams, useNavigate } from 'react-router-dom';
import { usePlainMode } from '../hooks/usePlainMode';

export function ProjectDetailPage() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { plain, toggle } = usePlainMode();

  const project = PROFILE.work.find((w) => w.id === projectId);

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <ProjectDetail
      project={project}
      onTogglePlain={toggle}
      plain={plain}
      onBack={() => navigate('/')}
    />
  );
}
