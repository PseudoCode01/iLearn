from django.urls import path
from . import views
from django.contrib.auth import views as auth_views
from django.conf.urls import url,include
urlpatterns = [
    path('', views.staffPanel,name="staffPanel"),
    path('verification', views.verification,name="verification"),
    path('userQueries', views.userQueries,name="userQueries"),
]