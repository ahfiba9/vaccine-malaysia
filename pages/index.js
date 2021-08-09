import Head from 'next/head'
import Image from 'next/image'

import {getApi} from "../library/axios";
import {readString} from "react-papaparse";
import {citfBaseUrl, kkmBaseUrl} from "../config";
import {useEffect, useState} from "react";
import {globalState, stateArray, StateName } from "../library/globalState";
import {useSnapshot} from "valtio";
import {hospitalSorter, stateSorter} from "../library/dataProcessor";
import color from "../library/color";
import {Graph} from "../components/Graph";

export default function Home({
                                 stateVaccination,
                                 nationalVaccination,
                                 stateCases,
                                 nationalCases,
                                 stateDeaths,
                                 nationalDeaths,
                                 hospitalData,
                                 icuData,
                             }
) {

    const snap = useSnapshot(globalState)

    // console.log(stateVaccination)
    // console.log(nationalVaccination)

    useEffect(() => {
        globalState.stateVax = stateSorter(stateVaccination.data, true)
        globalState.nationalVax = nationalVaccination.data
        globalState.nationalCases = nationalCases.data
        globalState.stateCases = stateSorter(stateCases.data, false)
        globalState.nationalDeath = nationalDeaths.data
        globalState.stateDeaths = stateSorter(stateDeaths.data,false)
        globalState.stateHospital = hospitalSorter(hospitalData.data, false)
        globalState.stateIcu = hospitalSorter(icuData.data, true)


    }, [stateVaccination,
        nationalVaccination,
        stateCases,
        nationalCases,
        stateDeaths,
        nationalDeaths,
        hospitalData,
        icuData,
       ])



  return (
    <>
      <Head>
          <title>KKM tracker</title>
          <meta name={'keywords'} content={'covid tracker , dashboard'}/>
      </Head>

        { Object.keys(snap.stateVax).length > 0 &&
        <div>
            {stateArray.map((state) => (
                <Graph key={state} stateName={state} />
            ))}
        </div>
        }
    </>
  )
}


export const getStaticProps = async () => {
    try {
        // vaccination data
        const dataVaxState = await getApi(`${citfBaseUrl}/vaccination/vax_state.csv`)
        const dataVaxNational = await getApi(`${citfBaseUrl}/vaccination/vax_malaysia.csv`)

        const stateVaccination = readString(dataVaxState, {header: true})
        const nationalVaccination = readString(dataVaxNational, {header: true})

        // registration data
        // const dataVaxRegState = await getApi(`${citfBaseUrl}/registration/vaxreg_state.csv`)
        // const dataVaxRegNational = await getApi(`${citfBaseUrl}/registration/vaxreg_malaysia.csv`)
        //
        // const stateRegistration = readString(dataVaxRegState, {header: true})
        // const nationalRegistration = readString(dataVaxRegNational, {header: true})

        // cases data
        const stateCasesData = await getApi(`${kkmBaseUrl}/cases_state.csv`)
        const nationalCasesData = await getApi(`${kkmBaseUrl}/cases_malaysia.csv`)

        const stateCases = readString(stateCasesData, {header: true})
        const nationalCases = readString(nationalCasesData, {header: true})

        // deaths data
        const stateDeathsData = await getApi(`${kkmBaseUrl}/deaths_state.csv`)
        const nationalDeathsData = await getApi(`${kkmBaseUrl}/deaths_malaysia.csv`)

        const stateDeaths = readString(stateDeathsData, {header: true})
        const nationalDeaths = readString(nationalDeathsData, {header: true})

        // hospital and icu data
        const hospitalDataRaw = await getApi(`${kkmBaseUrl}/hospital.csv`)
        const icuDataRaw = await getApi(`${kkmBaseUrl}/icu.csv`)

        const hospitalData = readString(hospitalDataRaw, {header: true})
        const icuData = readString(icuDataRaw, {header: true})

        // tests data
        // const nationalTestsData = await getApi(`${kkmBaseUrl}/tests_malaysia.csv`)
        //
        // const nationalTests = readString(nationalTestsData, {header: true})


        return {
            props : {
                stateVaccination,
                nationalVaccination,
                stateCases,
                nationalCases,
                stateDeaths,
                nationalDeaths,
                hospitalData,
                icuData,
            }
        }
    } catch {
        return { notFound: true}
    }
}