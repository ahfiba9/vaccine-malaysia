import {getApi} from "../axios";
import {server} from "../../config";
import useSWR from "swr";
import {API_NAME} from "../globalState";
import {malaysiaSorter, stateSorter} from "../dataProcessor";

export const useVaccinationApi = (name) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { data, error } = useSWR(`${server}/api/${name}/vaccination_data`, getApi)

    return {
        vaccinationData: data,
        isLoadingVaccinationData: !error && !data,
        isErrorVaccinationData: error
    }
}