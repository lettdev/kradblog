---
layout: post
title: Cài đặt Mac OSX 10.10 Yosemite trên Asus K551LN
featured_image: https://s20.postimg.org/pv1m90or1/OS-_X-_Yosemite-_Logo-_Wallpaper.jpg
---


Năm mới nên quyết định làm bước thay đổi mới, đó là xóa Windows và Ubuntu khỏi máy để cài Mac OSX. Có một vài lí do dẫn đến quyết định này. Thứ nhất là vì có một vài thứ đại loại như Jekyll chẳng hạn, chạy không tốt lắm trên Windows. Trước giờ thì sẽ chọn Ubuntu để cài vì nó nhẹ nhàng tình cảm. Tuy nhiên tự dưng lại đen gặp đúng quả máy driver thiếu thốn tùm lum chưa có cách giải quyết triệt để nên việc cài Ubuntu khó khăn chả kém cài Mac, thế thà cài Mac còn hơn. Bởi nếu không vì nhẹ nhàng tình cảm thì Ubuntu còn nhiều thứ không thích như Unity vẫn hơi sida, không chạy được native Photoshop, Illustrator,... (Không tính chạy qua Wine), bộ gõ sida khỏi bàn (đặc biệt là đếch gõ được trong Sublime). Chân thành cảm ơn Macintosh.vn, Tonymacx86, InsanelyMac, HackintoshZone, RehabMan, Mirone, PokeNguyen's AIO guide,... đã tài trợ chương trình này.

OK Yosemite, here I come!

## Thông tin máy
<p class="text-center"><img src="http://i.imgur.com/WI25NNs.jpg" alt="K551LN"></p>
<dl class="horizontal-dl">
	<dt>Tên máy</dt>
	<dd>Asus K551LN XX317D</dd>
	<dt>Processor</dt>
	<dd>Intel® Core™ i5 4210U (Haswell)</dd>
	<dt>RAM</dt>
	<dd>6GB DDR3L 1600(O.C.) MHz SDRAM</dd>
	<dt>Display</dt>
	<dd>15.6" 16:9 HD (1366x768) (Vãi cả cùi mía)</dd>
	<dt>Storage</dt>
	<dd>500GB HDD 5400RPM With 24GB SSD</dd>
	<dt>Graphics</dt>
	<dd>
		<ul>
			<li>Intel HD4400</li>
			<li>NVIDIA® GeForce® GT 840M with 2GB DDR3 VRAM</li>
		</ul>
	</dd>
	<dt>Networking</dt>
	<dd>
		<ul>
			<li>Realtek Ethernet</li>
			<li>Mediatek Wireless Ralink 7630E (Fuck!)</li>
		</ul>
	</dd>
	<dt>Audio</dt>
	<dd>Realtek ALC233 - Built-in Speakers And Microphone (1 port output)</dd>
	<dt></dt>
	<dt>Camera</dt>
	<dd>HD 720p CMOS module</dd>
	<dt>Ports</dt>
	<dd>2 x USB 3.0 port(s), 1 x USB 2.0, 1 x HDMI</dd>
	<dt>Card Reader</dt>
	<dd>2 -in-1 card reader ( SD/ SDHC)</dd>
	<dt>Optical Drive</dt>
	<dd>Super-Multi DVD</dd>
</dl>

## Chuẩn bị
Bình thường toàn cài trên desktop với cấu hình tự build và theo phương pháp legacy, còn lần này sẽ dùng Clover. Dự kiến sẵn là khi mới cài mạng sẽ ko dùng được nên chuẩn bị sẵn các tool, kext,... cần thiết vào USB.

