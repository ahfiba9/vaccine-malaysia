import {getApi} from "../../../library/axios";
import {readString} from "react-papaparse";
import {kkmBaseUrl} from "../../../config";
import {malaysiaSorter} from "../../../library/dataProcessor";

export default async function handler(req, res) {

    const nationalCasesData = await getApi(`${kkmBaseUrl}/cases_malaysia.csv`)
    const nationalCases = readString(nationalCasesData, {header: true})

    const reformatData = malaysiaSorter(nationalCases.data, false, 'cases')

    res.status(200).json(reformatData)
}