import {getApi} from "../../../library/axios";
import {readString} from "react-papaparse";
import {kkmBaseUrl} from "../../../config";
import {stateSorter} from "../../../library/dataProcessor";

export default async function handler(req, res) {

    const stateDeathsData = await getApi(`${kkmBaseUrl}/deaths_state.csv`)
    const stateDeaths = readString(stateDeathsData, {header: true})

    const reformatData = stateSorter(stateDeaths.data,false, 'deaths')

    res.status(200).json(reformatData)
}