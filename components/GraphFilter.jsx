import {useSnapshot} from "valtio";
import {globalState} from "../library/globalState";
import {GraphFilterButton} from "./GraphFilterButton";

export const GraphFilter = ({isNational}) => {
    const snap = useSnapshot(globalState)

    const graphType = isNational ? 'national' : 'state'

    const changeValue = (state, relatedState) => {
        globalState.isShowGraphLine[graphType][state] = !snap.isShowGraphLine[graphType][state]

        if (relatedState && snap.isShowGraphLine[graphType][relatedState] ) {
            globalState.isShowGraphLine[graphType][relatedState] = false
        }
    }

    const gridStyle = isNational ? 'grid grid-cols-1 gap-1 md:grid-cols-3' : 'grid grid-cols-1 gap-1 md:grid-cols-4'

    return (
        <div className="bg-gray-200 p-5 mt-5 rounded-lg">
            <div className="flex flex-col items-center justify-center">
                <div className={gridStyle}>
                    <GraphFilterButton
                        graphType={graphType}
                        buttonName={'casesNew'}
                        changeValue={changeValue}
                        relatedButtonName={'deathsNew'}
                    />
                    <GraphFilterButton
                        graphType={graphType}
                        buttonName={'totalReg'}
                        changeValue={changeValue}
                    />
                    <GraphFilterButton
                        graphType={graphType}
                        buttonName={'elderlyReg'}
                        changeValue={changeValue}
                    />
                    <GraphFilterButton
                        graphType={graphType}
                        buttonName={'above18Reg'}
                        changeValue={changeValue}
                    />
                    <GraphFilterButton
                        graphType={graphType}
                        buttonName={'under18Reg'}
                        changeValue={changeValue}
                    />
                    <GraphFilterButton
                        graphType={graphType}
                        buttonName={'dose1'}
                        changeValue={changeValue}
                    />
                    <GraphFilterButton
                        graphType={graphType}
                        buttonName={'dose2'}
                        changeValue={changeValue}
                    />
                    <GraphFilterButton
                        graphType={graphType}
                        buttonName={'deathsNew'}
                        changeValue={changeValue}
                        relatedButtonName={'casesNew'}
                    />

                    {!isNational && <GraphFilterButton
                        graphType={graphType}
                        buttonName={'covidHosp'}
                        changeValue={changeValue}
                    />}
                    {!isNational && <GraphFilterButton
                        graphType={graphType}
                        buttonName={'nonCovidHosp'}
                        changeValue={changeValue}
                    />}
                    {!isNational && <GraphFilterButton
                        graphType={graphType}
                        buttonName={'totalHosp'}
                        changeValue={changeValue}
                    />}
                    {!isNational && <GraphFilterButton
                        graphType={graphType}
                        buttonName={'covidIcu'}
                        changeValue={changeValue}
                    />}
                    {!isNational && <GraphFilterButton
                        graphType={graphType}
                        buttonName={'nonCovidIcu'}
                        changeValue={changeValue}
                    />}
                    {!isNational && <GraphFilterButton
                        graphType={graphType}
                        buttonName={'icuUsage'}
                        changeValue={changeValue}
                    />}
                    {!isNational && <GraphFilterButton
                        graphType={graphType}
                        buttonName={'covidVentilator'}
                        changeValue={changeValue}
                    />}
                    {!isNational && <GraphFilterButton
                        graphType={graphType}
                        buttonName={'nonCovidVentilator'}
                        changeValue={changeValue}
                    />}
                    {!isNational && <GraphFilterButton
                        graphType={graphType}
                        buttonName={'ventilatorUsage'}
                        changeValue={changeValue}
                    />}

                </div>
            </div>
        </div>
    )
}