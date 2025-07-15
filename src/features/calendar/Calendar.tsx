import type { JSX } from "react"
import dayjs from "dayjs"
import dayOfYear from 'dayjs/plugin/dayOfYear' // ES 2015
dayjs.extend(dayOfYear)

// import { useState } from "react"

const holidays = {
  '01-01': true,
  '07-04': true,
}

const year = Array.from({ length: 365 }, (_, i) => i + 1).map(x => dayjs().dayOfYear(x))

export const Calendar = (): JSX.Element => {

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "14% 14% 14% 14% 14% 14% 14%",
        width: '100%'
      }}
    >
      {year.map(date => {
        const day = date.day()
        const month = date.month()
        const holiday: boolean = holidays[date.format('MM-DD')]
        console.log(day)
        return (
          <div
            style={{
              gridColumn: day+1,
              backgroundColor: month % 2 ? '#d3d3d3' : 'white',
              color: day === 0 || day === 6 ? "red" : '',
              fontWeight: holiday ? 'bolder' : 'initial',
              border: "black 1px solid",
              height: '100%'
            }}
          >
            {date.format("D")}
          </div>)
      })}
    </div>
  )

}