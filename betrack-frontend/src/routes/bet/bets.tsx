import { createFileRoute } from '@tanstack/react-router'
import { useMutation, useQuery } from '@tanstack/react-query'
import { fetchBets } from '../../queries/bets/bets'
import { deleteBet } from '../../mutations/bets/deleteBet'

export const Route = createFileRoute('/bet/bets')({
  component: RouteComponent,
})

function RouteComponent() {
  const mutation = useMutation({
    mutationFn: (betId: number) => deleteBet(betId),
  })

  const {
    isPending,
    error,
    data: bets,
  } = useQuery({
    queryKey: ['bets'],
    queryFn: fetchBets,
  })

  if (error) {
    console.log(error)
    return 'An error has occurred: ' + error.message
  }

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
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
              <th>Actions</th>
            </tr>
          </thead>
          {!isPending ? (
            <tbody>
              {bets?.map((bet, idx) => (
                <tr key={idx}>
                  <th>{bet.date}</th>
                  <th>{bet.bookmaker}</th>
                  <th>{bet.sport}</th>
                  <th>{bet.type}</th>
                  <th>{bet.bet}</th>
                  <th>{bet.cote}</th>
                  <th>{bet.isWin ? 'Yes' : 'No'}</th>
                  <th>{bet.money}</th>
                  <th onClick={() => mutation.mutate(idx)}>
                    <button className="text-red-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
                        />
                      </svg>
                    </button>
                  </th>
                </tr>
              ))}
            </tbody>
          ) : (
            <tbody>
              <tr>
                <th>Loading...</th>
              </tr>
            </tbody>
          )}
        </table>
      </div>
    </div>
  )
}
