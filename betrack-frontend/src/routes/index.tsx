import { createFileRoute, Link } from '@tanstack/react-router'

import { BarChart } from '@mui/x-charts/BarChart'
import { useQuery } from '@tanstack/react-query'
import { fetchStats } from '../queries/bets/stats'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  const { error, data: stats } = useQuery({
    queryKey: ['stats'],
    queryFn: fetchStats,
  })

  if (error) {
    return 'An error has occured: ' + error.message
  }

  return (
    <>
      <div className="w-screen h-screen flex flex-col items-center justify-center">
        <h1 className="text-8xl m-4">BETRACKER</h1>
        <Link to="/bet/new">
          <button className="btn">Nouveau bet</button>
        </Link>
        <div className="w-full h-2/3 flex flex-row justify-around">
          <div className="w-2xl h-3/4 justify-center m-4 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm border border-gray-100 p-4">
            <h2 className="mb-8">Performance</h2>
            {stats && (
              <div className="flex flex-col space-y-8">
                <div>
                  <span
                    className={
                      'text-xl ' +
                      (stats.averageBet < 0 ? 'text-red-600' : 'text-green-600')
                    }
                  >
                    {stats.averageBet}€{' '}
                  </span>
                  C'est la moyenne de tes mises
                </div>
                <div>
                  <span
                    className={
                      'text-xl ' +
                      (stats?.median < 0 ? 'text-red-600' : 'text-green-600')
                    }
                  >
                    {stats?.median}€{' '}
                  </span>
                  C'est la médiane de tes mises. La moitié de tes mises se situe
                  au-dessus, l'autre moitié en dessous.{' '}
                </div>
                <div>
                  <span
                    className={
                      'text-xl ' +
                      (stats?.averageGain < 0
                        ? 'text-red-600'
                        : 'text-green-600')
                    }
                  >
                    {stats?.averageGain}{' '}
                  </span>
                  € C'est le gain moyen que tu réalises à chaque pari sportif
                  (en comptant les pertes !)
                </div>
                <div>
                  <span
                    className={
                      'text-xl ' +
                      (stats?.totalGain < 0 ? 'text-red-600' : 'text-green-600')
                    }
                  >
                    {stats?.totalGain}{' '}
                  </span>
                  C'est le montant total que tu as gagné sur l'ensemble de la
                  période.{' '}
                </div>
              </div>
            )}
          </div>
          <div className="w-2xl h-3/4 justify-center m-4 p-4 border-2 rounded-lg">
            <h2 className="mb-8">Graph</h2>
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
    </>
  )
}
