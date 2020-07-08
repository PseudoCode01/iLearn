"""iLearn URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url
from django.contrib import admin
from django.urls import path,include
from django.contrib.auth import views as auth_views
from django.conf import settings
from django.conf.urls.static import static
from django.urls import (get_resolver,get_urlconf,resolve,reverse,NoReverseMatch)


urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^', include('django.contrib.auth.urls')),
    path('', include('home.urls')),
    path('staff/', include('staffPanel.urls')),
   
    path(r'reset_password/',
     auth_views.PasswordResetView.as_view(template_name='home/password_reset.html'),
     name="reset_password"),

    path(r'reset_password_sent/', 
    auth_views.PasswordResetDoneView.as_view(template_name='home/password_reset_done.html'), 
    name="password_reset_done"),

    path(r'password_reset_confirm/<uidb64>/<token>/',
     auth_views.PasswordResetConfirmView.as_view(), 
     name="password_reset_confirm"),
     
    path(r'reset_password_complete/', 
        auth_views.PasswordResetCompleteView.as_view(template_name='home/password_reset_complete.html'), 
        name="password_reset_complete"),
  
]
if settings.DEBUG:
    urlpatterns+= static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)
