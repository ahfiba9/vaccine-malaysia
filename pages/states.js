import Head from 'next/head'

import {getApi} from "../library/axios";
import {readString} from "react-papaparse";
import {citfBaseUrl, kkmBaseUrl} from "../config";
import {useEffect} from "react";
import {globalState, stateArray } from "../library/globalState";
import {useSnapshot} from "valtio";
import {hospitalSorter, stateSorter, vaxRegistrationProcessor} from "../library/dataProcessor";
import {Graph} from "../components/Graph";
import {GraphSinglePage} from "../components/GraphSinglePage";
import {GraphFilter} from "../components/GraphFilter";
import LoaderComponent from "../components/LoaderChecker";

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


    return (
        <>
            <Head>
                <title>Covid In Malaysia&apos;s State</title>
                <meta name={'keywords'} content={'covid tracker , vaccine tracker, CITF, KKM, MOH, ICU, Hospital, ventilator'}/>
            </Head>
            <LoaderComponent />

            { Object.keys(snap.stateVax).length > 0 && !singleGraphName &&
            <div className={"grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 md:gap-x-10 xl-grid-cols-4 gap-y-10 gap-x-6"}>
                {stateArray.map((state) => (
                    <Graph key={state} stateName={state} />
                ))}
            </div>
            }
            {
                singleGraphName &&
                    <>
                <div>
                    <h1 className={'text-2xl text-green-500 text-center '}>
                        <span>{singleGraphName}</span>
                    </h1>
                    <GraphSinglePage isNational={false} stateName={singleGraphName}/>
                    <GraphFilter isNational={false}/>
                </div>
                <div className={'flex justify-center'}>
                    <button
                        className="justify-items-center bg-green-500 bg-opacity-80 hover:bg-green-800 transition duration-300 text-white font-bold py-1 px-4 rounded w-1/6"
                        onClick={() => {
                            globalState.singleGraphName = ''
                        }}
                    >
                        Close
                    </button>
                </div>
                    </>
            }
            <div className={'flex justify-center mt-5'}>
                <LoaderComponent/>
            </div>
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