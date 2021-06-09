# Raunak's old dotfiles

[Chezmoi](https://www.chezmoi.io/) manages your dotfiles across multiple machines, securely and is available on windows, macOS and almost all unix like distributions via your package manager.

- `sudo pacman -S chezmoi`
- `brew install chezmoi`

or clone it [from source](https://github.com/twpayne/chezmoi.git) and [build it](https://www.chezmoi.io/docs/install/) yourself.

**Note:** This repository is tuned to Arch. Yes, _i use **Arch**, btw!_

## Table of contents

- [Requirements](#requirements)
  - [Packages](#packages)
- [Installation](#installation)
  - [Clone](#clone)
  - [Config](#config)
  - [Apply](#apply)
- [Next Steps](#next-steps)
- [Issues](#issues)
- [License](#license)

## Requirements

`sudo`, user have permission to install the packages:

```
    # EDITOR="vim" visudo
    username ALL=(ALL) ALL
```

If you are installing this on a new machine, make sure, to configure (via: `useradd -m -G users,wheel,audio,video username`), logout and initialize this environment correctly.

## Packages

| name                 | WTF                    | Notes                                                                                                                  |
| -------------------- | ---------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| Pulseaudio           | Audio Driver           | Know more about [pulseaudio](https://wiki.archlinux.org/index.php/PulseAudio) on arch wiki.                            |
| i3                   | Windows Manager        | `pacman -S i3-gaps`                                                                                                    |
| Polybar              | Status Bar             | [polybar](https://github.com/polybar/polybar) is a easy-to-use status bar                                              |
| Rofi                 | Dmenu                  | [Rofi](https://github.com/davatorium/rofi): window switcher, application launcher and dmenu replacement                |
| google-chrome-stable | Web Browser            | Yes, i use a memory hogger!                                                                                            |
| feh                  | Image Viewer           | `sudo pacman -S feh`                                                                                                   |
| betterlockscreen     | Lock Screen            | [betterlockscreen](https://github.com/pavanjadhaw/betterlockscreen) is just amazing!                                   |
| lightdm              | Display Manager        | [lightdm-gtk-greeter](https://wiki.archlinux.org/index.php/LightDM)                                                    |
| mpd                  | Music Player Daemon    | With ncmpcpp, mpc                                                                                                      |
| mpv, VLC             | Video Players          | `sudo pacman -S vlc`                                                                                                   |
| compton-tryone       | Compositor             | [compton](https://github.com/tryone144/compton) with kawase base                                                       |
| scrot                | Screen Capture         | `sudo pacman -S scrot`                                                                                                 |
| ranger               | CLI based File Manager | [ranger](http://ranger.github.io/) is a console based file manager written in python                                   |
| vim                  | Editor                 | I use vim 8 awesome [vimrc](https://github.com/amix/vimrc)                                                             |
| kitty                | Terminal               | [kitty](https://sw.kovidgoyal.net/kitty/) is designed for power keyboard users                                         |
| Yay                  | AUR helper             | [yay](https://github.com/Jguer/yay), an AUR helper giving access to aur.                                               |
| zsh                  | Shell                  | Plugins: [oh-my-zsh](https://github.com/ohmyzsh/ohmyzsh) and [powerlevel10k](https://github.com/romkatv/powerlevel10k) |

## Installation

`chezmoi` stores the desired state of your dotfiles in `~/.local/share/chezmoi` or `$XDG_DATA_HOME`.

### Clone

1. Initialize with chezmoi using

```
chezmoi init https://github.com/raunaktr/dotfiles.git
```

### Config

2. Make changes in your template before you move forward:

```
    $XDG_CONFIG_HOME/chezmoi/chezmoi.toml
```

this will also make changes in file to `~/.config/git/config` file.

### Apply

3. Apply the configurations

```
    chezmoi apply
```

Voila! You've have successfully deployed the dotfiles.

## Next steps

Now, Edit dots using `edit` while specifying full path of the file

```
    chezmoi edit ~/path/to/file
```

See what changes `chezmoi` would make:

```
    chezmoi diff
```

Apply the changes using `chezmoi -v apply`, -v flag is for verbose.

Update your configs using

```
    chezmoi update
```

For further details use `chezmoi help` or refer to [chezmoi](https://www.chezmoi.io/docs/how-to/).

### Issues

For any questions, comments, feedback or issues, submit a [new issue](https://github.com/raunaktr/dotfiles/issues/new).

# License

[MIT License](https://github.com/raunaktr/dotfiles/blob/master/LICENSE)
