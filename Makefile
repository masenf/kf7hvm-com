qso-form:
	yarn build

.env:
	python3 -m venv .env
	.env/bin/python -m pip install --upgrade dzcb~=0.3

repeater-map: .env
	.env/bin/python repeaters/rbtools.py
