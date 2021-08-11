import {useSnapshot} from "valtio";
import {globalState} from "../library/globalState";

export const LatestData = () => {
    const snap = useSnapshot(globalState)

    const data = snap.nationalCases

    // check for empty entry at the end of file
    let i = data.length
    let j = 1

    while (i !== 0) {
        if (!!data[i - 1].date) {
            break
        }
        ++j
        --i
    }

    const casesNumber = parseInt(data[data.length - j]['Daily Cases'])
    const casesNumberPrev = parseInt(data[data.length - (j+1)]['Daily Cases'])

    const casesColor = casesNumber > casesNumberPrev ? 'text-red-500' : 'text-green-500'

    return (
        <div>
            <h1 className={'text-2xl flex justify-center'}>
                <span className={'text-black pr-5'}>{data[data.length - 1].date}</span>
                {casesNumber > casesNumberPrev ? <span className={casesColor}>&#8593; {casesNumber} Cases</span> : <span className={casesColor}>&#8595; {casesNumber} Cases</span>}
            </h1>
        </div>
    )
}

