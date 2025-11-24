import type { Bet } from '../../models/Bet'

export async function fetchBets(id: number): Promise<Bet> {
  const response = await fetch('http://localhost:3000/api/v1/bet/' + id)
  return await response.json()
}
