import {malaysiaPopulation, stateArray, StateName} from "./globalState";
import { startVaccineYear} from "../config";
import {format, parseISO} from "date-fns";

export const stateSorter = (data, addPercentage = false) => {
    const sortedData = {
        'Johor': [],
        'Kedah': [],
        'Kelantan': [],
        'Melaka': [],
        'Negeri Sembilan': [],
        'Pahang': [],
        'Perak': [],
        'Perlis': [],
        'Pulau Pinang': [],
        'Sabah': [],
        'Sarawak': [],
        'Selangor': [],
        'Terengganu': [],
        'W.P. Kuala Lumpur': [],
        'W.P. Labuan': [],
        'W.P. Putrajaya': [],
    }

    const dataLength = data.length

    //iterate the data and move it to each state
    let i = 0
    while (i < dataLength) {

        const currentData = data[i]

        const year = yearProcessor(currentData.date)
        const addToRecord = year === startVaccineYear

        const foundState = stateArray.find(state => state === currentData.state)

        if (!foundState) break

        const populationData = malaysiaPopulation[foundState]
        const validPopulation = populationData.adult + populationData.elderly

        let updatedData

        if (addToRecord) {
            // skip this for cases state
            if (addPercentage) {
                updatedData = {
                    ...currentData,
                    'Dose 1 total': parseInt(currentData.dose1_cumul) / validPopulation * 100,
                    'Dose 2 total': parseInt(currentData.dose2_cumul) / validPopulation * 100,
                    'Combined total': parseInt(currentData.total_cumul) / validPopulation * 100,
                }
            } else {
                updatedData = {...currentData}
            }

            if (foundState) {
                sortedData[foundState].push(updatedData)
            } else {
                console.log(i, ' = ', updatedData)
            }
        } else {
            //dont add to record
        }
        ++i
    }

    return sortedData
}

const yearProcessor = (str) => {
    const date = parseISO(str);
    return date.getFullYear()
}

export const hospitalSorter = (data, isIcu = false) => {
    const sortedData = {
        'Johor': [],
        'Kedah': [],
        'Kelantan': [],
        'Melaka': [],
        'Negeri Sembilan': [],
        'Pahang': [],
        'Perak': [],
        'Perlis': [],
        'Pulau Pinang': [],
        'Sabah': [],
        'Sarawak': [],
        'Selangor': [],
        'Terengganu': [],
        'W.P. Kuala Lumpur': [],
        'W.P. Labuan': [],
        'W.P. Putrajaya': [],
    }

    const dataLength = data.length

    //iterate the data and move it to each state
    let i = 0
    while (i < dataLength) {

        const currentData = data[i]

        const foundState = stateArray.find(state => state === currentData.state)

        const year = yearProcessor(currentData.date)
        const addToRecord = year === startVaccineYear


        if (!foundState) break

        let updatedData

        if (addToRecord) {
            if (isIcu) {
                // do something
                const icuCovidAndPui = parseInt(currentData.icu_covid) + parseInt(currentData.icu_pui)
                const icuCovidPuiPercentage = icuCovidAndPui / parseInt(currentData.bed_icu_total) * 100
                const icuNonCovidPercentage = parseInt(currentData.icu_noncovid) / parseInt(currentData.bed_icu_total) * 100
                const icuUsagePercentage = (icuCovidAndPui + parseInt(currentData.icu_noncovid)) / parseInt(currentData.bed_icu_total) * 100

                const ventTotal = parseInt(currentData.vent) + parseInt(currentData.vent_port)
                const ventCovidAndPui = parseInt(currentData.vent_covid) + parseInt(currentData.vent_pui)
                const ventCovidPuiPercentage = (ventCovidAndPui / ventTotal) * 100
                const ventNonCovidPercentage = parseInt(currentData.vent_noncovid) / ventTotal * 100
                const ventUsagePercentage = (ventCovidAndPui + parseInt(currentData.vent_noncovid)) / ventTotal * 100

                updatedData = {
                    ...currentData,
                    icuCovidPuiPercentage,
                    icuNonCovidPercentage,
                    icuUsagePercentage,
                    ventCovidPuiPercentage,
                    ventNonCovidPercentage,
                    ventUsagePercentage
                }
            } else {
                const hospCovidAndPui = parseInt(currentData.hosp_covid) + parseInt(currentData.hosp_pui)
                const hospTotal = hospCovidAndPui + parseInt(currentData.hosp_noncovid)
                const hospTotalBedNonCrit = parseInt(currentData.beds_noncrit)

                const hospCovidAndPuiPercentage = hospCovidAndPui / hospTotalBedNonCrit * 100
                const hospNonCovidPercentage = parseInt(currentData.hosp_noncovid) / hospTotalBedNonCrit * 100
                const hospTotalPercentage = hospTotal / hospTotalBedNonCrit * 100

                updatedData = {
                    ...currentData,
                    'Covid hospitalisation': hospCovidAndPuiPercentage,
                    'Non-Covid hospitalisation': hospNonCovidPercentage,
                    'Total hospitalisation' : hospTotalPercentage
                }
            }


            if (foundState) {
                sortedData[foundState].push(updatedData)
            } else {
                console.log(i,' = ', updatedData)
            }

        } else {
            // dont add to global state
        }

        ++i
    }

    return sortedData
}