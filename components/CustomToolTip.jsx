import {format, parseISO} from "date-fns";

export function CustomTooltip({ active, payload, label }) {
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
                        <div key={item.dataKey}>
                            <p>{item.name}: {text}</p>
                        </div>

                    )
                })}

            </div>
        );
    }
    return null;
}