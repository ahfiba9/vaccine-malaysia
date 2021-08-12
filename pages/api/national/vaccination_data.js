import {getApi} from "../../../library/axios";
import {readString} from "react-papaparse";
import {citfBaseUrl} from "../../../config";

export default async function handler(req, res) {

    const dataVaxNational = await getApi(`${citfBaseUrl}/vaccination/vax_malaysia.csv`)
    const nationalVaccination = readString(dataVaxNational, {header: true})

    res.status(200).json(nationalVaccination)
}