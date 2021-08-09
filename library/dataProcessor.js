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

        const stateName = currentData.state

        if (!stateName) break

        const populationData = malaysiaPopulation[stateName]
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

            if (stateName) {
                sortedData[stateName].push(updatedData)
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

export const hospitalSorter = (data, isIcu) => {
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

        const stateName = currentData.state
        if (!stateName) break

        const year = yearProcessor(currentData.date)
        const addToRecord = year === startVaccineYear

        let updatedData

        if (addToRecord) {
            if (isIcu) {
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
                    'Covid ICU': icuCovidPuiPercentage,
                    'Non-Covid ICU': icuNonCovidPercentage,
                    'ICU Usage': icuUsagePercentage,
                    'Covid Ventilator': ventCovidPuiPercentage,
                    'Non-Covid Ventilator': ventNonCovidPercentage,
                    'Ventilator Usage': ventUsagePercentage
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

            if (stateName) {
                sortedData[stateName].push(updatedData)
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

export const vaxRegistrationProcessor = (data, isNational = false) => {
    const sortedDataNational = []
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
        const stateName = currentData.state

        if (!stateName) break

        const populationData = malaysiaPopulation[stateName]

        // console.log('state = ', stateName)
        // console.log('population data = ', populationData)

        const populationAbove18 = populationData.adult + populationData.elderly
        const populationUnder18 = populationData.total - populationAbove18

        const dataTotal = parseInt(currentData.total)
        const dataUnder18 = parseInt(currentData.children)
        const dataElderly = parseInt(currentData.elderly)
        const dataAbove18 = dataTotal - dataUnder18


        let updatedData

        const totalPercentage = dataTotal / populationData.total * 100
        const elderlyPercentage = dataElderly / populationData.elderly * 100
        const above18Percentage = dataAbove18 / populationAbove18 * 100
        const under18Percentage = dataUnder18 / populationUnder18 * 100

        updatedData = {
            ...currentData,
            'Total Reg': totalPercentage,
            'Elderly Reg': elderlyPercentage,
            'Above 18 Reg': above18Percentage,
            'Under 18 Reg': under18Percentage,
        }

        if (stateName === 'Malaysia') {
            sortedDataNational.push(updatedData)
        } else {
            sortedData[stateName].push(updatedData)
        }

        ++i
    }

    if (isNational) {
        return sortedDataNational
    } else {
        return sortedData
    }
}

export const malaysiaSorter = (data, isAddPercentage=true, name) => {
    const sortedDataNational = []

    const dataLength = data.length

    //iterate the data and move it to each state
    let i = 0
    while (i < dataLength) {

        const currentData = data[i]

        if (!currentData.date) break

        const year = yearProcessor(currentData.date)
        const addToRecord = year === startVaccineYear

        let updatedData
        if (isAddPercentage) {
            const populationData = malaysiaPopulation["Malaysia"].total

            const dataDose1 = parseInt(currentData.dose1_cumul)
            const dataDose2 = parseInt(currentData.dose2_cumul)

            const dose1Percentage = dataDose1 / populationData * 100
            const dose2Percentage = dataDose2 / populationData * 100


            updatedData = {
                ...currentData,
                'Dose 1': dose1Percentage,
                'Dose 2': dose2Percentage,
            }
        } else {
            if (addToRecord) {
                updatedData = {...currentData}
            }
        }

        if (addToRecord) {
            sortedDataNational.push(updatedData)
        }

        ++i
    }
        return sortedDataNational
}