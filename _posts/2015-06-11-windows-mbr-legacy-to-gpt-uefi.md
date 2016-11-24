---
layout: post
title: Convert MBR/BIOS sang GPT/UEFI không làm mất dữ liệu
---

Dưới đây là cách chuyển một hệ thống Windows 7/8 khởi động với legacy BIOS sang khởi động với UEFI. Vì UEFI yêu cầu ổ cứng phân vùng với GPT thay vì dùng MBR nên đồng thời chúng ta sẽ cần chuyển kiểu lưu trữ phân vùng ổ cứng từ MBR sang GPT.

## Bước 1: Kiểm tra xem hệ thống được cài trên BIOS hay UEFI, ổ cứng được phân vùng với MBR hay GPT
Để kiểm tra xem Windows được cài trên BIOS hay UEFI, nhấn <kbd>Windows</kbd> + <kbd>R</kbd> để mở hộp thoại Run rồi nhập `msinfo32`. Nếu dòng _BIOS mode_ ở System Summary là Legacy tức là hệ thống khởi động với BIOS, còn nếu là UEFI tức là hệ thống khởi động với UEFI.

Để kiểm tra ổ cứng phân vùng với MBR hay GPT, mở Command Prompt với quyền admin và khởi động Disk part bằng cách nhập lệnh:

```
diskpart
```

Sau đó, sử dụng lệnh `list disk` để liệt kê danh sách các đĩa. Kết quả của lệnh này sẽ được hiển thị như bên dưới, các ổ đĩa được phân vùng với GPT sẽ có dấu sao ở cột Gpt:

```
DISKPART> list disk

  Disk ###  Status         Size     Free     Dyn  Gpt
  --------  -------------  -------  -------  ---  ---
  Disk 0    Online          465 GB      0 B
  Disk 1    Online          931 GB      0 B        *
```

## Bước 2: Sử dụng gptgen để chuyển từ MBR sang GPT
Download [_gptgen_](http://sourceforge.net/projects/gptgen/)

Khởi động Command Prompt với quyền admin, chuyển đến thư mục giải nén gptgen và nhập lệnh sau:

```
gptgen.exe -w \\.\physicaldrive0
```

Khởi động lại và boot vào USB cài đặt Windows, chọn _Repair Your Computer -> Troubleshoot -> Advanced options -> Command Prompt_

Vào disk part, chọn ổ đĩa sẽ làm việc bằng lệnh

```
select disk 0
```

Liệt kê danh sách các partition trên ổ bằng lệnh

```
list partition
```

Danh sách các partition sẽ hiện lên tương tự như dưới:

```
DISKPART> list partition

  Partition ###  Type              Size     Offset
  -------------  ----------------  -------  -------
  Partition 1    Primary            350 MB  1024 KB
  Partition 2    Primary            464 GB   400 MB
```

Partition 350MB chính là boot partition cũ, chọn và xóa nó bằng lệnh:

```
select partition 1

delete partition
```

Tạo boot partition mới và reserved partition:

```
create partition EFI size=100 offset=1

format quick fs=fat32 label="System"

assign letter=S

create partition msr size=128 offset=103424
```

Kiểm tra lại bằng lệnh `list partition`, kết quả sẽ tương tự như ở dưới:

```
  Partition ###  Type              Size     Offset
  -------------  ----------------  -------  -------
  Partition 1    System             100 MB  1024 KB
  Partition 1    Reserved           128 MB   101 MB
  Partition 2    Primary            464 GB   400 MB
```

Đặt lại kí tự cho phân vùng cài đặt windows. Liệt kê các volume bằng lệnh `list volume`. Tìm số thứ tự của volume cài đặt windows và đặt lại kí tự (thường là C:) bằng lệnh (giả sử windows được cài đặt trên volume 1):

```
select volume 1

assign letter=C
```

Tương tự đặt lại kí tự của các volume khác nếu cần thiết. Sau đó thoát diskpart bằng lệnh `exit`

Tạo dữ liệu cho phân vùng boot bằng lệnh dưới:

```
bcdboot c:\windows /s s: /f UEFI
```

**Reboot!**