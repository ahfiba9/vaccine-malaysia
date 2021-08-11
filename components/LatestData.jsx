import {useSnapshot} from "valtio";
import {globalState} from "../library/globalState";

export const LatestData = () => {
    const snap = useSnapshot(globalState)

    const casesNumber = parseInt(snap.nationalCases[snap.nationalCases.length - 1]['Daily Cases'])
    const casesNumberPrev = parseInt(snap.nationalCases[snap.nationalCases.length - 2]['Daily Cases'])

    const casesColor = casesNumber > casesNumberPrev ? 'text-red-500' : 'text-green-500'

    return (
        <div>
            <h1 className={'text-2xl flex justify-center'}>
                <span className={'text-black pr-5'}>{snap.nationalCases[snap.nationalCases.length - 1].date}</span>
                {casesNumber > casesNumberPrev ? <span className={casesColor}>&#8593; {casesNumber} Cases</span> : <span className={casesColor}>&#8595; {casesNumber} Cases</span>}
            </h1>
        </div>
    )
}

