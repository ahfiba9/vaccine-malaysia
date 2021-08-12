import {getApi} from "../../../library/axios";
import {readString} from "react-papaparse";
import {kkmBaseUrl} from "../../../config";
import {stateSorter} from "../../../library/dataProcessor";

export default async function handler(req, res) {

    const stateCasesData = await getApi(`${kkmBaseUrl}/cases_state.csv`)
    const stateCases = readString(stateCasesData, {header: true})

    const reformatData = stateSorter(stateCases.data, false, 'cases')

    res.status(200).json(reformatData)
}