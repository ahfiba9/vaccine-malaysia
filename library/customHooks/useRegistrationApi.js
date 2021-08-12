import {getApi} from "../axios";
import {server} from "../../config";
import useSWR from "swr";
import {API_NAME} from "../globalState";
import {malaysiaSorter, stateSorter, vaxRegistrationProcessor} from "../dataProcessor";

export const useRegistrationApi = (name) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { data, error } = useSWR(`${server}/api/${name}/registration`, getApi)

    return {
        registrationData: data,
        isLoadingRegistrationData: !error && !data,
        isErrorRegistrationData: error
    }
}