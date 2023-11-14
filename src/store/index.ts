import { create } from 'zustand';
const useStore = create((set) => ({
  initialState: 'light',
  setInitialState: (pros: any) => {
    set(pros)
  }
}));

export default useStore;