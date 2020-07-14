#!/bin/sh

cd "$HOME" || return
system_type=$(uname -s)
if [[ $system_type == "Linux" ]]; then
    echo "Hello, Linux User!"
    sudo pacman -Syu
    sudo pacman -S git curl wget
fi

cd ~
curl -sfL https://git.io/chezmoi | sh

mkdir -p ~/.ssh
chmod 0700 ~/.ssh

if [ ! -n "$(grep "^github.com " ~/.ssh/known_hosts)" ]; then
    ssh-keyscan github.com >> ~/.ssh/known_hosts 2>/dev/null;
fi

export PATH=$HOME/bin:$PATH

cd ~ && chezmoi apply
