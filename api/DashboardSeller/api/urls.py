from django.conf.urls import url

from api import views
app_name = 'api'
urlpatterns = [
    #url(r'^getRestaurant/(?P<id>\w{0,50})/$', views.GetRestaurant.as_view(), name='getRestaurant'),
    url(r'^getUser/', views.GetUser.as_view(), name='getUser')
]