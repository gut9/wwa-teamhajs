from django.conf.urls import url

from api import views
app_name = 'api'
urlpatterns = [
    url(r'^getUser/', views.GetUser.as_view(), name='getUser'),
    url(r'^login/', views.LoginPerform.as_view(), name='login'),
    url(r'^messages/', views.ManageMessages.as_view(), name='messages'),
    url(r'^messagesToRoom/', views.GetMessagesForRoom.as_view(), name='messagesToRoom'),
    url(r'^hourStats/', views.HourStatisticsGetter.as_view(), name='hourStats'),
    url(r'^auctions/', views.GetAuctions.as_view(), name='auctions'),
    url(r'^auctionDetails/', views.AuctionDetails.as_view(), name='auctions'),
    url(r'^getStats/', views.GetVisitStatistics.as_view(), name='auctions'),
    url(r'^getFrequentlyAskedQuestions/', views.GetFrequentlyAskedQuestions.as_view(), name='frequentlyAskedQuestions'),
    url(r'^21956707/', views.ClientMessenger.as_view(), name='clientMessenger')
]