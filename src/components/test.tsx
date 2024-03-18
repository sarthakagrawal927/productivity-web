import { cookies } from "next/headers";

async function getTestData() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/test`, {
      headers: {
        Cookie: cookies().toString()
      }
    })
    if (!res.ok) throw new Error(await res.text())
    const jsonResp = await res.json();
    return jsonResp.message
  } catch (err) {
    console.log('Failed to fetch data', err)
    return "Something went wrong, try signing in again."
  }
}

export default async function TestComponent() {
  const testData = await getTestData();
  return <>
    {testData.message}
  </>
}