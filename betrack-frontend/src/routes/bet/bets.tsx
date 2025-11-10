import { createFileRoute } from '@tanstack/react-router'
import type { Bet } from '../../models/Bet'
import { useQuery } from '@tanstack/react-query'

export const Route = createFileRoute('/bet/bets')({
  component: RouteComponent,
})

function RouteComponent() {
  const { isPending, error, data } = useQuery({
    queryKey: ['repoData'],
    queryFn: async () => {
      const response = await fetch('http://localhost:3000/bet/bets')
      console.log('response', response)
      return await response.json()
    },
  })

  if (isPending) return 'Loading...'

  if (error) {
    console.log(error)
    return 'An error has occurred: ' + error.message
  }
  const bets: Bet[] | null = null

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>date</th>
              <th>Bookmaker</th>
              <th>Sport</th>
              <th>Type</th>
              <th>Bet</th>
              <th>Cote</th>
              <th>Won ?</th>
              <th>Money</th>
            </tr>
          </thead>
          {bets ? (
            <tbody>
              {data.map((bet: Bet) => {
                ;<tr>
                  <th>{bet.date}</th>
                  <th>{bet.bookmaker}</th>
                  <th>{bet.sport}</th>
                  <th>{bet.type}</th>
                  <th>{bet.bet}</th>
                  <th>{bet.cote}</th>
                  <th>{bet.isWin}</th>
                  <th>{bet.money}</th>
                </tr>
              })}
            </tbody>
          ) : (
            <h1>There is nothing to show.</h1>
          )}
        </table>
      </div>
    </div>
  )
}
