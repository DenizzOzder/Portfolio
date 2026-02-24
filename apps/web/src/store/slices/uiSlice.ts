import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface UiState {
  isLoading: boolean;
  activeRequests: number;
  loadingMessage?: string;
}

const initialState: UiState = {
  isLoading: false, 
  activeRequests: 0,
  loadingMessage: 'Yükleniyor...',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    startLoading: (state, action: PayloadAction<string | undefined>) => {
      state.activeRequests += 1;
      state.isLoading = true;
      if (action.payload) {
        state.loadingMessage = action.payload;
      }
    },
    stopLoading: (state) => {
      state.activeRequests = Math.max(0, state.activeRequests - 1);
      if (state.activeRequests === 0) {
        state.isLoading = false;
        state.loadingMessage = undefined;
      }
    },
    // Keep setLoading for hard overrides
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
      if (!action.payload) {
        state.activeRequests = 0;
        state.loadingMessage = undefined;
      }
    },
  },
});

export const { startLoading, stopLoading, setLoading } = uiSlice.actions;

export default uiSlice.reducer;
