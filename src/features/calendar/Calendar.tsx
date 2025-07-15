import type { JSX } from "react"
import dayjs from "dayjs"
import dayOfYear from 'dayjs/plugin/dayOfYear' // ES 2015
dayjs.extend(dayOfYear)

// import { useState } from "react"

const today = dayjs()
const year = Array.from({length: 365}, (_,i) => i + 1).map(x => dayjs().dayOfYear(x))

export const Calendar = (): JSX.Element => {
  console.log(today)
  console.log(year)

  return (
    <div>
      <div>{today.format('MMM')}</div>
      <div>{today.format('DD')}</div>
      <div>{today.format('YYYY')}</div>
    </div>
  )

}