---
layout: post
title: My Django & Mongodb way
---

<p>Bài post này là một nhật kí trên con đường đến với đám cưới của Django và Mongodb. Dưới đây là các bước để viết một app dạng blog đơn giản bằng cách sử dụng combo Django + Mongodb.</p>
<p>Trước tiên cần phải cài đặt Django, mongodb, Pymongo và mongoengine</p>
<p>Tạo một project django mới để bắt đầu:</p>
{% highlight bash %}
$ django-admin.py startproject testsite
{% endhighlight %}
<p>Tiếp theo tạo app mới bên trong project:</p>
{% highlight bash %}
$ python manage.py startapp testapp
{% endhighlight %}
<p>Mở file testsite/settings.py để thêm app mới tạo và django_extensions vào project (tìm và cài django_extensions):</p>
{% highlight python %}
INSTALLED_APPS = (
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.sites',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'testapp',
    'django_extensions',
)
{% endhighlight %}
<p>Thêm thiết lập để kết nối với mongodb:</p>
{% highlight python %}
AUTHENTICATION_BACKENDS = (
    'mongoengine.django.auth.MongoEngineBackend',
)

SESSION_ENGINE = 'mongoengine.django.sessions'
# Your database name
MONGO_DATABASE_NAME = 'testapp_db'
# Connect to database
from mongoengine import connect
connect(MONGO_DATABASE_NAME)
{% endhighlight %}
<p>Thêm các thiết lập đường dẫn cho project:</p>
{% highlight python %}
import os
BASE_DIR = os.path.dirname(os.path.dirname(__file__))

PROJECT_ROOT = os.path.abspath(os.path.dirname(__file__))

STATIC_ROOT = os.path.join(PROJECT_ROOT, '..', 'static')

STATICFILES_FINDERS = (
    'django.contrib.staticfiles.finders.FileSystemFinder',
    'django.contrib.staticfiles.finders.AppDirectoriesFinder',
#    'django.contrib.staticfiles.finders.DefaultStorageFinder',
)

TEMPLATE_LOADERS = (
    'django.template.loaders.filesystem.Loader',
    'django.template.loaders.app_directories.Loader',
#     'django.template.loaders.eggs.Loader',
)

TEMPLATE_DIRS = (
    os.path.join(PROJECT_ROOT, 'templates'),
    # Put strings here, like "/home/html/django_templates" or "C:/www/django/templates".
    # Always use forward slashes, even on Windows.
    # Don't forget to use absolute paths, not relative paths.
)

STATIC_URL = '/static/'

STATICFILES_DIRS = (
    os.path.join(PROJECT_ROOT, 'static'),
    # Put strings here, like "/home/html/static" or "C:/www/django/static".
    # Always use forward slashes, even on Windows.
    # Don't forget to use absolute paths, not relative paths.
)
{% endhighlight %}