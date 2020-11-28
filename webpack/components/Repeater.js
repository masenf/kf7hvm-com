import React from 'react'

function Repeater (props) {
    if (props.item) {
        let location = `${props.item["Nearest City"]}, ${props.item.State}`;
        if (props.item.Landmark) {
            location = `${props.item.Landmark}, ${location}`;
        }
        let offset = parseFloat(props.item["Input Freq"]) - parseFloat(props.item.Frequency);
        let shift = ""
        if (offset < 0) {
            shift = "-";
        } else if (offset > 0) {
            shift = "+";
        }
        return (
            <a
                href={`https://www.repeaterbook.com/repeaters/details.php?ID=${props.item["Rptr ID"]}&state_id=${props.item["State ID"]}`}
                target="_blank">
                <div className="repeater-container">
                    <img className="icon-small" src="/images/wireless_antenna2.svg" />
                    <div className="repeater-info">
                        <div className="repeater-access-info">
                            <div className="repeater-callsign">{props.item.Callsign}</div>
                            <div className="repeater-frequency">{props.item.Frequency}{shift}</div>
                            <div className="repeater-tone">{props.item.PL}</div>
                        </div>
                        <div className="repeater-location">{location}</div>
                    </div>
                </div>
            </a>
        );
    }
    return null;
}

export default Repeater;