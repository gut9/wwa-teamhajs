from django.db import models


# Create your models here.
class SellerRating(models.Model):
    count = models.IntegerField()

    def __unicode__(self):
        return str(self.count)


class Averages(models.Model):
    title = models.TextField()
    rating = models.FloatField()
    sellerRating = models.ForeignKey(SellerRating)

    def __unicode__(self):
        return str(self.title)


class PositiveFeedbacks(models.Model):
    lastWeek = models.IntegerField()
    lastMonth = models.IntegerField()
    all = models.IntegerField()
    asSeller = models.IntegerField()
    asBuyer = models.IntegerField()
    percentage = models.FloatField()

    def __unicode__(self):
        return str(self.all)


class NeutralFeedbacks(models.Model):
    lastWeek = models.IntegerField()
    lastMonth = models.IntegerField()
    all = models.IntegerField()
    asSeller = models.IntegerField()
    asBuyer = models.IntegerField()
    percentage = models.FloatField()

    def __unicode__(self):
        return str(self.all)


class NegativeFeedbacks(models.Model):
    lastWeek = models.IntegerField()
    lastMonth = models.IntegerField()
    all = models.IntegerField()
    asSeller = models.IntegerField()
    asBuyer = models.IntegerField()
    percentage = models.FloatField()

    def __unicode__(self):
        return str(self.all)


class Feedbacks(models.Model):
    all = models.IntegerField()
    positive = models.ForeignKey(PositiveFeedbacks)
    neutral = models.ForeignKey(NeutralFeedbacks)
    negative = models.ForeignKey(NegativeFeedbacks)

    def __unicode__(self):
        return str(self.all)


class SellerUser(models.Model):
    UserId = models.TextField()
    isActive = models.BooleanField()
    login = models.TextField()
    country = models.IntegerField()
    rating = models.IntegerField()
    ratingIcon = models.IntegerField()
    company = models.BooleanField()
    allegroStandard = models.BooleanField()
    sellerRatings = models.ForeignKey(SellerRating)
    feedbacks = models.ForeignKey(Feedbacks)
    saleRegulations = models.TextField()

    def __unicode__(self):
        return str(self.login)


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
    owner = models.ForeignKey(SellerUser)

    def __unicode__(self):
        return str(self.name)


class Message(models.Model):
    originUserId = models.TextField()
    destOfferId = models.TextField()
    text = models.TextField()
    date = models.DateTimeField()
    read = models.BooleanField()

    def __unicode__(self):
        return str(self.originUserId)