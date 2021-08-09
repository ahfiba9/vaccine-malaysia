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

export const GraphNational = () => {
    const snap = useSnapshot(globalState)

    const {casesNew, totalReg, elderlyReg, above18Reg, under18Reg, deathsNew, dose1, dose2 } = snap.isShowLineNational

    const showPercentageLine = totalReg || elderlyReg || above18Reg || under18Reg || dose1 || dose2

    return (
        <ResponsiveContainer width={'100%'} aspect={1} className={'p-10'}>
            {/*<p className={'text-center'}>{'Malaysia'}</p>*/}
            <LineChart margin={{top: 15, right: 30, left: 20, bottom: 5}} data={snap.nationalRegistration}>
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
                {showPercentageLine ?
                    <YAxis
                        yAxisId={1}
                        tickCount={5}
                        axisLine={false}
                        tickFormatter={(str) => {
                            return `${str}%`
                        }}
                    /> : null}
                {casesNew ?
                    <YAxis
                        yAxisId={2}
                        domain={[0, 25000]}
                        orientation={'right'}
                        axisLine={false}
                        tickFormatter={(str) => {
                            return `${str} cases`
                        }}
                    /> : null}
                {deathsNew ?
                    <YAxis
                        yAxisId={3}
                        domain={[0, 500]}
                        orientation={'right'}
                        axisLine={false}
                        tickFormatter={(str) => {
                            return `${str} deaths`
                        }}
                    /> : null}
                <CartesianGrid opacity={0.5}/>
                <Tooltip content={<CustomTooltip/>}/>
                <Legend/>

                {casesNew && <Line dot={false} yAxisId={2} data={snap.nationalCases} type="monotone"
                       dataKey='cases_new' stroke={color.black} activeDot={{r: 8}}/>}
                {deathsNew && <Line dot={false} yAxisId={3} data={snap.nationalDeath} type="monotone"
                                    dataKey='deaths_new' stroke={color.red} activeDot={{r: 8}}/>}
                {dose1 && <Line dot={false} yAxisId={1} data={snap.nationalVax} type="monotone"
                                dataKey='Dose 1' stroke={color.specialGreen} activeDot={{r: 8}}/>}
                {dose2 && <Line dot={false} yAxisId={1} data={snap.nationalVax} type="monotone"
                                dataKey='Dose 2' stroke={color.readGray} activeDot={{r: 8}}/>}

                {totalReg && <Line dot={false} yAxisId={1} data={snap.nationalRegistration} type="monotone" dataKey='Total Reg'
                                   stroke={color.primary} activeDot={{r: 8}}/>}
                {elderlyReg && <Line dot={false} yAxisId={1} data={snap.nationalRegistration} type="monotone" dataKey='Elderly Reg'
                       stroke={color.gray} activeDot={{r: 8}}/>}
                {above18Reg && <Line dot={false} yAxisId={1} data={snap.nationalRegistration} type="monotone" dataKey='Above 18 Reg'
                       stroke={color.subscriptionGreen} activeDot={{r: 8}}/>}
                {under18Reg && <Line dot={false} yAxisId={1} data={snap.nationalRegistration} type="monotone" dataKey='Under 18 Reg'
                       stroke={color.blue} activeDot={{r: 8}}/>}

                {/*<Line dot={false} yAxisId={1} data={snap.stateHospital[stateName]} type="monotone" dataKey='Total hospitalisation' stroke={color.red} activeDot={{r: 8}}/>*/}

            </LineChart>
        </ResponsiveContainer>
    )
}