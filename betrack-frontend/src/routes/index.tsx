import { createFileRoute, Link } from '@tanstack/react-router'

import { useState } from 'react'

import { BarChart } from '@mui/x-charts/BarChart'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  const [average] = useState(33)
  const [median] = useState(45)
  const [averageGain] = useState(10)
  const [totalAmount] = useState(353)

  return (
    <>
      <div className="w-screen h-screen flex flex-col items-center justify-center">
        <h1 className="text-8xl m-4">BETRACKER</h1>
        <Link to="/bet/new">
          <button className="btn">Nouveau bet</button>
        </Link>
        <div className="w-full h-2/3 flex flex-row justify-around">
          <div className="w-2xl h-3/4 justify-center border-2 border-white rounded-lg p-4">
            <h2 className="mb-8">Performance</h2>
            <div className="flex flex-col space-y-8">
              <div>
                <span
                  className={
                    'text-xl ' +
                    (average < 0 ? 'text-red-600' : 'text-green-600')
                  }
                >
                  {average}€{' '}
                </span>
                C'est la moyenne de tes mises
              </div>
              <div>
                <span
                  className={
                    'text-xl ' +
                    (average < 0 ? 'text-red-600' : 'text-green-600')
                  }
                >
                  {median}€{' '}
                </span>
                C'est la médiane de tes mises. La moitié de tes mises se situe
                au-dessus, l'autre moitié en dessous.{' '}
              </div>
              <div>
                <span
                  className={
                    'text-xl ' +
                    (average < 0 ? 'text-red-600' : 'text-green-600')
                  }
                >
                  {averageGain}{' '}
                </span>
                € C'est le gain moyen que tu réalises à chaque pari sportif (en
                comptant les pertes !)
              </div>
              <div>
                <span
                  className={
                    'text-xl ' +
                    (average < 0 ? 'text-red-600' : 'text-green-600')
                  }
                >
                  {totalAmount}{' '}
                </span>
                C'est le montant total que tu as gagné sur l'ensemble de la
                période.{' '}
              </div>
            </div>
          </div>
          <div className="w-2xl h-3/4 justify-center border-2 border-white rounded-lg p-4">
            <h2 className="mb-8">Performance</h2>
            <div className="pb-8 h-full">
              <BarChart
                xAxis={[
                  {
                    data: ['Janvier', 'Fevrier', 'Mars'],
                    sx: { color: 'primary.main', width: 10000 },
                  },
                ]}
                series={[{ data: [4] }, { data: [1] }, { data: [2] }]}
                height={300}
              />
            </div>
          </div>
        </div>
      </div>
      <h2>Logiciel de tracking de paris sportif</h2>
    </>
  )
}
