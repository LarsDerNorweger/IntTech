#!/bin/bash

pushd App
exec code 
popd

pushd Server
./start.sh
popd 


