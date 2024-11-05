import { z } from 'zod'

export const CospendUserList = z.object({
    "id":z.number(),
    "name":z.string(),
    "weight":z.number().nullable(),
    "activated":z.boolean(),
    "lastchanged":z.number().nullable(),
    "userid":z.string().nullable(),
    "color":z.object({"r":z.number(),"g":z.number(),"b":z.number()})
  }).array()
export const OCSResponse = z.object({ 
  "ocs": z.object({
    "meta": z.object({
      "status": z.string(),
      "statuscode": z.number(),
      "message": z.string()
    }),
    "data": CospendUserList
  })
})

// type CospendUserList = z.infer<typeof CospendUserList>;
// type OCSResponse = z.infer<typeof OCSResponse>;