Download [Clover.zip](http://www.mediafire.com/download/1q39o0cszs9z5si/Clover.zip) và copy vào phân vùng EFI, tạo config.plist với boot flag `kext-dev-mode=1` và `nv_disable=1`

Nhập lệnh sau vào terminal để tạo bộ cài trên phân vùng MacOS:

{% highlight bash %}
sudo /Applications/Install\ OS\ X\ Yosemite.app/Contents/Resources/createinstallmedia --volume /Volumes/MacOS --applicationpath /Applications/Install\ OS\ X\ Yosemite.app --nointeraction
{% endhighlight %}

## Cài đặt
Boot vào USB, bị reboot khi chưa kịp vào là do thiếu flag `nv_disable=1`

Cài như chưa bao giờ được cài.

Sau khi cài xong OSX thì cài Clover bootloader. Tải Clover bản mới xong cài lên ổ mSATA SSD cho nó máu. Thiết lập:

+ Install for UEFI booting only
+ Theme:
+ rivers64UEFI / EmuVariableUEFI-64
+ Drivers64UEFI / OsxAptioFixDrv-64
+ Install RC Scripts on target volume
+ Install Clover Preference Pane

Tải [HFSPlus.efi.zip](http://www.mediafire.com/download/mzhdvm101gsk99p/HFSPlus.efi.zip), copy vào /EFI/CLOVER/drivers64UEFI/, xoá VboxHFS-64.efi

Tạo config.plist và cho vào /EFI/Clover/

## Chỉnh sửa
Chạy Hackintosh Vietnam Tool để cài kext, chọn:

+ FakeSMC
+ NullCPUPowerManagement
+ DisableTurboBoostBattery
+ ACPIBatteryManager
+ Wifi Injector
+ BTFirmwareUploader
+ ACPIBacklight (Dùng kèm DSDT để fix độ sáng màn hình)
+ HD4400 OpenCL
+ Elan Touchpad (xoá kext VoodooPS2 không thì kernel panic)
+ Fn keyboard Asus

### Wifi
Không có hi vọng gì với con Mediatek Ralink 7630E cả nên mua cái USB TPLink WDN3200 (Ralink RT5572), cài driver sau là dùng ngon lành.

<div class="highlight"><pre>
<a href="http://www.mediafire.com/download/kpe6bv1b4t66hwt/BearExtender-5.4.dmg">BearExtender</a>
</pre></div>

### Brightness
Dùng patch đổi tên GFX0 -> IGPU của RehabMan cho SSDT-8 và DSDT

<div class="highlight"><pre>
<a href="http://pastebin.com/DXqMEAZ9">http://pastebin.com/DXqMEAZ9</a>
</pre></div>

Dùng patch Brightness Haswell của RehabMan cho SSDT-8

<div class="highlight"><pre>
<a href="http://pastebin.com/XFpJhQnW">http://pastebin.com/XFpJhQnW</a>
</pre></div>

### Battery (hiển thị mức pin)
Dùng patch battery ASUS N55SL của RehabMan cho DSDT

<div class="highlight"><pre><a href="http://pastebin.com/2vS46zEL">http://pastebin.com/2vS46zEL</a></pre></div>

### Audio
Dùng patch Audio HDEF Layout 3 của RehabMan cho DSDT

<div class="highlight"><pre><a href="http://pastebin.com/8xHWuyBR">http://pastebin.com/8xHWuyBR</a></pre></div>

Dùng patch IRQ Fix của RehabMan cho DSDT

<div class="highlight"><pre><a href="http://pastebin.com/tCFV3uQr">http://pastebin.com/tCFV3uQr</a></pre></div>

Cài [kext ALC233 của Mirone](http://www.mediafire.com/download/s9dhoomon6tsp2s/AppleHDA-267.0-ALC233.zip). (Layout-id=3)

### Shutdown
Shutdown bị lỗi máy không tắt hẳn. Dùng patch WAK2 của RehabMan cho DSDT.

<div class="highlight"><pre><a href="http://pastebin.com/H2nU6FRs">http://pastebin.com/H2nU6FRs</a></pre></div>

Dùng tiếp patch Shutdown Fix 2 của RehabMan cho DSDT.

<div class="highlight"><pre><a href="http://pastebin.com/5n86GUWt">http://pastebin.com/5n86GUWt</a></pre></div>