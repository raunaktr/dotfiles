#!/usr/bin/env sh

for dir in $(echo "$PATH" | tr ":" "\n" | grep -Fxv "$(dirname $0)"); do
    if [ -x "$dir/vim" ]; then
        exec "$dir/vim" -u "${XDG_CONFIG_HOME:-$HOME/.config}"/vim/vimrc "$@"
    fi
done
