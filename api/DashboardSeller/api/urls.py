from django.conf.urls import url

from api import views
app_name = 'api'
urlpatterns = [
    url(r'^getUser/', views.GetUser.as_view(), name='getUser'),
    url(r'^login/', views.LoginPerform.as_view(), name='login')
]