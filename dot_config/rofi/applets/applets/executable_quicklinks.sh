#!/usr/bin/env bash

## Author  : Aditya Shakya
## Mail    : adi1090x@gmail.com
## Github  : @adi1090x
## Twitter : @adi1090x

style="$($HOME/.config/rofi/applets/applets/style.sh)"

dir="$HOME/.config/rofi/applets/applets/configs/$style"
rofi_command="rofi -theme $dir/quicklinks.rasi"

# Error msg
msg() {
	rofi -theme "$HOME/.config/rofi/applets/styles/message.rasi" -e "$1"
}

# Browser
if [[ -f /usr/bin/firefox ]]; then
	app="firefox"
elif [[ -f /usr/bin/chromium ]]; then
	app="chromium"
elif [[ -f /usr/bin/midori ]]; then
	app="midori"
else
	msg "No suitable web browser found!"
	exit 1
fi

if [[ -f /usr/bin/google-chrome-stable ]]; then
	web="google-chrome-stable"
else
	msg "No suitable web browser found!"
	exit 1
fi
	
	
# Links
mail=""
drive=""
google=""
whatsapp=""

# Variable passed to rofi
options="$mail\n$drive\n$google\n$whatsapp"

chosen="$(echo -e "$options" | $rofi_command -p "Open In  :  $app" -dmenu -selected-row 0)"
case $chosen in
	$mail)
        $app https://www.gmail.com &
        ;;
    $drive)
        $app https://drive.google.com &
        ;;
    $whatsapp)
        $web https://web.whatsapp.com &
        ;;
    $google)
        $app https://www.google.com &
        ;;    
esac

