#!/usr/bin/env python
# python in a jekyll repo... wtf?
# use in the dzcb virtualenv

import json
import pathlib
import re


STATES = ("Washington", "Oregon")


def extract_ids_from_favs(favs_html):
    from bs4 import BeautifulSoup
    soup = BeautifulSoup(favs_html, 'html.parser')
    pat = re.compile("state_id=([0-9]+)&ID=([0-9]+)")
    return [
        dict(
            Frequency=link.text.strip(),
            **dict(zip(("State ID", "Rptr ID"), pat.search(link["href"]).groups()))
        )
        for link in soup.find_all('a', title="View more details")
    ]


def combine_from_favs(favs, states):
    from dzcb.repeaterbook import iter_cached_repeaters

    favs_by_tuple = {(fav["State ID"], fav["Rptr ID"]): fav.copy() for fav in favs}
    for rpt in iter_cached_repeaters(states):
        frpt = favs_by_tuple.get((rpt.get("State ID"), rpt.get("Rptr ID")))
        if frpt is not None:
            frpt.update(rpt)
    return tuple(favs_by_tuple.values())


def x_load_favs():
    return pathlib.Path("/Users/masen/mfs/projects/ham_radio/repeaterbook/KF7HVM's Dashboard 2021-09.html").read_text()


if __name__ == "__main__":
    repeaters = json.loads(pathlib.Path("repeaters.json").read_text())
    pathlib.Path("repeaters_generated.json").write_text(
        json.dumps(combine_from_favs(repeaters, STATES))
    )
    print("wrote repeaters_generated.json")
