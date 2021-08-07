import axios from "axios";

export const getApi = async (url) => {

    const { data } = await axios.get(url)

    return data
}