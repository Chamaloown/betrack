export async function deleteBet(id: number): Promise<void> {
  const response = await fetch('http://localhost:3000/bet/' + id, {
    method: 'DELETE',
  })
  console.log(response)
  const json = await response.json()
  console.log(json)
  return json
}
