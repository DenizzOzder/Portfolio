import { useQuery } from '@tanstack/react-query';
import { getFeaturedProjects } from '@/services/ProjectService';

export const useProjects = () => {
  return useQuery({
    queryKey: ['projects'],
    queryFn: getFeaturedProjects,
  });
};
