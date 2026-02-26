import { useQuery } from '@tanstack/react-query';
import { getCareers } from '@/services/CareerService';

export const useCareerData = () => {
  return useQuery({
    queryKey: ['careers'],
    queryFn: getCareers,
  });
};
