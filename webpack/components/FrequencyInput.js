import React, { useState } from 'react'
import ReactAutocomplete from 'react-autocomplete'

export default function FrequencyInput (props) {
    const [frequency, setFrequency] = useState('');
    return (
        <ReactAutocomplete
            items={props.items}
            shouldItemRender={(item, value) => (
                `${item.Frequency} ${item.Callsign} ${item["Nearest City"]} ${item["Landmark"]}`
                    .toLowerCase()
                    .indexOf(value.toLowerCase()) > -1
            )
            }
            getItemValue={(item) => (item.Frequency)}
            renderItem={(item, highlighted) =>
                <div
                    key={`${item["State ID"]} - ${item["Rptr ID"]}`}
                    style={{backgroundColor: highlighted ? '#eee' : 'transparent'}}
                >
                    {`${item.Frequency} ${item.Callsign} - ${item["Nearest City"]}, ${item.State}`}
                </div>
            }
            value={frequency}
            onChange={e => {
                setFrequency(e.target.value)
                props.setSelectedMachine(undefined);
            }}
            onSelect={(value, item) => {
                setFrequency(value)
                props.setSelectedMachine(item);
            }}
            inputProps={{ name: "fields[frequency]" }}
        />
    )
}