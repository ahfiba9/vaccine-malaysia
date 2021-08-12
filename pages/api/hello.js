// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import {getApi} from "../../library/axios";
import {citfBaseUrl} from "../../config";
import {readString} from "react-papaparse";



export default async function handler(req, res) {

  const dataVaxNational = await getApi(`${citfBaseUrl}/vaccination/vax_malaysia.csv`)
  const nationalVaccination = readString(dataVaxNational, {header: true})

  res.status(200).json(nationalVaccination)
}
