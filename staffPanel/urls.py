from django.urls import path
from . import views
from django.contrib.auth import views as auth_views
from django.conf.urls import url,include
urlpatterns = [
    path('', views.staffPanel,name="staffPanel"),
    path('verification', views.verification,name="verification"),
    path('userQueries', views.userQueries,name="userQueries"),
    path('fetch_query', views.fetch_query,name="fetch_query"),
    path('markasAns', views.markasAns,name="markasAns"),  
    path('hometutors', views.hometutors,name="hometutors"),  
    path('verifyhometutors', views.verifyhometutors,name="verifyhometutors"),  
]