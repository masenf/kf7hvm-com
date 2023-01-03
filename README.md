# [kf7hvm.com](https://www.kf7hvm.com/)

* Jekyll template provided by [barryclark/jekyll-now](https://github.com/barryclark/jekyll-now) **[MIT license]**
* Antenna logo provided by Popcic (iconfinder.com - "Line Free" collection) **[CC Attribution 3.0 Unported]**
* Repeater logo provided by Libertetstudio (iconfinder.com - ["Call center and service" icon set](https://www.iconfinder.com/iconsets/call-center-and-service")) **[CC Attribution 3.0 Unported]**

# Local Dev

```
bundle install
bundle exec jekyll serve
```

# Build Steps

These are manual steps when updating certain generated data files.

## `make qso-form`

## `make repeater-map`

# thumbnail creation

```
convert *.jpg   -auto-orient -thumbnail 250x90 \
    -set filename:fname '%t_tn' +adjoin '%[filename:fname].png'
```
