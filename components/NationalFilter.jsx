import {useSnapshot} from "valtio";
import {globalState} from "../library/globalState";

export const NationalFilter = () => {
    const snap = useSnapshot(globalState)

    const {casesNew, totalReg, elderlyReg, above18Reg, under18Reg, deathsNew, dose1, dose2 } = snap.isShowLineNational

    const changeValue = (state) => {
        globalState.isShowLineNational[state] = !snap.isShowLineNational[state]
    }

    return (
        <div className="bg-gray-200 p-5">
            <div className="flex flex-col items-center justify-center">
                <div className="grid grid-cols-1 gap-1 md:grid-cols-3">
                    <label className="inline-flex items-center mt-3">
                        <input
                            type="radio"
                            className="form-radio h-4 w-4 text-gray-600"
                            checked={casesNew}
                            onClick={() => changeValue('casesNew')}
                            onChange={()=>{}}
                            onChange={()=>{}}
                        /><span
                            className="ml-2 text-gray-700 text-sm">New Cases</span>
                    </label>

                    <label className="inline-flex items-center mt-3">
                        <input
                            type="radio"
                            onChange={()=>{}}
                            className="form-radio h-4 w-4 text-red-600"
                            checked={totalReg}
                            onClick={() => changeValue('totalReg')}/><span
                            className="ml-2 text-gray-700 text-sm">Total Registration</span>
                    </label>

                    <label className="inline-flex items-center mt-3">
                        <input
                            type="radio"
                            onChange={()=>{}}
                            className="form-radio h-4 w-4 text-orange-600"
                            checked={elderlyReg}
                            onClick={() => changeValue('elderlyReg')}
                        /><span
                            className="ml-2 text-gray-700 text-sm">Above 60 Registration</span>
                    </label>

                    <label className="inline-flex items-center mt-3">
                        <input
                            type="radio"
                            onChange={()=>{}}
                            className="form-radio h-4 w-4 text-yellow-600"
                            checked={above18Reg}
                            onClick={() => changeValue('above18Reg')}
                        /><span
                            className="ml-2 text-gray-700 text-sm">Above 18 Registration</span>
                    </label>

                    <label className="inline-flex items-center mt-3">
                        <input
                            type="radio"
                            onChange={()=>{}}
                            className="form-radio h-4 w-4 text-green-600"
                            checked={under18Reg}
                            onClick={() => changeValue('under18Reg')}
                        /><span
                            className="ml-2 text-gray-700 text-sm">Under 18 Registration</span>
                    </label>

                    <label className="inline-flex items-center mt-3">
                        <input
                            type="radio"
                            onChange={()=>{}}
                            className="form-radio h-4 w-4 text-teal-600"
                            checked={dose1}
                            onClick={() => changeValue('dose1')}
                        /><span
                            className="ml-2 text-gray-700 text-sm">Dose 1</span>
                    </label>

                    <label className="inline-flex items-center mt-3">
                        <input
                            type="radio"
                            onChange={()=>{}}
                            className="form-radio h-4 w-4 text-blue-600"
                            checked={dose2}
                            onClick={() => changeValue('dose2')}
                        /><span
                            className="ml-2 text-gray-700 text-sm">Dose 2</span>
                    </label>

                    <label className="inline-flex items-center mt-3">
                        <input
                            type="radio"
                            onChange={()=>{}}
                            className="form-radio h-4 w-4 text-indigo-600"
                            checked={deathsNew}
                            onClick={() => changeValue('deathsNew')}
                        /><span
                            className="ml-2 text-gray-700 text-sm">Death Daily</span>
                    </label>

                </div>
            </div>
        </div>
    )
}