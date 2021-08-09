import {CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {globalState, StateName} from "../library/globalState";
import {format, parseISO} from "date-fns";
import color from "../library/color";
import {useSnapshot} from "valtio";
import {CustomTooltip} from "./GraphNational";
import {forwardRef} from "react";
import Link from 'next/link'
import {useRouter} from "next/router";

export const Graph = ({stateName}) => {
    const snap = useSnapshot(globalState)
    const router = useRouter()

    return (
        <div className={"container mx-auto shadow-lg rounded-lg w-auto"}>
                <LineChart width={530} height={250} margin={{top: 25, right: 30, left: 20, bottom: 5}} data={snap.stateVax[stateName]}>
                    <XAxis
                        dataKey="date"
                        allowDuplicatedCategory={false}
                        axisLine={false}
                        tickLine={false}
                        interval={0}
                        tickSize={6}
                        tickFormatter={(str) => {
                            const date = parseISO(str);
                            if (date.getDate() % 28 === 0) {
                                const newDate = format(date, "MMM")
                                return newDate;
                            }
                            return "";
                        }}
                    />
                    <YAxis
                        yAxisId={1}
                        tickCount={5}
                        tickFormatter={(str) => `${str}%`}
                    />

                    <CartesianGrid opacity={0.5} vertical={false}/>
                    <Tooltip content={<CustomTooltip/>}/>
                    <Legend/>

                    {stateName === 'W.P. Putrajaya' && <Line dot={false} yAxisId={1} data={snap.stateDeaths[stateName]} type="monotone"
                           dataKey='new_deaths' stroke={color.background} activeDot={{r: 8}}/>}
                    <Line dot={false} yAxisId={1} data={snap.stateHospital[stateName]} type="monotone"
                          dataKey='Covid hospitalisation' stroke={color.black} activeDot={{r: 8}}/>
                    <Line dot={false} yAxisId={1} data={snap.stateIcu[stateName]} type="monotone"
                          dataKey='Covid ICU' stroke={color.red} activeDot={{r: 8}}/>
                    <Line dot={false} yAxisId={1} data={snap.stateVax[stateName]} type="monotone" dataKey="Dose 1 total"
                          stroke="#8884d8" activeDot={{r: 8}}/>
                    <Line dot={false} yAxisId={1} data={snap.stateVax[stateName]} type="monotone" dataKey="Dose 2 total"
                          stroke={color.primary} activeDot={{r: 8}}/>

                </LineChart>
            <div className={'flex flex-row-reverse m-2'}>

            <button
                className="bg-green-500 bg-opacity-80 hover:bg-green-800 transition duration-300 text-white font-bold py-1 px-4 rounded w-1/6"
                onClick={() => router.push('/about')}
            >
                Detail
            </button>
                <p className={'text-center w-5/6 ml-20 mt-1'}>{stateName}</p>
            </div>
        </div>
    )
}