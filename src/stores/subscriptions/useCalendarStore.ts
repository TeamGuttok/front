// import { create } from 'zustand'
// import { CalendarViewEnum } from '#types/calendar'

// interface UseCalendarStore {
//   currentDate: Date
//   viewType: CalendarViewEnum
//   setCurrentDate: (date: Date) => void
//   setViewType: (view: CalendarViewEnum) => void
//   resetStore: () => void
// }

// const initialState = {
//   currentDate: new Date(),
//   viewType: CalendarViewEnum.MONTHLY,
// }

// export const useCalendarStore = create<UseCalendarStore>((set) => ({
//   ...initialState,
//   setCurrentDate: (date) => set({ currentDate: date }),
//   setViewType: (view) => set({ viewType: view }),
//   resetStore: () => set(initialState),
// }))
