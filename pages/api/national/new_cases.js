import {getApi} from "../../../library/axios";
import {readString} from "react-papaparse";
import {kkmBaseUrl} from "../../../config";

export default async function handler(req, res) {

    const nationalCasesData = await getApi(`${kkmBaseUrl}/cases_malaysia.csv`)
    const nationalCases = readString(nationalCasesData, {header: true})

    res.status(200).json(nationalCases)
}