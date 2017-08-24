---
layout: post
title: How to setup global menu for XFCE
---

To setup a global menu for xfce eviroment, we use the Vala AppMenu plugin.

## Add global menu

Firstly, add the webupd8team/mate ppa and update the software sources.

```bash
sudo add-apt-repository ppa:webupd8team/mate
sudo apt update
```

Then we install the Vala AppMenu plugin for xfce4 via this command.

```bash
sudo apt install xfce4-vala-appmenu-plugin unity-gtk3-module unity-gtk2-module appmenu-qt appmenu-qt5
```

Use below commands to remove normal menu from application windows.

```bash
xfconf-query -c xsettings -p /Gtk/ShellShowsMenubar -n -t bool -s true
xfconf-query -c xsettings -p /Gtk/ShellShowsAppmenu -n -t bool -s true
```

It's done! Now you can logout then login back to see the change.

## Remove it

To remove global menu, simply remove the Vala AppMenu plugin and add application windows menu back by running the below commands.

```bash
sudo apt purge xfce4-vala-appmenu-plugin mate-applet-vala-appmenu

xfconf-query -c xsettings -p /Gtk/ShellShowsMenubar -n -t bool -s false
xfconf-query -c xsettings -p /Gtk/ShellShowsAppmenu -n -t bool -s false
```