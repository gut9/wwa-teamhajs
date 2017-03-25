from rest_framework import serializers

from api.models import SellerUser, SellerRating, Averages, Feedbacks, Message, Offer


class AveragesSerializer(serializers.ModelSerializer):

    class Meta:
        model = Averages
        fields = ('pk', 'title', 'rating')


class SellerRatingSerializer(serializers.ModelSerializer):
    averages_set = AveragesSerializer('averages_set', many=True)

    class Meta:
        model = SellerRating
        fields = ('pk', 'count', 'averages_set')


class FeedbackSerializer(serializers.ModelSerializer):

    class Meta:
        model = Feedbacks
        fields = ('all', 'positive', 'neutral', 'negative')


class SellerUserSerializer(serializers.ModelSerializer):
    sellerRatings = SellerRatingSerializer('sellerRatings', many=False)
    feedbacks = FeedbackSerializer('feedbacks', many=False)

    class Meta:
        model = SellerUser
        fields = ('UserId', 'isActive', 'login', 'country', 'rating', 'ratingIcon', 'company', 'allegroStandard',
                  'sellerRatings', 'feedbacks', 'saleRegulations')


class OfferSerializer(serializers.ModelSerializer):
    # owner nie dziala
    # owner = SellerUserSerializer('sellerUser', many=False)


    class Meta:
        model = Offer
        fields = ['offerId', 'name', 'buyNow', 'auction', 'pricesBid', 'pricesBuyNow', 'standardAllegro', 'bidsCount',
                  'category', 'note', 'watchersCount', 'withoutFinishDate' ]



class MessageSerializer(serializers.ModelSerializer):

    class Meta:
        model = Message
        fields = ['text', 'date', 'read']