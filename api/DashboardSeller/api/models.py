from channels import Group
from django.db import models


# Create your models here.
from rest_framework.renderers import JSONRenderer


class SellerRating(models.Model):
    count = models.IntegerField()

    def __unicode__(self):
        return str(self.count)


class Averages(models.Model):
    title = models.TextField()
    rating = models.FloatField()
    sellerRating = models.ForeignKey(SellerRating, null=True, blank=True)

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
    all = models.IntegerField(null=True, blank=True)
    positive = models.ForeignKey(PositiveFeedbacks)
    neutral = models.ForeignKey(NeutralFeedbacks)
    negative = models.ForeignKey(NegativeFeedbacks)

    def __unicode__(self):
        return str(self.all)


class SellerUser(models.Model):
    UserId = models.TextField()
    isActive = models.BooleanField(default=False)
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
    roomId = models.TextField()
    offerId = models.TextField()
    originUserId = models.TextField()
    text = models.TextField()
    date = models.DateTimeField()
    read = models.BooleanField()

    def __unicode__(self):
        return str(self.originUserId)

    def save(self, **kwargs):
        super(Message, self).save()
        Group("%s" % self.originUserId).send({'text': JSONRenderer().render({'data': {'clientId': self.originUserId, 'message': self.text}})})


class TestMessage(models.Model):
    sellerId = models.TextField()
    clientId = models.TextField()
    message = models.TextField()

    def save(self, **kwargs):
        super(TestMessage, self).save()
        Group("%s" % "1").send({'text': JSONRenderer().render({'data': {'clientId': self.clientId, 'message': self.message}})})


class FrequentlyAskedQuestions(models.Model):
    user = models.ForeignKey(SellerUser)
    offer = models.ForeignKey(Offer)
    question = models.TextField()
    answer = models.TextField()