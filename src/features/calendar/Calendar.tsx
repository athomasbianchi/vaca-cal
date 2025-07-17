import type { JSX } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import {
  selectMdates,
} from "./calendarSlice"
import dayjs from "dayjs"
import dayOfYear from 'dayjs/plugin/dayOfYear' // ES 2015
dayjs.extend(dayOfYear)

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
                onClick={
                  () => {console.log(mmdd_date)}
                }
              >
                <div>{date.format("MMM D")}</div>
                <MarcySwatch date={mmdd_date} />
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
          <Data />
        </div>

      </div>

    </>
  )

}

const Data = (): JSX.Element => {
  const mCalendar = useAppSelector(selectMdates)
  const totals = calculateMPTO(mCalendar)

  return (
    <>
    <div>
      M PTO Total : 22
    </div>
    <div>
      M PTO Used : {totals.totalCount}
    </div>
    <div>
      M PTO Remaining : {22 - totals.totalCount}
    </div>
    </>
  )
}

const MarcySwatch = ({ date }): JSX.Element => {
  const mCalendar = useAppSelector(selectMdates)
  const data = mCalendar[date]
  const type = data?.type


  return (
    <div>
      {type === 'holiday' && "M🤶"}
      {type === 'locked' && "M🔒"}
      {type === 'penciled' && "M✏️"}
    </div>
  )
}

const calculateMPTO = (dates: Object) => {

  let penciledCount = 0;
  let lockedCount = 0;

  for (const date in dates) {
    const { type } = dates[date]
    const datejs = dayjs(`${date}-25`, 'MM-DD-YY')
    const dayNum = datejs.day()
    if (dayNum === 4 || dayNum === 5) {
      if (type === 'penciled') {
        penciledCount += 0.5
      }
      if (type === 'locked') {
        lockedCount += 0.5
      }
    }
    else {
      if (type === 'penciled') {
        penciledCount += 1
      }
      if (type === 'locked') {
        lockedCount += 1  
      }
    } 
  }

  return {
    totalCount: penciledCount + lockedCount,
    penciledCount,
    lockedCount
  }
}