'use server'
import {expenseList} from "./lib/config"
import {disrootRequest} from "./lib/fn"

const coworkId = 1281
const pagoDiferidoId = 4909

export async function registerExpense(prevState: any, formData: FormData) {
  const expense = expenseList.find(e => e.name == formData.get("expense"))
  if (!expense) {
    throw new Error("missing expense?")
  }
  const userId = formData.get("user") as string
  const pagoDiferido = formData.get('pagoDiferido') === 'on'
  const data = {
    what: expense.name,
    comment: "",
    timestamp: Date.now(),
    payer: coworkId,
    payedFor: parseInt(userId, 10),
    amount: expense.amount,
    /*
    repeat: "n",
    repeatAllActive: 0,
    repeatUntil: null,
    repeatFreq: 1,
    */
    categoryId: 0,
    paymentModeId: pagoDiferido ? pagoDiferidoId : null
  }

  try {
    await disrootRequest("/bills", data)
  } catch (e) {
    console.error('Failed to register expense', e, data)
    return { message: 'Failed to register expense' }
  }
  return { message: 'Cobro registrado con éxito' }
}

/*
  await fetch("https://cloud.disroot.org/ocs/v2.php/apps/cospend/api/v1/projects/gastos-coworking/bills", {
    "credentials": "include",
    "headers": {
        "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:131.0) Gecko/20100101 Firefox/131.0",
        "Accept": "application/json, text/plain",
        "Accept-Language": "en-US,es-AR;q=0.7,en;q=0.3",
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
        "requesttoken": "zhZ5RkzZYnbW4u7Z2RyxaDmhLEGkThQpbAoc5K2LUD8=:oCYNNR6uJSGAhIa1tGTnBlLHXgvPfEVDInglgZzHB30=",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-origin",
        "Priority": "u=0",
        "Pragma": "no-cache",
        "Cache-Control": "no-cache"
    },
    "body": "{\"what\":\"Birra\",\"comment\":\"diferido\",\"timestamp\":1730765692,\"payer\":1281,\"payedFor\":\"1261\",\"amount\":2000,\"repeat\":\"n\",\"repeatAllActive\":0,\"repeatUntil\":null,\"repeatFreq\":1,\"paymentModeId\":4909,\"categoryId\":0}",
    "method": "POST",
    "mode": "cors"
});
 */
