#!/bin/sh

BAR_HEIGHT=41  # polybar height
BORDER_SIZE=14  # border size from your wm settings
YAD_WIDTH=222  # 222 is minimum possible value
YAD_HEIGHT=188 # 193 is minimum possible value
DATE="$(date +"%a %d")"

case "$1" in
--popup)
    if [ "$(xdotool getwindowfocus getwindowname)" = "yad-calendar" ]; then
        exit 0
    fi

    eval "$(xdotool getmouselocation --shell)"
    eval "$(xdotool getdisplaygeometry --shell)"
    

    yad --calendar --undecorated --fixed --close-on-unfocus --no-buttons \
        --width=$YAD_WIDTH --height=$YAD_HEIGHT --posx=1680 --posy=32 \
        --title="yad-calendar" --borders=0 >/dev/null &
    ;;
*)
    echo " $DATE"
    ;;
esac
