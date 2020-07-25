#!/bin/sh

time=$((20 - $(date '+%-M') % 20))

if [ $time -eq 20 ]; then
   dunstify -u low 'Break' &
#    ogg123 beep.ogg &> /dev/null &
fi

echo "$time"
