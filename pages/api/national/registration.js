import {getApi} from "../../../library/axios";
import {readString} from "react-papaparse";
import {citfBaseUrl} from "../../../config";
import {vaxRegistrationProcessor} from "../../../library/dataProcessor";

export default async function handler(req, res) {

    const dataVaxRegNational = await getApi(`${citfBaseUrl}/registration/vaxreg_malaysia.csv`)
    const nationalRegistration = readString(dataVaxRegNational, {header: true})

    const reformatData = vaxRegistrationProcessor(nationalRegistration.data, true)

    res.status(200).json(reformatData)
}