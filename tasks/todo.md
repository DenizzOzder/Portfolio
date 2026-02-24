# Active Tasks & To-Dos

## Current Objective: Routing & Global Loader Refactor

- [x] Write implementation plan and loader suggestions
- [x] Refactor Routing & Home Page
  - [x] Move `App.tsx` content to `pages/Home.tsx`
  - [x] Create central router file (`routes/index.tsx`)
- [x] Refactor Layout
  - [x] Move Footer component inside `Layout.tsx`
- [x] Optimization & Lazy Loading
  - [x] Implement `React.lazy` for routing pages (Admin Panel, etc.)
- [x] Global Loader (Redux)
  - [x] Create `uiSlice` in Redux to handle `isLoading` state
  - [x] Update components to use `dispatch(setLoading())` instead of local states
- [x] Implement Initial Loader (Splash Screen or Skeleton) based on user choice
- [x] Verify functionality

## Next Objective: Pending User Decision
- [ ] Bekleniyor...
