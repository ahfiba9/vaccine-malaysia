import {getApi} from "../../../library/axios";
import {readString} from "react-papaparse";
import {citfBaseUrl} from "../../../config";

export default async function handler(req, res) {

    const dataVaxRegState = await getApi(`${citfBaseUrl}/registration/vaxreg_state.csv`)
    const stateRegistration = readString(dataVaxRegState, {header: true})

    res.status(200).json(stateRegistration)
}