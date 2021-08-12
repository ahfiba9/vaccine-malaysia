import {getApi} from "../axios";
import {server} from "../../config";
import useSWR from "swr";
import {API_NAME} from "../globalState";
import {malaysiaSorter, stateSorter} from "../dataProcessor";

export const useCasesApi = (name) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { data, error } = useSWR(`${server}/api/${name}/new_cases`, getApi)

    return {
        newCasesData : data,
        isLoadingCasesData: !error && !data,
        isErrorCasesData: error
    }
}