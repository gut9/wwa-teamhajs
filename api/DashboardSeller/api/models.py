from django.db import models


# Create your models here.
class SellerRating(models.Model):
    count = models.IntegerField()


class Averages(models.Model):
    title = models.TextField()
    rating = models.FloatField()
    sellerRating = models.ForeignKey(SellerRating)


class PositiveFeedbacks(models.Model):
    lastWeek = models.IntegerField()
    lastMonth = models.IntegerField()
    all = models.IntegerField()
    asSeller = models.IntegerField()
    asBuyer = models.IntegerField()
    percentage = models.FloatField()


class NeutralFeedbacks(models.Model):
    lastWeek = models.IntegerField()
    lastMonth = models.IntegerField()
    all = models.IntegerField()
    asSeller = models.IntegerField()
    asBuyer = models.IntegerField()
    percentage = models.FloatField()


class NegativeFeedbacks(models.Model):
    lastWeek = models.IntegerField()
    lastMonth = models.IntegerField()
    all = models.IntegerField()
    asSeller = models.IntegerField()
    asBuyer = models.IntegerField()
    percentage = models.FloatField()


class Feedbacks(models.Model):
    all = models.IntegerField
    positive = models.ForeignKey(PositiveFeedbacks)
    neutral = models.ForeignKey(NeutralFeedbacks)
    negative = models.ForeignKey(NegativeFeedbacks)


class User(models.Model):
    UserId = models.TextField()
    login = models.TextField()
    country = models.IntegerField()
    rating = models.IntegerField()
    ratingIcon = models.IntegerField()
    company = models.BooleanField()
    allegroStandard = models.BooleanField()
    sellerRatings = models.ForeignKey(SellerRating)
    feedbacks = models.ForeignKey(Feedbacks)
    saleRegulations = models.TextField()


class Offer(models.Model):
    offerId = models.TextField()
    name = models.TextField()
    buyNow = models.BooleanField()
    auction = models.BooleanField()
    pricesBid = models.FloatField()
    pricesBuyNow = models.FloatField()
    standardAllegro = models.BooleanField()
    bidsCount = models.IntegerField()
    category = models.IntegerField()
    note = models.TextField()
    watchersCount = models.IntegerField()
    withoutFinishDate = models.BooleanField()
    owner = models.ForeignKey(User)


class Message(models.Model):
    fromUser = models.ForeignKey(User)
    destOffer = models.ForeignKey(Offer)
    text = models.TextField()
    date = models.DateField()
    read = models.BooleanField()