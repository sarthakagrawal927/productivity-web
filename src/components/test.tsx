async function getTestData() {
  const res = await fetch(`${process.env.SERVER_URL}/api/test`)
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

export default async function TestComponent() {
  const testData = await getTestData();
  return <>
    {testData.message}
  </>
}