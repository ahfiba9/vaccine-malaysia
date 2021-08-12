import Head from 'next/head'

import {getApi} from "../library/axios";
import {readString} from "react-papaparse";
import {citfBaseUrl, kkmBaseUrl} from "../config";
import {useEffect} from "react";
import {globalState } from "../library/globalState";
import {useSnapshot} from "valtio";
import {malaysiaSorter, vaxRegistrationProcessor} from "../library/dataProcessor";
import {GraphSinglePage} from "../components/GraphSinglePage";
import {GraphFilter} from "../components/GraphFilter";
import LoaderComponent from "../components/LoaderChecker";
import {LatestData} from "../components/LatestData";
import {useNationalVaccinationData} from "../library/nationalApiCall";

export default function Home({
                                 nationalVaccinationProps,
                                 nationalCases,
                                 nationalDeaths,
                                 nationalRegistration,
                             }
) {

    const snap = useSnapshot(globalState)

    const { nationalVaccination, isLoading, isError } =useNationalVaccinationData()

    console.log('test swr = ', nationalVaccination)
    console.log('test swr2 = ', isLoading)
    console.log('test swr 3= ', isError)

    useEffect(() => {
        globalState.nationalVax = malaysiaSorter(nationalVaccinationProps.data)
        globalState.nationalCases = malaysiaSorter(nationalCases.data, false, 'cases')
        globalState.nationalDeath = malaysiaSorter(nationalDeaths.data, false, 'death')
        globalState.nationalRegistration = vaxRegistrationProcessor(nationalRegistration.data, true)
    }, [nationalRegistration,
        nationalVaccination,
        nationalCases,
        nationalDeaths,
       ])

  return (
    <>
      <Head>
          <title>Covid In Malaysia</title>
          <meta name={'keywords'} content={'covid tracker , vaccine tracker, CITF, KKM, MOH'}/>
      </Head>
        <LoaderComponent />
        <h1 className={'text-2xl text-green-500 text-center '}>
            <span>National Data</span>
        </h1>
        {snap.nationalCases.length > 0 && <LatestData/>}
        { snap.nationalRegistration.length > 0 &&
                <GraphSinglePage isNational={true}/>
        }
        <GraphFilter isNational={true}/>
    </>
  )
}


export const getServerSideProps = async () => {
    try {
        // vaccination data
        const dataVaxNational = await getApi(`${citfBaseUrl}/vaccination/vax_malaysia.csv`)
        const nationalVaccinationProps = readString(dataVaxNational, {header: true})

        // registration data
        const dataVaxRegNational = await getApi(`${citfBaseUrl}/registration/vaxreg_malaysia.csv`)
        const nationalRegistration = readString(dataVaxRegNational, {header: true})

        // cases data
        const nationalCasesData = await getApi(`${kkmBaseUrl}/cases_malaysia.csv`)
        const nationalCases = readString(nationalCasesData, {header: true})

        // deaths data
        const nationalDeathsData = await getApi(`${kkmBaseUrl}/deaths_malaysia.csv`)
        const nationalDeaths = readString(nationalDeathsData, {header: true})

        return {
            props : {
                nationalVaccinationProps,
                nationalCases,
                nationalDeaths,
                nationalRegistration
            }
        }
    } catch {
        return { notFound: true}
    }
}