#!/usr/bin/env bash

## Inspired by adi1090x
## raunaktr 2021

theme="appdrawer_cobalt2"
dir="$HOME/.config/rofi/launchers/misc"

# comment these lines to disable random style
#themes=($(ls -p --hide="launcher.sh" $dir))
#theme="${themes[$(( $RANDOM % 16 ))]}"

rofi -no-lazy-grab -show drun -modi drun -theme $dir/"$theme"
