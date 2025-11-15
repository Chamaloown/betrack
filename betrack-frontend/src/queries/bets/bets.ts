import type { Bet } from '../../models/Bet'

export async function fetchBets(): Promise<Bet[]> {
  const response = await fetch('http://localhost:3000/bets')
  return await response.json()
}
