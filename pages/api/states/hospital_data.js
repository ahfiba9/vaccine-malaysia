import {getApi} from "../../../library/axios";
import {readString} from "react-papaparse";
import {kkmBaseUrl} from "../../../config";

export default async function handler(req, res) {

    const hospitalDataRaw = await getApi(`${kkmBaseUrl}/hospital.csv`)
    const hospitalData = readString(hospitalDataRaw, {header: true})

    res.status(200).json(hospitalData)
}