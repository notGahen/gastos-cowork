import {OCSResponse} from "@/zodTypes";

export const disrootRequest = async (path: string, payload: any = undefined) => {
  const user = process.env.DISROOT_AUTH_USER
  const pass = process.env.DISROOT_AUTH_PASSWORD
  const baseUrl = 'https://cloud.disroot.org/ocs/v2.php/apps/cospend/api/v1/projects/gastos-coworking'
  const url = `${baseUrl}${path}`
  let headers = new Headers();
  headers.set('Authorization', `Basic ${btoa(`${user}:${pass}`)}`)
  headers.set('Accept', 'application/json, text/plain, */*');
  headers.set('OCS-APIRequest', 'true');

  try {
    const res = await fetch(url, {
      credentials: "include",
      method: !payload ? "GET" : "POST",
      headers: headers,
      body: JSON.stringify(payload) || null,
      // body: payload ? "{\"what\":\"Birra\",\"comment\":\"diferido\",\"timestamp\":1730765692,\"payer\":1281,\"payedFor\":\"1261\",\"amount\":2000,\"repeat\":\"n\",\"repeatAllActive\":0,\"repeatUntil\":null,\"repeatFreq\":1,\"paymentModeId\":4909,\"categoryId\":0}" : null,
      "mode": "cors"
    })
    payload && console.log(url, headers, JSON.stringify(payload), res.status, JSON.stringify(await res.json()))
    const data = !payload ? OCSResponse.parse(await res.json()) : await res.json()
    return data.ocs.data
  } catch (e: any) {
    console.error(e)
    return false
  }
}


