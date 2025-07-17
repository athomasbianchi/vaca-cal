import type { JSX } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import {
  selectMdates,
} from "./calendarSlice"
import dayjs from "dayjs"
import dayOfYear from 'dayjs/plugin/dayOfYear' // ES 2015
dayjs.extend(dayOfYear)

// import { useState } from "react"

// const mHolidaysSet = new Set([
//   '01-01',
//   '01-20',
//   '02-17',
//   '05-26',
//   '06-19',
//   '07-04',
//   '09-01',
//   '10-13',
//   '11-11',
//   '11-27',
//   '11-28',
//   '12-25'
// ]);

const tHolidaysSet = new Set([
  '01-01',
  '05-26',
  '07-04',
  '09-01',
  '11-27',
  '11-28',
  '12-25',
  '12-26',
  '12-29',
  '12-30',
  '12-31'
])

// const mLocked = new Set([
//   '03-27',
//   '03-28',
//   '06-20',
//   '06-30',
//   '07-01',
//   '07-02',
//   '07-03',
//   '07-17',
//   '07-18',
//   '07-31',
//   '08-01',
//   '08-13',
//   '08-14',
//   '08-15',
//   '08-21',
//   '08-22',  
//   '12-24',
// ])

// const mPenciled = new Set([
//   '09-19',
//   '10-10',
//   '11-10',
//   '12-26',
//   '12-29',
//   '12-30',
//   '12-31'
// ])


const tLocked = new Set([
  '01-20',
  '02-17',
  '03-26',
  '06-19',
  '06-20',
  '06-30',
  '07-01',
  '07-02',
  '07-03',
  '07-17',
  '07-18',
  '08-13',
  '08-14',
  '08-15',
  '08-21',
  '08-22',
  '09-19',
  '10-13',
  '12-24'
])

const tPenciled = new Set([
  '10-10',
  '11-10',
  '11-11',
])

const year = Array.from({ length: 365 }, (_, i) => i + 1).map(x => dayjs().dayOfYear(x))
const today = dayjs()

export const Calendar = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const mCalendar = useAppSelector(selectMdates)
  console.log(mCalendar)

  return (
    <>
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '100vh',
          overflow: 'auto',
        }}
      >

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(7)",
            width: '50%',
            overflowY: 'scroll'
          }}
        >
          {year.map(date => {
            const day = date.day()
            const month = date.month()
            const mmdd_date = date.format('MM-DD')
            const mDate = mCalendar[mmdd_date]

            return (
              <div
                key={mmdd_date}
                style={{
                  minHeight: "7vw",
                  gridColumn: day + 1,
                  backgroundColor: month % 2 ? '#d3d3d3' : 'white',
                  color: day === 0 || day === 6 ? "red" : '',
                  border: today.isSame(date, 'day') ? "black 5px solid" : 'black 1px solid',
                }}
              >
                <div>{date.format("MMM D")}</div>
                <div>
                  {/* {mHoliday && "M🤶"}
                  {mLock && "M🔒"}
                  {mPencil && "M✏️"} */}
                  {mDate && mDate.type}
                </div>
                {/* <div>
                  {tHoliday && "T🎅"}
                  {tLock && "T🔒"}
                </div> */}
              </div>)
          })}
        </div>
        <div
          style={{
            width: '50%',
            minWidth: '50%',
            height: '100vh',
          }}
        >
          {/* M Total: {calculateMPTO(mPenciled, mLocked).totalCount}
          M locked: {calculateMPTO(mPenciled, mLocked).lockedCount}
          M penciled: {calculateMPTO(mPenciled, mLocked).penciledCount} */}
        </div>

      </div>

    </>
  )

}

const calculateMPTO = (penciled: Set<string>, locked: Set<string>) => {

  let penciledCount = 0;
  let lockedCount = 0;

  for (const date of penciled) {
    const datejs = dayjs(`${date}-25`, 'MM-DD-YY')
    const dayNum = datejs.day()
    if (dayNum === 4 || dayNum === 5) {
      penciledCount += .5
    }
    else {
      penciledCount += 1
    } 
  }

  for (const date of locked) {
    const datejs = dayjs(`${date}-25`, 'MM-DD-YY')
    const dayNum = datejs.day()
    if (dayNum === 4 || dayNum === 5) {
      lockedCount += .5
    }
    else {
      lockedCount += 1
    } 
  }

  return {
    totalCount: penciledCount + lockedCount,
    penciledCount,
    lockedCount
  }
}