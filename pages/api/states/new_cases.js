import {getApi} from "../../../library/axios";
import {readString} from "react-papaparse";
import {kkmBaseUrl} from "../../../config";

export default async function handler(req, res) {

    const stateCasesData = await getApi(`${kkmBaseUrl}/cases_state.csv`)
    const stateCases = readString(stateCasesData, {header: true})

    res.status(200).json(stateCases)
}