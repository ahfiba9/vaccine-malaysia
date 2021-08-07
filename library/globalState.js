import {proxy} from "valtio";

export const StateName = Object.freeze({
    JOHOR: 'Johor',
    KEDAH: 'Kedah',
    KELANTAN: 'Kelantan',
    MELAKA: 'Melaka',
    NEGERI_SEMBILAN: 'Negeri Sembilan',
    PAHANG: 'Pahang',
    PERAK: 'Perak',
    PERLIS: 'Perlis',
    PULAU_PINANG: 'Pulau Pinang',
    SABAH: 'Sabah',
    SARAWAK: 'Sarawak',
    SELANGOR: 'Selangor',
    TERENGGANU: 'Terengganu',
    KUALA_LUMPUR: 'W.P. Kuala Lumpur',
    LABUAN: 'W.P. Labuan',
    PUTRAJAYA: 'W.P. Putrajaya',
});


export const stateArray = [
    'Johor',
    'Kedah',
    'Kelantan',
    'Melaka',
    'Negeri Sembilan',
    'Pahang',
    'Perak',
    'Perlis',
    'Pulau Pinang',
    'Sabah',
    'Selangor',
    'Sarawak',
    'Terengganu',
    'W.P. Kuala Lumpur',
    'W.P. Labuan',
    'W.P. Putrajaya',
]

export const stateSorter = (data) => {
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

        if (foundState) {
            sortedData[foundState].push(currentData)
        } else {
            console.log(i,' = ', currentData)
        }

        ++i
    }

    return sortedData
}

export const globalState = proxy ({
    stateVax: [],
    nationalVax: [],
    separatedStateVax: {}
})