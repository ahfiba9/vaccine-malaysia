import Head from 'next/head'

import {useEffect} from "react";
import {API_NAME, globalState, stateArray} from "../library/globalState";
import {useSnapshot} from "valtio";
import {Graph} from "../components/Graph";
import {GraphSinglePage} from "../components/GraphSinglePage";
import {GraphFilter} from "../components/GraphFilter";
import LoaderComponent from "../components/LoaderChecker";
import {useVaccinationApi} from "../library/customHooks/useVaccinationApi";
import {useCasesApi} from "../library/customHooks/useCasesApi";
import {useDeathsApi} from "../library/customHooks/useDeathsApi";
import {useRegistrationApi} from "../library/customHooks/useRegistrationApi";
import {useHospitalApi} from "../library/customHooks/useHospitalApi";
import {useIcuApi} from "../library/customHooks/useIcuApi";
import Loader from "../components/Loader";

export default function States() {

    const snap = useSnapshot(globalState)
    const { singleGraphName, stateVax, stateCases, stateDeaths, stateHospital, stateIcu, stateRegistration } = snap

    const { vaccinationData, isLoadingVaccinationData, isErrorVaccinationData } = useVaccinationApi(API_NAME.STATES)
    const { newCasesData, isLoadingCasesData, isErrorCasesData } = useCasesApi(API_NAME.STATES)
    const { newDeathsData, isLoadingDeathsData, isErrorDeathsData } = useDeathsApi(API_NAME.STATES)
    const { registrationData, isLoadingRegistrationData, isErrorRegistrationData } = useRegistrationApi(API_NAME.STATES)
    const { hospitalData, isLoadingHospitalData, isErrorHospitalData } = useHospitalApi()
    const { icuData, isLoadingIcuData, isErrorIcuData } = useIcuApi()


    useEffect(() => {
        globalState.stateVax = vaccinationData
        globalState.stateCases = newCasesData
        globalState.stateDeaths = newDeathsData
        globalState.stateHospital = hospitalData
        globalState.stateIcu = icuData
        globalState.stateRegistration = registrationData


    }, [hospitalData, icuData, newCasesData, newDeathsData, registrationData, vaccinationData])

    const showGraph = !!stateVax && stateCases && stateDeaths && stateHospital && stateIcu && stateRegistration

    return (
        <>
            <Head>
                <title>Covid In Malaysia&apos;s State</title>
                <meta name={'keywords'} content={'covid tracker , vaccine tracker, CITF, KKM, MOH, ICU, Hospital, ventilator'}/>
            </Head>
            <LoaderComponent />
            {!showGraph && <div className={`flex justify-center py-10`}> <Loader/></div>}

            { showGraph && Object.keys(snap.stateVax).length > 0 && !singleGraphName &&
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
                        Back to States List
                    </button>
                </div>
                    </>
            }
        </>
    )
}