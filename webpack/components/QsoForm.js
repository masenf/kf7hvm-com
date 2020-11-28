import React, { useState } from 'react';
import DateTimePicker from 'react-datetime-picker'
import useFetch from "./useFetch";
import FrequencyInput from './FrequencyInput';
import Repeater from './Repeater';
import CallsignInput from "./CallsignInput";

export default function QsoForm (props) {
    const fetchedRepeaters = useFetch("/assets/repeaters.json");
    const [startDate, setStartDate] = useState(new Date());
    const [selectedMachine, setSelectedMachine] = useState(undefined);

    let selectedMachineKey = ""
    if (selectedMachine) {
        selectedMachineKey = `${selectedMachine["State ID"]},${selectedMachine["Rptr ID"]}`;
    }
    return (
        <div className="react-qso-form">
            <div className="textfield narrowfield">
                <label>
                    Local Time<br />
                    <DateTimePicker
                        onChange={setStartDate}
                        value={startDate}
                    />
                    <input
                        type="hidden"
                        value={Math.floor(startDate / 1000)}
                        name="fields[start]"
                    />
                </label>
            </div>
            <div className="textfield narrowfield">
                <label>
                    Frequency<br/>
                    <FrequencyInput
                        items={(fetchedRepeaters.status === "fetched" && fetchedRepeaters.data.results) || []}
                        setSelectedMachine={setSelectedMachine}
                    />
                    <Repeater
                        item={selectedMachine}
                    />
                    <input
                        type="hidden"
                        value={selectedMachineKey}
                        name="fields[machine]"
                    />
                </label>
            </div>
            <label>
                Mode
                <select className="qso-form-mode" name="fields[mode]">
                    <option value="FM">FM</option>
                    <option value="DMR">DMR</option>
                </select>
            </label>
            <div className="textfield narrowfield">
                <label>
                    Their Call<br/>
                    <CallsignInput />
                </label>
            </div>
        </div>
    )
}