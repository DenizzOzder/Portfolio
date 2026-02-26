import { useQuery } from '@tanstack/react-query';
import { getCareers } from '@/services/careerService';

export const useCareerData = () => {
  return useQuery({
    queryKey: ['careers'],
    queryFn: getCareers,
  });
};
