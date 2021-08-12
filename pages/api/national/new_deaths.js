import {getApi} from "../../../library/axios";
import {readString} from "react-papaparse";
import {kkmBaseUrl} from "../../../config";

export default async function handler(req, res) {

    const nationalDeathsData = await getApi(`${kkmBaseUrl}/deaths_malaysia.csv`)
    const nationalDeaths = readString(nationalDeathsData, {header: true})

    res.status(200).json(nationalDeaths)
}