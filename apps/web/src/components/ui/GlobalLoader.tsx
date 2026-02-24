import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store';

export const GlobalLoader: React.FC<{ minimumLoadTime?: number }> = ({ minimumLoadTime = 1500 }) => {
  const isLoading = useSelector((state: RootState) => state.ui.isLoading);
  const loadingMessage = useSelector((state: RootState) => state.ui.loadingMessage);

  useEffect(() => {
    // Optional: Keep loader open for a minimum time even if assets load instantly
    const timer = setTimeout(() => {
        // We do NOT set loading to false here automatically.
        // It's the responsibility of the main layout/pages to dispatch(setLoading(false))
        // when they are fully ready.
        // But this timeout could be used for advanced logic if needed.
    }, minimumLoadTime);

    return () => clearTimeout(timer);
  }, [minimumLoadTime]);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050010] overflow-hidden transition-opacity duration-500 ease-in-out">
      
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vmin] h-[60vmin] bg-purple-600/20 blur-[100px] rounded-full animate-pulse-slow"></div>

      {/* Main container for visual elements */}
      <div className="relative flex flex-col items-center z-10">
        
        {/* Outer glowing rings */}
        <div className="relative w-40 h-40 flex items-center justify-center">
            {/* Ring 1 (fastest) */}
            <div className="absolute inset-0 rounded-full border-t-2 border-r-2 border-purple-500/80 animate-spin-fast mix-blend-screen shadow-[0_0_15px_rgba(168,85,247,0.5)]"></div>
            {/* Ring 2 (medium, reverse) */}
            <div className="absolute inset-2 rounded-full border-b-2 border-l-2 border-pink-500/80 animate-spin-reverse-medium mix-blend-screen shadow-[0_0_15px_rgba(236,72,153,0.5)]"></div>
            {/* Ring 3 (slowest) */}
            <div className="absolute inset-4 rounded-full border-t-2 border-b-2 border-blue-500/80 animate-spin-slow mix-blend-screen shadow-[0_0_15px_rgba(59,130,246,0.5)]"></div>
            
            {/* Center Logo/Initial */}
            <div className="absolute inset-0 flex flex-col items-center justify-center animate-pulse">
               <span className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 tracking-tighter drop-shadow-lg">
                  D.Ö.
               </span>
            </div>
        </div>

        {/* Loading text at the bottom */}
        {loadingMessage && (
          <div className="mt-8 flex flex-col items-center animate-fade-in-up">
            <span className="text-sm md:text-md uppercase tracking-[0.3em] font-medium text-purple-200/80 shadow-black drop-shadow-md">
              {loadingMessage}
            </span>
            {/* Loading generic dots animation */}
            <div className="flex gap-1.5 mt-3">
              <div className="w-1.5 h-1.5 bg-pink-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
              <div className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce"></div>
            </div>
          </div>
        )}
      </div>
{/*
      // The CSS animations need to be added to index.css or tailwind config:
      // animate-spin-fast: spin 1s linear infinite
      // animate-spin-reverse-medium: spin 2s linear infinite reverse
      // animate-spin-slow: spin 3s linear infinite
      // animate-pulse-slow: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite
*/}
    </div>
  );
};
