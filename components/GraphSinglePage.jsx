import {CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {globalState, StateName} from "../library/globalState";
import {format, parseISO} from "date-fns";
import color from "../library/color";
import {useSnapshot} from "valtio";
import {CustomTooltip} from "./CustomToolTip";

const graphDataSelector = (stateData, nationalData, isNational) => {
    if (isNational) {
        return nationalData
    } else {
        return stateData
    }
}

export const GraphSinglePage = ({isNational, stateName}) => {
    const snap = useSnapshot(globalState)

    const graphType = isNational ? 'national' : 'state'

    const {casesNew, totalReg, elderlyReg, above18Reg, under18Reg, deathsNew, dose1, dose2 } = snap.isShowGraphLine[graphType]

    const {covidHosp, nonCovidHosp, totalHosp, covidIcu, nonCovidIcu, icuUsage, covidVentilator, nonCovidVentilator, ventilatorUsage } = snap.isShowGraphLine.state

    const showPercentageLine = totalReg || elderlyReg || above18Reg || under18Reg || dose1 || dose2

    const newCasesData = graphDataSelector(snap.stateCases[stateName] ,snap.nationalCases, isNational)
    const newDeathsData = graphDataSelector(snap.stateDeaths[stateName] ,snap.nationalDeath, isNational)
    const vaxData = graphDataSelector(snap.stateVax[stateName] ,snap.nationalVax, isNational)
    const registrationData = graphDataSelector(snap.stateRegistration[stateName] ,snap.nationalRegistration, isNational)

    return (
        <ResponsiveContainer width={'100%'} height={500}>
            <LineChart margin={{top: 15, right: 30, left: 20, bottom: 5}}>
                <XAxis
                    dataKey="date"
                    allowDuplicatedCategory={false}
                    axisLine={false}
                    tickLine={false}
                    interval={0}
                    tickSize={6}
                    tickFormatter={(str) => {
                        const date = parseISO(str);
                        if (date.getDate() === 1) {
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
                        domain={[0, 'auto']}
                        orientation={'right'}
                        axisLine={false}
                        tickFormatter={(str) => {
                            return `${str} cases`
                        }}
                    /> : null}
                {deathsNew ?
                    <YAxis
                        yAxisId={3}
                        domain={[0, 'auto']}
                        orientation={'right'}
                        axisLine={false}
                        tickFormatter={(str) => {
                            return `${str} deaths`
                        }}
                    /> : null}
                <CartesianGrid opacity={0.5}/>
                <Tooltip content={<CustomTooltip/>}/>
                <Legend/>

                {!isNational && <Line dot={false} yAxisId={1} data={snap.stateDeaths[stateName]} type="monotone"
                                      dataKey='baseline' stroke={color.readGray} activeDot={{r: 8}}/>}

                {casesNew && <Line dot={false} yAxisId={2} data={newCasesData} type="monotone"
                       dataKey='Daily Cases' stroke={color.black} activeDot={{r: 8}}/>}
                {deathsNew && <Line dot={false} yAxisId={3} data={newDeathsData} type="monotone"
                                    dataKey='Daily Deaths' stroke={color.red} activeDot={{r: 8}}/>}
                {dose1 && <Line dot={false} yAxisId={1} data={vaxData} type="monotone"
                                dataKey='Dose 1' stroke={color.specialGreen} activeDot={{r: 8}}/>}
                {dose2 && <Line dot={false} yAxisId={1} data={vaxData} type="monotone"
                                dataKey='Dose 2' stroke={color.readGray} activeDot={{r: 8}}/>}

                {totalReg && <Line dot={false} yAxisId={1} data={registrationData} type="monotone" dataKey='Total Reg'
                                   stroke={color.primary} activeDot={{r: 8}}/>}
                {elderlyReg && <Line dot={false} yAxisId={1} data={registrationData} type="monotone" dataKey='Elderly Reg'
                       stroke={color.gray} activeDot={{r: 8}}/>}
                {above18Reg && <Line dot={false} yAxisId={1} data={registrationData} type="monotone" dataKey='Above 18 Reg'
                       stroke={color.subscriptionGreen} activeDot={{r: 8}}/>}
                {under18Reg && <Line dot={false} yAxisId={1} data={registrationData} type="monotone" dataKey='Under 18 Reg'
                       stroke={color.blue} activeDot={{r: 8}}/>}

                {!isNational && totalHosp && <Line dot={false} yAxisId={1} data={snap.stateHospital[stateName]} type="monotone"
                       dataKey='Total hospitalisation' stroke={color.tone1} activeDot={{r: 8}}/>}
                {!isNational && nonCovidHosp && <Line dot={false} yAxisId={1} data={snap.stateHospital[stateName]} type="monotone"
                                      dataKey='Non-Covid hospitalisation' stroke={color.tone2} activeDot={{r: 8}}/>}
                {!isNational && covidHosp && <Line dot={false} yAxisId={1} data={snap.stateHospital[stateName]} type="monotone"
                                      dataKey='Covid hospitalisation' stroke={color.tone3} activeDot={{r: 8}}/>}

                {!isNational && ventilatorUsage && <Line dot={false} yAxisId={1} data={snap.stateIcu[stateName]} type="monotone"
                                      dataKey='Ventilator Usage' stroke={color.tone4} activeDot={{r: 8}}/>}
                {!isNational && nonCovidVentilator && <Line dot={false} yAxisId={1} data={snap.stateIcu[stateName]} type="monotone"
                                      dataKey='Non-Covid Ventilator' stroke={color.tone5} activeDot={{r: 8}}/>}
                {!isNational && covidVentilator && <Line dot={false} yAxisId={1} data={snap.stateIcu[stateName]} type="monotone"
                                      dataKey='Covid Ventilator' stroke={color.tone6} activeDot={{r: 8}}/>}
                {!isNational && icuUsage && <Line dot={false} yAxisId={1} data={snap.stateIcu[stateName]} type="monotone"
                                      dataKey='ICU Usage' stroke={color.tone7} activeDot={{r: 8}}/>}
                {!isNational && nonCovidIcu && <Line dot={false} yAxisId={1} data={snap.stateIcu[stateName]} type="monotone"
                                      dataKey='Non-Covid ICU' stroke={color.tone8} activeDot={{r: 8}}/>}
                {!isNational && covidIcu && <Line dot={false} yAxisId={1} data={snap.stateIcu[stateName]} type="monotone"
                                      dataKey='Covid ICU' stroke={color.tone9} activeDot={{r: 8}}/>}

            </LineChart>
        </ResponsiveContainer>
    )
}