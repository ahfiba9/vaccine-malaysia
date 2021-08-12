import {getApi} from "../axios";
import {server} from "../../config";
import useSWR from "swr";
import {hospitalSorter} from "../dataProcessor";

export const useHospitalApi = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { data, error } = useSWR(`${server}/api/states/hospital_data`, getApi)

    return {
        hospitalData: data,
        isLoadingHospitalData: !error && !data,
        isErrorHospitalData: error
    }
}