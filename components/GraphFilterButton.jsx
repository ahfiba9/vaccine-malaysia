import {useSnapshot} from "valtio";
import {globalState} from "../library/globalState";

const filterButtonName = {
    casesNew: 'Daily Cases',
    totalReg: 'Total Registration',
    above18Reg: 'Above 18 Registration',
    under18Reg: 'Under 18 Registration',
    elderlyReg: 'Elderly Registration',
    dose1: 'Dose 1',
    dose2: 'Dose 2',
    deathsNew: 'Daily Deaths',
    covidHosp: 'Covid Cases in Hospital',
    nonCovidHosp: 'Non-Covid Cases in Hospital',
    totalHosp: 'Total in Hospital',
    covidIcu: 'Covid Cases in ICU',
    nonCovidIcu: 'Non-Covid in ICU',
    icuUsage: 'ICU Usage',
    covidVentilator: 'Covid Cases on Ventilator',
    nonCovidVentilator: 'Non-Covid Cases on Ventilator',
    ventilatorUsage: 'Ventilator Usage'
}

export const GraphFilterButton = ({graphType, buttonName, changeValue, relatedButtonName}) => {
    const snap = useSnapshot(globalState)
    const buttonState = snap.isShowGraphLine[graphType][buttonName]

    return (
        <label className="inline-flex items-center mt-3">
            <input
                type="radio"
                onChange={()=>{}}
                className="form-radio h-4 w-4 text-indigo-600"
                checked={buttonState}
                onClick={() => changeValue(buttonName, relatedButtonName)}
            /><span
            className="ml-2 text-gray-700 text-sm">{filterButtonName[buttonName]}</span>
        </label>
    )
}