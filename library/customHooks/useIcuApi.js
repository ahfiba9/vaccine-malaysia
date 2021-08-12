import {getApi} from "../axios";
import {server} from "../../config";
import useSWR from "swr";
import {hospitalSorter} from "../dataProcessor";

export const useIcuApi = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { data, error } = useSWR(`${server}/api/states/icu_data`, getApi)

    return {
        icuData: data,
        isLoadingIcuData: !error && !data,
        isErrorIcuData: error
    }
}