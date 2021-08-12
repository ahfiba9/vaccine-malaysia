import {fetcher, getApi} from "./axios";
import {citfBaseUrl, kkmBaseUrl} from "../config";
import {readString} from "react-papaparse";
import useSWR from "swr";

export const useNationalVaccinationData = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { data, error } = useSWR(`${citfBaseUrl}/vaccination/vax_malaysia.csv`, getApi)
    // const nationalVaccination = readString(data, {header: true})
    const nationalVaccination = data
    return {
        nationalVaccination,
        isLoading: !error && !data,
        isError: error
    }
}

// export const getServerSideProps = async () => {
//     try {
//         // vaccination data
//         const dataVaxNational = await getApi(`${citfBaseUrl}/vaccination/vax_malaysia.csv`)
//         const nationalVaccination = readString(dataVaxNational, {header: true})
//
//         // registration data
//         const dataVaxRegNational = await getApi(`${citfBaseUrl}/registration/vaxreg_malaysia.csv`)
//         const nationalRegistration = readString(dataVaxRegNational, {header: true})
//
//         // cases data
//         const nationalCasesData = await getApi(`${kkmBaseUrl}/cases_malaysia.csv`)
//         const nationalCases = readString(nationalCasesData, {header: true})
//
//         // deaths data
//         const nationalDeathsData = await getApi(`${kkmBaseUrl}/deaths_malaysia.csv`)
//         const nationalDeaths = readString(nationalDeathsData, {header: true})
//
//         return {
//             props : {
//                 nationalVaccination,
//                 nationalCases,
//                 nationalDeaths,
//                 nationalRegistration
//             }
//         }
//     } catch {
//         return { notFound: true}
//     }
// }