import {getApi} from "../../../library/axios";
import {readString} from "react-papaparse";
import {citfBaseUrl} from "../../../config";
import {vaxRegistrationProcessor} from "../../../library/dataProcessor";

export default async function handler(req, res) {

    const dataVaxRegState = await getApi(`${citfBaseUrl}/registration/vaxreg_state.csv`)
    const stateRegistration = readString(dataVaxRegState, {header: true})

    const reformatData = vaxRegistrationProcessor(stateRegistration.data)

    res.status(200).json(reformatData)
}