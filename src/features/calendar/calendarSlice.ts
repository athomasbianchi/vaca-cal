import { createSlice } from "@reduxjs/toolkit"

export type CalendarSliceState = {
  mVacationDays: number
  mDates: object,
  tStartingDays: number,
  tMonthlyAccrual: number,
  tDates: object
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
  },
  tStartingDays: 3,
  tMonthlyAccrual: 2,
  tDates: {
    '01-01': {
      id: '01-01',
      type: HOLIDAY,
    },
    '05-26': {
      id: '05-26',
      type: HOLIDAY,
    },
    '07-04': {
      id: '07-04',
      type: HOLIDAY,
    },
    '09-01': {
      id: '09-01',
      type: HOLIDAY,
    },
    '11-27': {
      id: '11-27',
      type: HOLIDAY,
    },
    '11-28': {
      id: '11-28',
      type: HOLIDAY,
    },
    '12-25': {
      id: '12-25',
      type: HOLIDAY,
    },
    '12-26': {
      id: '12-26',
      type: HOLIDAY,
    },
    '12-29': {
      id: '12-29',
      type: HOLIDAY,
    },
    '12-30': {
      id: '12-30',
      type: HOLIDAY,
    },
    '12-31': {
      id: '12-31',
      type: HOLIDAY,
    },
    '01-20': {
      type: LOCKED,
      id: '01-20',
    },
    '02-17': {
      type: LOCKED,
      id: '02-17',
    },
    '03-26': {
      type: LOCKED,
      id: '03-26',
    },
    '06-19': {
      type: LOCKED,
      id: '06-19', 
    },
    '06-20': {
      type: LOCKED,
      id: '06-20',
    },
    '06-30': {
      type: LOCKED,
      id: '06-30',
    },
    '07-01': {
      type: LOCKED,
      id: '07-01',
    },
    '07-02': {
      type: LOCKED,
      id: '07-02',
    },
    '07-03': {
      type: LOCKED,
      id: '07-03',
    },
    '07-17': {
      type: LOCKED,
      id: '07-17',
    },
    '07-18': {
      type: LOCKED,
      id: '07-18',
    },
    '08-13': {
      type: LOCKED,
      id: '08-13',
    },
    '08-14': {
      type: LOCKED,
      id: '08-14',
    },
    '08-15': {
      type: LOCKED,
      id: '08-15',
    },
    '08-21': {
      type: LOCKED,
      id: '08-21',
    },
    '08-22': {
      type: LOCKED,
      id: '08-22',
    },
    '09-19': {
      type: LOCKED,
      id: '09-19',
    },
    '10-13': {
      type: LOCKED,
      id: '10-13',
    },
    '12-24': {
      type: LOCKED,
      id: '12-24',
    },
    '10-10': {
      type: PENCILED,
      id: '10-10',
    },
    '11-10': {
      type: PENCILED,
      id: '11-10',
    },
    '11-11': {
      type: PENCILED,
      id: '11-11',
    },
  }
}

export const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: create => ({
    updateDate: create.reducer(
      (state, action) => {
        const { date, mValue, tValue } = action.payload
        state.mDates[date] = { id: date, type: mValue}
        state.tDates[date] = { id: date, type: tValue}

      },
    ),
  }),
  selectors: {
    selectMdates: calendar => calendar.mDates,
    selectTDates: calendar => calendar.tDates,
    selectTMonthlyAccrual: calendar => calendar.tMonthlyAccrual,
    selectTStartingDays: calendar => calendar.tStartingDays
  }
})

export const {
  selectMdates,
  selectTDates,
  selectTMonthlyAccrual,
  selectTStartingDays
} = calendarSlice.selectors
export const { updateDate } = calendarSlice.actions