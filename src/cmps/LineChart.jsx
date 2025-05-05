import { Line } from 'react-chartjs-2'
import { utilService } from '../services/util.service.js'
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js'
import { useMemo } from 'react'

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend)

export function LineChart() {
  function getRecentDates(numDays) {
    const dates = []
    const now = new Date()
    for (let i = numDays - 1; i >= 0; i--) {
      const d = new Date(now)
      d.setDate(now.getDate() - i)
      dates.push(d.toLocaleDateString('en-GB')) 
    }
    return dates
  }

  const labels = useMemo(() => getRecentDates(7), [])
  const values = useMemo(() => labels.map(() => utilService.getRandomIntInclusive(10, 100)), [labels])

  const data = {
    labels,
    datasets: [
      {
        label: 'Sales by Day',
        data: values,
        fill: false,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.3,
      },
    ],
  }

  return (
    <section className="line-chart">
      <h3>Sales Over Time</h3>
      <Line data={data} />
    </section>
  )
}
