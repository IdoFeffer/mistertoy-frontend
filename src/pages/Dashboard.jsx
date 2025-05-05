import React from "react"
import { useEffect, useState } from "react"
import { Doughnut } from "react-chartjs-2"
import { toyService } from "../services/toy.service.js"
import { LineChart } from "../cmps/LineChart.jsx"

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"

ChartJS.register(ArcElement, Tooltip, Legend)

export function Dashboard() {
  const [toys, setToys] = useState([])

  useEffect(() => {
    toyService.query().then(setToys)
  }, [])

  function getLabelMap() {
    const map = {}
    toys.forEach((toy) => {
      if (Array.isArray(toy.labels)) {
        toy.labels.forEach((label) => {
          map[label] = (map[label] || 0) + 1
        })
      }
    })
    return map
  }
  if (!toys.length) return <p>Loading...</p>

  function getStockByLabelMap(toys) {
    const labelStats = {}

    toys.forEach((toy) => {
      if (!Array.isArray(toy.labels)) return

      toy.labels.forEach((label) => {
        if (!labelStats[label]) {
          labelStats[label] = { total: 0, inStock: 0 }
        }
        labelStats[label].total++
        if (toy.inStock) labelStats[label].inStock++
      })
    })
    const percentMap = {}
    Object.entries(labelStats).forEach(([label, { total, inStock }]) => {
      percentMap[label] = Math.round((inStock / total) * 100)
    })
    return percentMap
  }

  // const labelMap = getLabelMap()
  const labelMap = getStockByLabelMap(toys)
  const data = {
    labels: Object.keys(labelMap),
    datasets: [
      {
        label: "% of toys",
        data: Object.values(labelMap),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  }

  return (
    <section style={{ width: "50vw", margin: "auto" }} className="dashboard">
      <h2>Toy Dashboard</h2>
      <Doughnut data={data} />
      <LineChart />
    </section>
  )
}
