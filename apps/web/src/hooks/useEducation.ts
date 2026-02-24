import { useQuery } from '@tanstack/react-query';
import { getEducationHistory } from '@/services/educationService';

export const useEducationData = () => {
  return useQuery({
    queryKey: ['education'],
    queryFn: getEducationHistory,
  });
};
