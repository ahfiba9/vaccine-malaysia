import {getApi} from "../../../library/axios";
import {readString} from "react-papaparse";
import {kkmBaseUrl} from "../../../config";

export default async function handler(req, res) {

    const icuDataRaw = await getApi(`${kkmBaseUrl}/icu.csv`)
    const icuData = readString(icuDataRaw, {header: true})

    res.status(200).json(icuData)
}