import {CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {globalState, StateName} from "../library/globalState";
import {format, parseISO} from "date-fns";
import color from "../library/color";
import {useSnapshot} from "valtio";

function CustomTooltip({ active, payload, label }) {
    if (active) {
        return (
            <div className="tooltip">
                <h4>{format(parseISO(label), "eeee, d MMM, yyyy")}</h4>
                {payload.map( item => {
                    let text

                    if (typeof (item.value) === 'string') {
                        text = item.value
                    } else {
                        text = item.value.toFixed(2) + '%'
                    }

                    return (
                        <>
                            <p key={item.name}>{item.name}: {text}</p>
                        </>

                    )
                })}

            </div>
        );
    }
    return null;
}

export const Graph = ({stateName}) => {
    const snap = useSnapshot(globalState)

    console.log('state name = ', stateName)

    return (
        <>
            <p>{stateName}</p>

            <ResponsiveContainer width={800} height={400}>
                <LineChart margin={{top: 5, right: 30, left: 20, bottom: 5}} data={snap.stateVax[stateName]}>
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
                        // tickCount={5}
                    />
                    <YAxis yAxisId={1} tickCount={5}/>
                    <YAxis yAxisId={2} domain={[0, 10000]} orientation={'right'}/>
                    <CartesianGrid opacity={0.5} vertical={false}/>
                    <Tooltip content={<CustomTooltip/>}/>
                    <Legend/>
                    <Line dot={false} yAxisId={2} data={snap.stateCases[stateName]} type="monotone" dataKey='cases_new'
                          stroke={color.gray} activeDot={{r: 8}}/>
                    {/*<Line dot={false} yAxisId={1} data={snap.stateHospital[stateName]} type="monotone" dataKey='Total hospitalisation' stroke={color.red} activeDot={{r: 8}}/>*/}
                    <Line dot={false} yAxisId={1} data={snap.stateHospital[stateName]} type="monotone"
                          dataKey='Covid hospitalisation' stroke={color.black} activeDot={{r: 8}}/>
                    <Line dot={false} yAxisId={1} data={snap.stateIcu[stateName]} type="monotone"
                          dataKey='Covid ICU' stroke={color.red} activeDot={{r: 8}}/>
                    <Line dot={false} yAxisId={1} data={snap.stateIcu[stateName]} type="monotone"
                          dataKey='ICU Usage' stroke={color.grey} activeDot={{r: 8}}/>
                    {/*<Line dot={false} yAxisId={1} data={snap.stateHospital[stateName]} type="monotone" dataKey='Non-Covid hospitalisation' stroke={color.subscriptionYellow} activeDot={{r: 8}}/>*/}



                    <Line dot={false} yAxisId={1} data={snap.stateVax[stateName]} type="monotone" dataKey="Dose 1 total"
                          stroke="#8884d8" activeDot={{r: 8}}/>
                    <Line dot={false} yAxisId={1} data={snap.stateVax[stateName]} type="monotone" dataKey="Dose 2 total"
                          stroke={color.primary} activeDot={{r: 8}}/>
                </LineChart>
            </ResponsiveContainer>
        </>
    )
}