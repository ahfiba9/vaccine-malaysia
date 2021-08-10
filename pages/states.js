import Head from 'next/head'
import Link from 'next/link'

import {getApi} from "../library/axios";
import {readString} from "react-papaparse";
import {citfBaseUrl, kkmBaseUrl} from "../config";
import {useEffect, useRef, useState} from "react";
import {globalState, stateArray, StateName } from "../library/globalState";
import {useSnapshot} from "valtio";
import {hospitalSorter, stateSorter, vaxRegistrationProcessor} from "../library/dataProcessor";
import color from "../library/color";
import {Graph} from "../components/Graph";
import useOnScreen from "../library/useOnScreen";
import {GraphSinglePage} from "../components/GraphSinglePage";
import {GraphFilter} from "../components/GraphFilter";
import Loader from "../components/Loader";

export default function States({
                                 stateVaccination,
                                 stateCases,
                                 stateDeaths,
                                 hospitalData,
                                 icuData,
    stateRegistration
                             }
) {

    const snap = useSnapshot(globalState)
    const { singleGraphName } = snap

    useEffect(() => {
        globalState.stateVax = stateSorter(stateVaccination.data, true)
        globalState.stateCases = stateSorter(stateCases.data, false, 'cases')
        globalState.stateDeaths = stateSorter(stateDeaths.data,false, 'deaths')
        globalState.stateHospital = hospitalSorter(hospitalData.data, false)
        globalState.stateIcu = hospitalSorter(icuData.data, true)
        globalState.stateRegistration = vaxRegistrationProcessor(stateRegistration.data)


    }, [stateVaccination,
        stateCases,
        stateDeaths,
        hospitalData,
        icuData,
        stateRegistration
    ])

    const DummyComponent = () => {

        const ref = useRef()
        const isVisible = useOnScreen(ref)

        return <div ref={ref}> {!isVisible && <Loader/>}</div>
    }

    return (
        <>
            <Head>
                <title>KKM tracker</title>
                <meta name={'keywords'} content={'covid tracker , dashboard'}/>
            </Head>
            <DummyComponent />

            { Object.keys(snap.stateVax).length > 0 && !singleGraphName &&
            <div className={"grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 md:gap-x-10 xl-grid-cols-4 gap-y-10 gap-x-6"}>
                {stateArray.map((state) => (
                    <Graph key={state} stateName={state} />
                ))}
            </div>
            }
            {
                singleGraphName &&
                    <div>
                        <GraphSinglePage isNational={false} stateName={singleGraphName}/>
                        <GraphFilter isNational={false}/>
                    </div>
            }
            {singleGraphName &&
            <button
                className="bg-green-500 bg-opacity-80 hover:bg-green-800 transition duration-300 text-white font-bold py-1 px-4 rounded w-1/6"
                onClick={() => globalState.singleGraphName = ''}
            >
                Close
            </button>
            }
        </>
    )
}

export const getStaticProps = async () => {
    try {
        // vaccination data
        const dataVaxState = await getApi(`${citfBaseUrl}/vaccination/vax_state.csv`)
        const stateVaccination = readString(dataVaxState, {header: true})

        // registration data
        const dataVaxRegState = await getApi(`${citfBaseUrl}/registration/vaxreg_state.csv`)
        const stateRegistration = readString(dataVaxRegState, {header: true})

        // cases data
        const stateCasesData = await getApi(`${kkmBaseUrl}/cases_state.csv`)
        const stateCases = readString(stateCasesData, {header: true})

        // deaths data
        const stateDeathsData = await getApi(`${kkmBaseUrl}/deaths_state.csv`)
        const stateDeaths = readString(stateDeathsData, {header: true})

        // hospital and icu data
        const hospitalDataRaw = await getApi(`${kkmBaseUrl}/hospital.csv`)
        const icuDataRaw = await getApi(`${kkmBaseUrl}/icu.csv`)

        const hospitalData = readString(hospitalDataRaw, {header: true})
        const icuData = readString(icuDataRaw, {header: true})


        return {
            props : {
                stateVaccination,
                stateCases,
                stateDeaths,
                hospitalData,
                icuData,
                stateRegistration
            }
        }
    } catch {
        return { notFound: true}
    }
}