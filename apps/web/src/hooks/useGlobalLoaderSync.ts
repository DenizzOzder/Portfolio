import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { startLoading, stopLoading } from '@/store/slices/uiSlice';

/**
 * A handy hook to synchronize React Query's `isLoading` state
 * with the global Redux loader. 
 * Completely StrictMode and unmount safe.
 */
export const useGlobalLoaderSync = (isLoading: boolean, message: string) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoading) {
      dispatch(startLoading(message));
      // Cleanup runs when isLoading becomes false, or when the component unmounts
      return () => {
        dispatch(stopLoading());
      };
    }
  }, [isLoading, dispatch, message]);
};
