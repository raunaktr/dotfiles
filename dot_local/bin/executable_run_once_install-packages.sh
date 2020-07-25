#!/bin/sh

cd "$HOME" || return
system_type=$(uname -s)

if [[ $system_type == "Linux" ]]; then
    sudo pacman -S $(cat ~/.local/share/chezmoi/dot_local/private_share/pkglist.txt | awk '{print $1}')
fi
