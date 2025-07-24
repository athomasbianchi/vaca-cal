import type { JSX } from "react"
import { useState } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import {
  updateDate,
  selectMdates,
  selectTDates,
  selectTMonthlyAccrual,
  selectTStartingDays,
} from "./calendarSlice"
import dayjs from "dayjs"
import dayOfYear from 'dayjs/plugin/dayOfYear' // ES 2015
dayjs.extend(dayOfYear)

const year = Array.from({ length: 365 }, (_, i) => i + 1).map(x => dayjs().dayOfYear(x));
const today = dayjs();

const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']

export const Calendar = (): JSX.Element => {
  const [selectedDay, setSelectedDay] = useState(null);

  const handleDayClick = (date: string) => {
    setSelectedDay(date);
  }


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
          <DateDetail
            selectedDay={selectedDay}
            handleClick={handleDayClick}
          />
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
                  backgroundColor: month % 2 ? '#e3e2e2' : 'white',
                  color: day === 0 || day === 6 ? "red" : '',
                  border: today.isSame(date, 'day') ? "black 5px solid" : 'black 1px solid',
                  display: 'flex',
                  flexDirection: 'column'
                }}
                onClick={() => handleDayClick(mmdd_date)}
              >
                <div
                  style={{
                    minHeight: '33%'
                  }}
                >{date.format("MMM D")}</div>
                <MarcySwatch date={mmdd_date} />
                <TommySwatch date={mmdd_date} />
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
  const tCalendar = useAppSelector(selectTDates)
  const tMonthlyAccrual = useAppSelector(selectTMonthlyAccrual)
  const tStartingDays = useAppSelector(selectTStartingDays)
  const totals = calculateMPTO(mCalendar)
  const ttotals = calculateTPTO(tCalendar, tStartingDays, tMonthlyAccrual);

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

      <div>
        {
          months.filter(
            x => Number(x) > today.month()
          ).map(month => {
            return (
              <div>
                <span>{dayjs().set('month', Number(month)-1).format('MMM')} </span>
                <span> taken: {ttotals[month].totalTaken}</span>
                <span> accrued: {ttotals[month].accrual}</span>
                <span> remaining: {ttotals[month].accrual - ttotals[month].totalTaken}</span>
              </div>
            )
          })
        }
      </div>
    </>
  )
}

const MarcySwatch = ({ date }): JSX.Element => {
  const mCalendar = useAppSelector(selectMdates)
  const data = mCalendar[date]
  const type = data?.type

  return (
    <div
      style={{
        minHeight: '33%',
        backgroundColor: type ? '#d5deeb' : 'inherit'
      }}
    >
      {type === 'holiday' && "M🤶"}
      {type === 'locked' && "M🔒"}
      {type === 'penciled' && "M✏️"}
    </div>
  )
}

const TommySwatch = ({ date }): JSX.Element => {
  const tCalendar = useAppSelector(selectTDates)
  const data = tCalendar[date]
  const type = data?.type

  return (
    <div
      style={{
        minHeight: '33%'
      }}
    >
      {type === 'holiday' && "T🎅"}
      {type === 'locked' && "T🔒"}
      {type === 'penciled' && "T✏️"}
    </div>
  )
}

const DateDetail = ({ selectedDay, handleClick }) : JSX.Element => {
  const mCalendar = useAppSelector(selectMdates)
  const tCalendar = useAppSelector(selectTDates)
  const dispatch = useAppDispatch()
  const mDate = mCalendar[selectedDay]
  const tDate = tCalendar[selectedDay]
  const mType = mDate?.type || 'work'
  const tType = tDate?.type || 'work'
  const [mDay, setMday] = useState(mType)
  const [tDay, setTday] = useState(tType)
  
  const handleMChange = (e) => {
    setMday(e.target.value)
  }

  const handleTChange = (e) => {
    setTday(e.target.value)
  }

  const handleSubmit = () => {
    dispatch(updateDate({
      date: selectedDay,
      mValue: mDay,
      tValue: tDay,
    }));
    handleClick(null);
  }

  if (selectedDay) {
    return (
      <div
        style={{
          position: "absolute",
          height: '100vh',
          width: '50%',
          marginLeft: 0,
          backgroundColor: 'red',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <div
          style={{
            height: '200px',
            width: '200px',
            backgroundColor: 'green',
            fontSize: '20px'
          }}
        >
          <div>{selectedDay}</div>
          <div>Marissa</div>
          <select value={mDay} onChange={handleMChange} >
            <option value="penciled">M✏️</option>
            <option value="locked">M🔒</option>
            <option value="work">M🧑‍💼</option>
          </select>
          <div>Tom </div>
          <select value={tDay} onChange={handleTChange} >
            <option value="penciled">T✏️</option>
            <option value="locked">T🔒</option>
            <option value="work">T🧑‍💼</option>
          </select>
          <div
            onClick={() => handleSubmit()}
          >Submit</div>
          <div
            onClick={() => handleClick(null)}
          >close</div>
          
        </div>
      </div>
    )
  }
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

const calculateTPTO = (dates: Object, tStartingDays: number, tMonthlyAccrual: number) => {
  const monthly = {}

  months.forEach((month: string, i: number) => {
    monthly[month] = {accrual: (i) * tMonthlyAccrual + tStartingDays}
  });

  for (const date in dates) {
    if (dates[date].type === 'locked' || dates[date].type === 'penciled') {
      const month = date.substring(0,2)
      if (!monthly[month].taken) monthly[month].taken = 1
      else monthly[month].taken = monthly[month].taken + 1
    }
  }

  let totalTaken = 0;
  months.forEach(month => {
    totalTaken = totalTaken + (monthly[month].taken || 0)
    monthly[month].totalTaken = totalTaken
  });

  return monthly;
}