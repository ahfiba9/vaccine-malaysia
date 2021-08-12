import {getApi} from "../../../library/axios";
import {readString} from "react-papaparse";
import {citfBaseUrl} from "../../../config";
import {malaysiaSorter} from "../../../library/dataProcessor";

export default async function handler(req, res) {

    const dataVaxNational = await getApi(`${citfBaseUrl}/vaccination/vax_malaysia.csv`)
    const nationalVaccination = readString(dataVaxNational, {header: true})

    const reformatData = malaysiaSorter(nationalVaccination.data)

    res.status(200).json(reformatData)
}