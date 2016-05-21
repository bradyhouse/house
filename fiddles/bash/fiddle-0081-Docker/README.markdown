fiddle-0081-Docker
======

### Title

Install Docker


### Creation Date

05-21-16


### Location

Chicago, IL


### Description

Shell script that automates the installation and setup of docker via homebrew.  When executed successfully, it should
generate the following output:

    RUN.SH
    Bash version 3.2.57(1)-release...
    ├────BREWUPDATE
    Updated Homebrew from 51d5af0 to f0b70e5.
    ==> Migrating Homebrew to v0.9.9
    remote: Counting objects: 251, done.
    remote: Compressing objects: 100% (210/210), done.
    remote: Total 251 (delta 129), reused 120 (delta 27), pack-reused 0
    Receiving objects: 100% (251/251), 427.83 KiB | 0 bytes/s, done.
    Resolving deltas: 100% (129/129), completed with 128 local objects.
    From https://github.com/Homebrew/brew
     + f0b70e5...0123e04 master     -> origin/master  (forced update)
    HEAD is now at 0123e04 mirror: add command to mirror to Bintray. (#263)
    ==> Homebrew has enabled anonymous aggregate user behaviour analytics
    Read the analytics documentation (and how to opt-out) here:
      https://git.io/brew-analytics
    ==> Tapping homebrew/core
    Cloning into '/usr/local/Library/Taps/homebrew/homebrew-core'...
    remote: Counting objects: 3706, done.
    remote: Compressing objects: 100% (3587/3587), done.
    remote: Total 3706 (delta 13), reused 2502 (delta 9), pack-reused 0
    Receiving objects: 100% (3706/3706), 2.86 MiB | 0 bytes/s, done.
    Resolving deltas: 100% (13/13), done.
    Checking connectivity... done.
    Tapped 3583 formulae (3,732 files, 8.9M)
    Already up-to-date.
    ├────BREWINSTALLCASK
    ==> Tapping caskroom/cask
    Cloning into '/usr/local/Library/Taps/caskroom/homebrew-cask'...
    remote: Counting objects: 3660, done.
    remote: Compressing objects: 100% (3603/3603), done.
    remote: Total 3660 (delta 58), reused 822 (delta 35), pack-reused 0
    Receiving objects: 100% (3660/3660), 5.97 MiB | 0 bytes/s, done.
    Resolving deltas: 100% (58/58), done.
    Checking connectivity... done.
    Tapped 1 formula (3,628 files, 13.7M)
    ==> brew cask install caskroom/cask/brew-cask
    ==> We need to make Caskroom for the first time at /opt/homebrew-cask/Caskroom
    ==> We'll set permissions properly so we won't need sudo in the future
    Error: No available Cask for caskroom/cask/brew-cask
    Error: nothing to install
    ├────BREWINSTALLVIRTUALBOX
    ==> Downloading http://download.virtualbox.org/virtualbox/5.0.20/VirtualBox-5.0.20-106931-OSX.dmg
    ######################################################################## 100.0%
    ==> Verifying checksum for Cask virtualbox
    ==> Running installer for virtualbox; your password may be necessary.
    ==> Package installers may write to any location; options such as --appdir are ignored.
    ==> installer: Package name is Oracle VM VirtualBox
    ==> installer: Installing at base path /
    ==> installer: The install was successful.
    🍺  virtualbox staged at '/opt/homebrew-cask/Caskroom/virtualbox/5.0.20-106931' (4 files, 86M)
    ├────BREWINSTALLDOCKER
    ==> Downloading https://homebrew.bintray.com/bottles/docker-1.11.1.el_capitan.bottle.tar.gz
    ######################################################################## 100.0%
    ==> Pouring docker-1.11.1.el_capitan.bottle.tar.gz
    ==> Caveats
    Bash completion has been installed to:
      /usr/local/etc/bash_completion.d
    
    zsh completion has been installed to:
      /usr/local/share/zsh/site-functions
    ==> Summary
    🍺  /usr/local/Cellar/docker/1.11.1: 10 files, 11.5M
    ├────BREWINSTALLDOCKERMACHINE
    ==> Downloading https://homebrew.bintray.com/bottles/docker-machine-0.7.0.el_capitan.bottle.tar.gz
    ######################################################################## 100.0%
    ==> Pouring docker-machine-0.7.0.el_capitan.bottle.tar.gz
    ==> Caveats
    Bash completion has been installed to:
      /usr/local/etc/bash_completion.d
    ==> Summary
    🍺  /usr/local/Cellar/docker-machine/0.7.0: 5 files, 39.0M
    └──ENVIRONMENT CONFIGURED
    



### Tags

bash, brew, brew-cask, virtualbox, docker, docker-machine
