import {getApi} from "../axios";
import {server} from "../../config";
import useSWR from "swr";
import {API_NAME} from "../globalState";
import {malaysiaSorter, stateSorter} from "../dataProcessor";

export const useDeathsApi = (name) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { data, error } = useSWR(`${server}/api/${name}/new_deaths`, getApi)

    return {
        newDeathsData: data,
        isLoadingDeathsData: !error && !data,
        isErrorDeathsData: error
    }
}