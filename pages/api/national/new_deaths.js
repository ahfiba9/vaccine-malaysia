import {getApi} from "../../../library/axios";
import {readString} from "react-papaparse";
import {kkmBaseUrl} from "../../../config";
import {globalState} from "../../../library/globalState";
import {malaysiaSorter, vaxRegistrationProcessor} from "../../../library/dataProcessor";

export default async function handler(req, res) {

    const nationalDeathsData = await getApi(`${kkmBaseUrl}/deaths_malaysia.csv`)
    const nationalDeaths = readString(nationalDeathsData, {header: true})

    const reformatData = malaysiaSorter(nationalDeaths.data, false, 'death')

    res.status(200).json(reformatData)
}

// if (vaccinationData && vaccinationData.data.length > 0) {
//     globalState.nationalVax = malaysiaSorter(vaccinationData)
//     console.log('tst national vax = ', malaysiaSorter(vaccinationData))
// }
//
// if (newDeathsData && newDeathsData.data.length > 0) {
//     globalState.nationalDeath = malaysiaSorter(newDeathsData, false, 'death')
// }
//
// if (registrationData && registrationData.data.length > 0) {
//     globalState.nationalRegistration = vaxRegistrationProcessor(registrationData, true)
// }
//
// if (newCasesData && newCasesData.data.length > 0) {
//     globalState.nationalCases = malaysiaSorter(newCasesData, false, 'cases')
// }