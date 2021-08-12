import {getApi} from "../../../library/axios";
import {readString} from "react-papaparse";
import {citfBaseUrl} from "../../../config";

export default async function handler(req, res) {

    const dataVaxRegNational = await getApi(`${citfBaseUrl}/registration/vaxreg_malaysia.csv`)
    const nationalRegistration = readString(dataVaxRegNational, {header: true})

    res.status(200).json(nationalRegistration)
}