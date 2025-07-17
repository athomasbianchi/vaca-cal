import { createSlice } from "@reduxjs/toolkit"
import { L } from "vitest/dist/chunks/reporters.d.C-cu31ET.js";

export type CalendarSliceState = {
  mVacationDays: number
  mDates: object
}

const LOCKED = 'locked';
const PENCILED = 'penciled';
const HOLIDAY = 'holiday'

// todo add "note value"
const initialState: CalendarSliceState = {
  mVacationDays: 22,
  mDates: {
    '03-27': {
      id: '03-27',
      type: LOCKED
    },
    '03-28': {
      id: '03-28',
      type: LOCKED
    },
    '06-20': {
      id: '06-20',
      type: LOCKED
    },
    '06-30': {
      id: '06-30',
      type: LOCKED
    },
    '07-01': {
      id: '07-01',
      type: LOCKED
    },
    '07-02': {
      id: '07-02',
      type: LOCKED
    },
    '07-03': {
      id: '07-03',
      type: LOCKED
    },
    '07-17': {
      id: '07-17',
      type: LOCKED
    },
    '07-18': {
      id: '07-18',
      type: LOCKED
    },
    '07-31': {
      id: '07-31',
      type: LOCKED
    },
    '08-01': {
      id: '08-01',
      type: LOCKED
    },
    '08-13': {
      id: '08-13',
      type: LOCKED
    },
    '08-14': {
      id: '08-14',
      type: LOCKED
    },
    '08-15': {
      id: '08-15',
      type: LOCKED
    },
    '08-21': {
      id: '08-21',
      type: LOCKED
    },
    '08-22': {
      id: '08-22',
      type: LOCKED
    },
    '12-24': {
      id: '12-24',
      type: LOCKED
    },
    '09-19': {
      id: '09-19',
      type: PENCILED
    },
    '10-10': {
      id: '10-10',
      type: PENCILED
    },
    '11-10': {
      id: '11-10',
      type: PENCILED
    },
    '12-26': {
      id: '12-26',
      type: PENCILED
    },
    '12-29': {
      id: '12-29',
      type: PENCILED
    },
    '12-30': {
      id: '12-30',
      type: PENCILED
    },
    '12-31': {
      id: '12-31',
      type: PENCILED
    },
    '01-01': {
      id: '01-01',
      type: HOLIDAY
    },
    '01-20': {
      id: '01-20',
      type: HOLIDAY
    },
    '02-17': {
      id: '02-17',
      type: HOLIDAY
    },
    '05-26': {
      id: '05-26',
      type: HOLIDAY
    },
    '06-19': {
      id: '06-19',
      type: HOLIDAY
    },
    '07-04': {
      id: '07-04',
      type: HOLIDAY
    },
    '09-01': {
      id: '09-01',
      type: HOLIDAY
    },
    '10-13': {
      id: '10-13',
      type: HOLIDAY
    },
    '11-11': {
      id: '11-11',
      type: HOLIDAY
    },
    '11-27': {
      id: '11-27',
      type: HOLIDAY
    },
    '11-28': {
      id: '11-28',
      type: HOLIDAY
    },
    '12-25': {
      id: '12-25',
      type: HOLIDAY
    }
  }
}




export const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: create => ({

  }),
  selectors: {
    selectMdates: calendar => calendar.mDates
  }
})

export const { selectMdates } = calendarSlice.selectors