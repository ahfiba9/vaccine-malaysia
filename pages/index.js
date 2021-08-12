import Head from 'next/head'

import {getApi} from "../library/axios";
import {readString} from "react-papaparse";
import {citfBaseUrl, kkmBaseUrl} from "../config";
import {useEffect} from "react";
import {API_NAME, globalState} from "../library/globalState";
import {useSnapshot} from "valtio";
import {malaysiaSorter, vaxRegistrationProcessor} from "../library/dataProcessor";
import {GraphSinglePage} from "../components/GraphSinglePage";
import {GraphFilter} from "../components/GraphFilter";
import LoaderComponent from "../components/LoaderChecker";
import {LatestData} from "../components/LatestData";
import { useVaccinationApi} from "../library/customHooks/useVaccinationApi";
import {useCasesApi} from "../library/customHooks/useCasesApi";
import {useDeathsApi} from "../library/customHooks/useDeathsApi";
import {useRegistrationApi} from "../library/customHooks/useRegistrationApi";
import Loader from "../components/Loader";

export default function Home() {

    const snap = useSnapshot(globalState)

    const {nationalVax, nationalCases, nationalDeath, nationalRegistration} = snap

    const { vaccinationData, isLoadingVaccinationData, isErrorVaccinationData } = useVaccinationApi(API_NAME.NATIONAL)
    const { newCasesData, isLoadingCasesData, isErrorCasesData } = useCasesApi(API_NAME.NATIONAL)
    const { newDeathsData, isLoadingDeathsData, isErrorDeathsData } = useDeathsApi(API_NAME.NATIONAL)
    const { registrationData, isLoadingRegistrationData, isErrorRegistrationData } = useRegistrationApi(API_NAME.NATIONAL)

    useEffect(() => {

        globalState.nationalVax = vaccinationData
        globalState.nationalCases = newCasesData
        globalState.nationalDeath = newDeathsData
        globalState.nationalRegistration = registrationData

    }, [vaccinationData, newCasesData, newDeathsData, registrationData])

    const showGraph = nationalDeath && nationalVax && nationalRegistration && nationalCases


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
        {!showGraph && <div className={`flex justify-center py-10`}> <Loader/></div>}
        {showGraph && snap.nationalCases.length > 0 && <LatestData/>}
        { showGraph && snap.nationalCases.length > 0 &&
                <GraphSinglePage isNational={true}/>
        }
        <GraphFilter isNational={true}/>
    </>
  )
}