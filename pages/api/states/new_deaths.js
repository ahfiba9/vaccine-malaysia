import {getApi} from "../../../library/axios";
import {readString} from "react-papaparse";
import {kkmBaseUrl} from "../../../config";

export default async function handler(req, res) {

    const stateDeathsData = await getApi(`${kkmBaseUrl}/deaths_state.csv`)
    const stateDeaths = readString(stateDeathsData, {header: true})

    res.status(200).json(stateDeaths)
}