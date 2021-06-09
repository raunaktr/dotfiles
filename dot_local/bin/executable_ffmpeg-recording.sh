#!/bin/sh

ffmpeg -video_size 1920x1080 -framerate 30 -f x11grab -i :0.0+0,0 -f pulse -ac 2 -i 0 /home/raunak/Videos/recording$(date "+%Y-%m-%d_%H-%M-%S").mp4 && dunstify -u critical "ffmpeg" "Recording started" 


