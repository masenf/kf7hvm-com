import React, { useEffect, useState } from 'react'
import ReactAutocomplete from 'react-autocomplete'
import fetchJsonp from "fetch-jsonp";
import useFetch from "./useFetch";

// TODO: this API sucks and fails > 50% of the timetch
const FCC_lic_view = "https://data.fcc.gov/api/license-view/basicSearch/getLicenses?format=jsonp&searchValue="

export default function CallsignInput (props) {
    const [value, setValue] = useState('');
    const [lookupResult, setLookupResult] = useState();
    const fetchedCallsigns = useFetch("/assets/callsigns.json");
    const [queriedCallsigns, setQueriedCallsigns] = useState({});
    const [items, setItems] = useState([]);

    useEffect(() => {
        let newItems = []
        if (fetchedCallsigns.status === "fetched") {
            newItems = [...new Set(newItems.concat(fetchedCallsigns.data))]
        }
        if (queriedCallsigns) {
            newItems = [...new Set(newItems.concat(Object.keys(queriedCallsigns)))]
        }
        if (newItems != items) {
            console.log(newItems);
            setItems(newItems);
        }
    }, [fetchedCallsigns.status, queriedCallsigns]);

    useEffect(() => {
        if (!value) {
            return;
        }
        if (queriedCallsigns[value.toUpperCase()]) {
            setLookupResult(queriedCallsigns[value.toUpperCase()].licName);
            return;
        }
        const timeOutId = setTimeout(() => {
            console.log(`Making JSONP request for ${value}...`)
            fetchJsonp(FCC_lic_view + value, {
                jsonpCallback: 'jsonCallback',
                timeout: 20000
            })
                .then(res => res.json())
                .then(
                    (result) => {
                        let newCallsigns = {...queriedCallsigns}
                        if (result.Licenses) {
                            for (const l of result.Licenses.License) {
                                if (l.statusDesc !== "Active") {
                                    continue;
                                }
                                newCallsigns[l.callsign.toUpperCase()] = l;
                            }
                            if (newCallsigns) {
                                setQueriedCallsigns(newCallsigns);
                            }
                        }
                        if (newCallsigns[value.toUpperCase()]) {
                            setLookupResult(newCallsigns[value.toUpperCase()].licName);
                        }
                        if (result.Errors) {
                            console.log(JSON.stringify(result.Errors.Err))
                        }
                    }
                )
                .catch(error => {
                    console.error(`Error querying ${value}: ${error}`);
                });
        }, 1000);
        return () => clearTimeout(timeOutId);
    }, [value]);

    return (
        <div>
            <ReactAutocomplete
                items={items}
                shouldItemRender={(item, value) => (
                    item.toLowerCase()
                        .indexOf(value.toLowerCase()) > -1
                )
                }
                getItemValue={(item) => (item)}
                renderItem={(item, highlighted) =>
                    <div
                        key={item}
                        style={{backgroundColor: highlighted ? '#eeeeee' : 'transparent'}}
                    >
                        {item}
                    </div>
                }
                value={value}
                onChange={e => {
                    setValue(e.target.value);
                    setLookupResult("");
                }}
                onSelect={(value, item) => setValue(value)}
            />
            <div className="name-lookup">{lookupResult}</div>
        </div>
    )
}
