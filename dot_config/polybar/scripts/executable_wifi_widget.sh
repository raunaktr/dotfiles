#!/bin/sh


dunstify -u low "wifi" "IP: $(hostname --ip-address)\nRouter: $(ip route show | awk '/default/ {print $3}')" 
