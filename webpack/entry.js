import React, { Component, useEffect, useState, useRef } from 'react';
import {render} from 'react-dom';
import DateTimePicker from 'react-datetime-picker'
import useFetch from "./components/useFetch";
import FrequencyInput from './components/FrequencyInput';
import Repeater from './components/Repeater';
import CallsignInput from "./components/CallsignInput";

function QsoForm (props) {
    const fetchedRepeaters = useFetch("/assets/repeaters.json");
    const [value, onChange] = useState(new Date());
    const [selectedMachine, setSelectedMachine] = useState(undefined);
    return (
        <div>
            <DateTimePicker
                onChange={onChange}
                value={value}
            />
            <br />
            <FrequencyInput
                items={(fetchedRepeaters.status === "fetched" && fetchedRepeaters.data.results) || []}
                setSelectedMachine={setSelectedMachine}
            />
            <Repeater
                item={selectedMachine}
            />
            <CallsignInput />
        </div>
    )
}

class App extends Component {
    render() {
        return (
            <FrequencyInput />
        )
    }
}

render(<QsoForm />, document.getElementById('root'));
