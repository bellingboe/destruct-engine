@echo off
pushd "%~2"

set fileext="*.%~1"

for /r %%x in (%fileext%) do (
    type "%%~x"
)
popd