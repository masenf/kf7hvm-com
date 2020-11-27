import React, { Component } from 'react'
import ReactAutocomplete from 'react-autocomplete'

class FrequencyInput extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <ReactAutocomplete
                items={this.props.items}
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
                value={this.props.value}
                onChange={e => {
                    this.props.setFrequency(e.target.value);
                    this.props.setSelectedMachine(undefined);
                }}
                onSelect={(value, item) => {
                    this.props.setFrequency(value)
                    this.props.setSelectedMachine(item);
                }}
            />
        )
    }
}

export default FrequencyInput;