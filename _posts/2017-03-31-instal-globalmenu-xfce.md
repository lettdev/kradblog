---
layout: post
title: Set up global-menu for XFCE
---

1.

```bash
sudo add-apt-repository ppa:webupd8team/mate
sudo apt update
```

2.

sudo apt install xfce4-vala-appmenu-plugin unity-gtk3-module unity-gtk2-module appmenu-qt appmenu-qt5

2.

xfconf-query -c xsettings -p /Gtk/ShellShowsMenubar -n -t bool -s true
xfconf-query -c xsettings -p /Gtk/ShellShowsAppmenu -n -t bool -s true

Remove

sudo apt purge xfce4-vala-appmenu-plugin mate-applet-vala-appmenu

xfconf-query -c xsettings -p /Gtk/ShellShowsMenubar -n -t bool -s false
xfconf-query -c xsettings -p /Gtk/ShellShowsAppmenu -n -t bool -s false
