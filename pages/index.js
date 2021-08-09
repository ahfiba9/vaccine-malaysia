import Head from 'next/head'
import Image from 'next/image'

import {getApi} from "../library/axios";
import {readString} from "react-papaparse";
import {citfBaseUrl, kkmBaseUrl} from "../config";
import {useEffect, useState} from "react";
import {globalState, stateArray, StateName } from "../library/globalState";
import {useSnapshot} from "valtio";
import {malaysiaSorter, vaxRegistrationProcessor} from "../library/dataProcessor";
import color from "../library/color";
import {Graph} from "../components/Graph";
import {GraphNational} from "../components/GraphNational";
import {NationalFilter} from "../components/NationalFilter";

export default function Home({
                                 nationalVaccination,
                                 nationalCases,
                                 nationalDeaths,
                                 nationalRegistration
                             }
) {

    const snap = useSnapshot(globalState)

    // console.log(stateVaccination)
    // console.log(nationalVaccination)

    useEffect(() => {
        globalState.nationalVax = malaysiaSorter(nationalVaccination.data)
        globalState.nationalCases = malaysiaSorter(nationalCases.data, false, 'national cases')
        globalState.nationalDeath = malaysiaSorter(nationalDeaths.data, false, ' national death')
        globalState.nationalRegistration = vaxRegistrationProcessor(nationalRegistration.data, true)

    }, [nationalRegistration,
        nationalVaccination,
        nationalCases,
        nationalDeaths,
       ])

console.log('in index = ', snap.nationalVax)

  return (
    <>
      <Head>
          <title>KKM tracker</title>
          <meta name={'keywords'} content={'covid tracker , dashboard'}/>
      </Head>
        <NationalFilter/>
        { snap.nationalRegistration.length > 0 &&
                <GraphNational />
        }
    </>
  )
}


export const getStaticProps = async () => {
    try {
        console.log('in get static props')

        // vaccination data
        // const dataVaxState = await getApi(`${citfBaseUrl}/vaccination/vax_state.csv`)
        const dataVaxNational = await getApi(`${citfBaseUrl}/vaccination/vax_malaysia.csv`)

        // const stateVaccination = readString(dataVaxState, {header: true})
        const nationalVaccination = readString(dataVaxNational, {header: true})

        // registration data
        // const dataVaxRegState = await getApi(`${citfBaseUrl}/registration/vaxreg_state.csv`)
        const dataVaxRegNational = await getApi(`${citfBaseUrl}/registration/vaxreg_malaysia.csv`)
        //
        // const stateRegistration = readString(dataVaxRegState, {header: true})
        const nationalRegistration = readString(dataVaxRegNational, {header: true})

        // cases data
        // const stateCasesData = await getApi(`${kkmBaseUrl}/cases_state.csv`)
        const nationalCasesData = await getApi(`${kkmBaseUrl}/cases_malaysia.csv`)

        // const stateCases = readString(stateCasesData, {header: true})
        const nationalCases = readString(nationalCasesData, {header: true})

        // deaths data
        // const stateDeathsData = await getApi(`${kkmBaseUrl}/deaths_state.csv`)
        const nationalDeathsData = await getApi(`${kkmBaseUrl}/deaths_malaysia.csv`)

        // const stateDeaths = readString(stateDeathsData, {header: true})
        const nationalDeaths = readString(nationalDeathsData, {header: true})

        // hospital and icu data
        // const hospitalDataRaw = await getApi(`${kkmBaseUrl}/hospital.csv`)
        // const icuDataRaw = await getApi(`${kkmBaseUrl}/icu.csv`)
        //
        // const hospitalData = readString(hospitalDataRaw, {header: true})
        // const icuData = readString(icuDataRaw, {header: true})

        // tests data
        // const nationalTestsData = await getApi(`${kkmBaseUrl}/tests_malaysia.csv`)
        //
        // const nationalTests = readString(nationalTestsData, {header: true})


        return {
            props : {
                nationalVaccination,
                nationalCases,
                nationalDeaths,
                nationalRegistration
            }
        }
    } catch {
        return { notFound: true}
    }
}