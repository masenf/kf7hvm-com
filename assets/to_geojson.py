"""
to_geojson v0.1

import aprs.fi JSON file into caltopo compatible GeoJSON format

Copyright 2020 Masen Furer

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
"""
import json
import sys


with open(sys.argv[1], "r") as f:
    points = json.load(f)


def to_point_feature(c):
    return {
        "type": "Feature",
        "geometry": {
            "type": "Point",
            "coordinates": [c[0], c[1]]
        },
    }


def to_features(points):
    coordinates = [(p['lng'], p['lat']) for p in points]
    features = []
    features.append(
        {
            "type": "Feature",
            "geometry": {
                "type": "MultiPoint",
                "coordinates": coordinates,
            },
        }
    )
    features.extend(to_point_feature(c) for c in coordinates)
    return features


geojson = {
    "type": "FeatureCollection",
    "features": to_features(points),
}
print(json.dumps(geojson, indent=4))
