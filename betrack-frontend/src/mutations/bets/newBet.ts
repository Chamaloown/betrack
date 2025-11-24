import type { Bet } from '../../models/Bet'

export async function newBet(bet: Bet): Promise<void> {
  const response = await fetch('http://localhost:3000/api/v1/bets', {
    method: 'POST',
    body: JSON.stringify(bet),
  })
  const json = await response.json()
  console.log(json)
  return json
}
