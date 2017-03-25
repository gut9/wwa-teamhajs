from rest_framework import serializers

from api.models import SellerUser, SellerRating, Averages, Feedbacks


class AveragesSerializer(serializers.ModelSerializer):

    class Meta:
        model = Averages
        fields = ('pk', 'title', 'rating')


class SellerRatingSerializer(serializers.ModelSerializer):
    averages_set = AveragesSerializer('averages_set', many=True)

    class Meta:
        model = SellerRating
        fields = ('pk', 'count', 'averages_set')


class FeedbackSerializer(serializers.Serializer):

    class Meta:
        model = Feedbacks
        fields = ('all', 'positives', 'neutrals', 'negatives')


class SellerUserSerializer(serializers.ModelSerializer):
    sellerRatings = SellerRatingSerializer('sellerRatings', many=False)
    feedbacks = FeedbackSerializer('feedbacks', many=True)

    class Meta:
        model = SellerUser
        fields = ('UserId', 'login', 'country', 'rating', 'ratingIcon', 'company', 'allegroStandard',
                  'sellerRatings', 'feedbacks', 'saleRegulations')