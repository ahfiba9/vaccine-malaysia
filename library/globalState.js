import {proxy, subscribe} from "valtio";

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

export const API_NAME = {
    NATIONAL: 'national',
    STATES: 'states'
}

export const malaysiaPopulation = {
    'Johor':{
        total: 3781000,
        adult: 2711900,
        elderly: 428700
    },
    'Kedah':{
        total: 2185100,
        adult: 1540600,
        elderly: 272500
    },
    'Kelantan':{
        total: 1906700,
        adult: 1236200,
        elderly: 194100
    },
    'Melaka':{
        total: 932700,
        adult: 677400,
        elderly: 118500
    },
    'Negeri Sembilan':{
        total: 1128800,
        adult: 814400,
        elderly: 145000
    },
    'Pahang':{
        total: 1678700,
        adult: 1175800,
        elderly: 190200
    },
    'Perak':{
        total: 2510300,
        adult: 1862700,
        elderly: 397300
    },
    'Perlis':{
        total: 254900,
        adult: 181200,
        elderly: 35100
    },
    'Pulau Pinang':{
        total: 1773600,
        adult: 1367200,
        elderly: 239200
    },
    'Penang':{
        total: 1773600,
        adult: 1367200,
        elderly: 239200
    },
    'Sabah':{
        total: 3908500,
        adult: 2758400,
        elderly: 238900
    },
    'Selangor':{
        total: 6538000,
        adult: 4747900,
        elderly: 575800
    },
    'Sarawak':{
        total: 2816500,
        adult: 2042700,
        elderly: 332800
    },
    'Terengganu':{
        total: 1259300,
        adult: 808400,
        elderly: 115200
    },
    'W.P. Kuala Lumpur':{
        total: 1773700,
        adult: 1348600,
        elderly: 205800
    },
    'W.P. Labuan':{
        total: 99600,
        adult: 68500,
        elderly: 7900
    },
    'W.P. Putrajaya':{
        total: 110000,
        adult: 67700,
        elderly: 5000
    },
    Malaysia: {
        total: 32657400,
        adult: 23409600,
        elderly: 3502000
    }
}

export const globalState = proxy ({
    stateVax: {},
    nationalVax: [],
    nationalCases: [],
    stateCases: {},
    nationalDeath: [],
    nationalIcu: [],
    nationalHospital: [],
    nationalRegistration: [],
    stateRegistration: {},
    stateDeaths: {},
    stateIcu: {},
    stateHospital: {},
    isShowGraphLine: {
        national: {
            casesNew: true,
            totalReg: false,
            elderlyReg: false,
            above18Reg: false,
            under18Reg: false,
            deathsNew: false,
            dose1: true,
            dose2: true
        },
        state: {
            casesNew: true,
            totalReg: false,
            elderlyReg: false,
            above18Reg: false,
            under18Reg: false,
            deathsNew: false,
            dose1: true,
            dose2: true,
            covidHosp: false,
            nonCovidHosp: false,
            totalHosp: false,
            covidIcu: false,
            nonCovidIcu: false,
            icuUsage: false,
            covidVentilator: false,
            nonCovidVentilator: false,
            ventilatorUsage: false
        },
    },
    singleGraphName: '',
    isStatesGraphLoading: false,

})