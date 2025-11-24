import type { Stat } from '../../models/Stat'

export async function fetchStats(): Promise<Stat> {
  const response = await fetch('http://localhost:3000/api/v1/bets/stat')
  return await response.json()
}
