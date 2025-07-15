import { createSlice } from "@reduxjs/toolkit"

export type CalendarSliceState = {
  mVacationDays: number
}

const initialState: CalendarSliceState = {
  mVacationDays: 22
}

export const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: create => ({
    
  })
})