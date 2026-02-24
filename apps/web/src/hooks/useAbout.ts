import { useQuery } from '@tanstack/react-query';
import { getAboutData } from '@/services/aboutService';

export const useAboutData = () => {
  return useQuery({
    queryKey: ['about'],
    queryFn: getAboutData,
  });
};
