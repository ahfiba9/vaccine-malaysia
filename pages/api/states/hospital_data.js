import {getApi} from "../../../library/axios";
import {readString} from "react-papaparse";
import {kkmBaseUrl} from "../../../config";
import {hospitalSorter} from "../../../library/dataProcessor";

export default async function handler(req, res) {

    const hospitalDataRaw = await getApi(`${kkmBaseUrl}/hospital.csv`)
    const hospitalData = readString(hospitalDataRaw, {header: true})

    const reformatData = hospitalSorter(hospitalData.data, false)

    res.status(200).json(reformatData)
}