# پروژه مدیریت آیتم‌ها با استفاده از معماری مایکروسرویس

این پروژه یک سیستم مایکروسرویس برای مدیریت آیتم‌ها است که شامل بخش‌های مختلفی مانند بک‌اند، فرانت‌اند، دیتابیس و متعادل‌سازی بار (Load Balancing) می‌باشد.

![alt text](docs/1.png) ![alt text](docs/2.png) 
همانطور که در تصویر قابل مشاهده است، در هر درخواست، یکی از بکندها جواب میدهد
برای بالانس کردن فشار، سه نود بکند استفاده شده تا در هر لحظه یکی از انها جوابگو باشد تا سرعت سیستم افزایش یابد


![alt text](docs/3.png) ![alt text](docs/4.png)

## ساختار پروژه
این پروژه از معماری مایکروسرویس برای مدیریت یک برنامه شامل موارد زیر استفاده می‌کند:

### ساختار فایل‌ها و پوشه‌ها

- backend/
  - src/
    - app.ts          # کد اصلی API
  - Dockerfile         # فایل داکر برای بک‌اند
  - tsconfig.json      # تنظیمات تایپ‌اسکریپت
  - package.json       # مدیریت وابستگی‌ها و اسکریپت‌ها
- frontend/
  - public/
  - src/
    - App.tsx          # کد اصلی رابط کاربری
  - Dockerfile         # فایل داکر برای فرانت‌اند
- database/
  - init.sql           # اسکریپت اولیه برای ایجاد جداول دیتابیس
- nginx/
  - nginx.conf         # پیکربندی Nginx برای متعادل‌سازی بار
- docker-compose.yml   # تنظیمات اصلی داکر کامپوز



## اجزای پروژه
### ۱. بک‌اند
- **زبان:** تایپ‌اسکریپت با Node.js و Express
- **عملکرد:** ارائه API با عملیات CRUD برای مدیریت "items" که شامل نام و توضیحات هستند.
- **پورت:** 8080
- **دیتابیس:** متصل به PostgreSQL برای ذخیره اطلاعات.

### ۲. فرانت‌اند
- **فریم‌ورک:** React.js
- **عملکرد:** رابط کاربری برای مدیریت "items" با ارتباط از طریق API.
- **پورت:** 8081 (سرو شده توسط Nginx)

### ۳. دیتابیس
- **سیستم:** PostgreSQL
- **عملکرد:** ذخیره داده‌های مربوط به آیتم‌ها.
- **پیکربندی:** شامل اسکریپت اولیه برای ایجاد جدول.

### ۴. Nginx
- **عملکرد:** 
  - سرو کردن فرانت‌اند React.
  - متعادل‌سازی بار بین چندین نمونه از بک‌اند.
- **پورت:** 8082

## پاسخ به سوالات پایانی
### ۱. مفهوم Stateless
مفهوم **Stateless** به این معناست که هر درخواست از کلاینت به سرور مستقل است و اطلاعات مربوط به وضعیت کاربر (state) در سمت سرور نگهداری نمی‌شود.  
این ویژگی در معماری مایکروسرویس بسیار مفید است، زیرا:
- امکان مقیاس‌پذیری راحت‌تر وجود دارد.
- هر سرویس به‌طور مستقل از دیگر سرویس‌ها کار می‌کند.
- کاهش پیچیدگی ذخیره اطلاعات وضعیت در سمت سرور.

### ۲. تفاوت‌های Load Balancing در لایه ۴ و ۷
#### لایه ۴ (Transport Layer):
- داده‌ها را در سطح پروتکل‌های TCP یا UDP متعادل می‌کند.
- سریع‌تر است زیرا تنها آدرس IP و پورت را بررسی می‌کند.
- برای برنامه‌هایی که نیاز به بازبینی محتوای درخواست ندارند مناسب است.

#### لایه ۷ (Application Layer):
- داده‌ها را در سطح پروتکل HTTP/HTTPS متعادل می‌کند.
- می‌تواند محتوای درخواست (مانند URL یا هدرها) را بررسی کند.
- انعطاف‌پذیرتر و مناسب برای برنامه‌های وب است.

### ۳. در این پروژه از کدام لایه Load Balancing استفاده شده است؟ چرا؟
در این پروژه از **لایه ۷** برای متعادل‌سازی بار استفاده شده است، زیرا:
- نیاز به بررسی URL درخواست‌ها برای تمایز بین فایل‌های استاتیک (React) و API بود.
- انعطاف‌پذیری بیشتری برای هدایت درخواست‌ها بر اساس محتوای درخواست فراهم می‌کند.
- مناسب برای معماری وب مدرن است که شامل فایل‌های استاتیک و سرویس‌های دینامیک می‌باشد.