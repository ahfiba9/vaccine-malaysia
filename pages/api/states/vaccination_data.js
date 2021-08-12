import {getApi} from "../../../library/axios";
import {readString} from "react-papaparse";
import {citfBaseUrl} from "../../../config";

export default async function handler(req, res) {

    const dataVaxState = await getApi(`${citfBaseUrl}/vaccination/vax_state.csv`)
    const stateVaccination = readString(dataVaxState, {header: true})

    res.status(200).json(stateVaccination)
}