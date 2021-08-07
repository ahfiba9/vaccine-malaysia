import Head from 'next/head'
import Image from 'next/image'

import {getApi} from "../library/axios";
import {readString} from "react-papaparse";
import {citfBaseUrl} from "../config";
import {useEffect} from "react";
import {globalState, stateArray, StateName, stateSorter} from "../library/globalState";
import {useSnapshot} from "valtio";

export default function Home({stateVaccination, nationalVaccination, malaysiaPopulation}) {
    const snap = useSnapshot(globalState)

    console.log(stateVaccination)
    // console.log(nationalVaccination)
    // console.log(malaysiaPopulation)

    useEffect(() => {
        globalState.stateVax = stateSorter(stateVaccination.data)
        globalState.nationalVax = nationalVaccination

    },[stateVaccination, nationalVaccination, malaysiaPopulation])

    console.log('in global state, state vax = ', snap.stateVax)
    console.log('in global state, national vax = ', snap.nationalVax)

  return (
    <div>
      <Head>
          <title>KKM tracker</title>
          <meta name={'keywords'} content={'covid tracker , dashboard'}/>
      </Head>

      <h1>Welcome to Next</h1>
    </div>
  )
}

export const getStaticProps = async () => {
    try {
        const dataVaxState = await getApi(`${citfBaseUrl}/vaccination/vax_state.csv`)
        const dataVaxNational = await getApi(`${citfBaseUrl}/vaccination/vax_malaysia.csv`)
        //TO DO make this as static data in JSON format. save api call.
        const malaysiaPopulationData = await getApi(`${citfBaseUrl}/static/population.csv`)

        const stateVaccination = readString(dataVaxState, {header: true})
        const nationalVaccination = readString(dataVaxNational, {header: true})
        const malaysiaPopulation = readString(malaysiaPopulationData, {header: true})

        console.log('malaysia population = ', malaysiaPopulation)

        return {
            props : {
                stateVaccination,
                nationalVaccination,
                malaysiaPopulation
            }
        }
    } catch {
        return { notFound: true}
    }
}