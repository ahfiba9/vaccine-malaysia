import {getApi} from "../../../library/axios";
import {readString} from "react-papaparse";
import {kkmBaseUrl} from "../../../config";
import {hospitalSorter} from "../../../library/dataProcessor";

export default async function handler(req, res) {

    const icuDataRaw = await getApi(`${kkmBaseUrl}/icu.csv`)
    const icuData = readString(icuDataRaw, {header: true})

    const reformatData = hospitalSorter(icuData.data, true)

    res.status(200).json(reformatData)
}