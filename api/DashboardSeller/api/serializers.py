from rest_framework import serializers

from api.models import SellerUser, SellerRating, Averages


class AveragesSerializer(serializers.ModelSerializer):

    class Meta:
        model = Averages
        fields = ('title', 'rating')


class SellerRatingSerializer(serializers.ModelSerializer):
    averages_set = AveragesSerializer('averages_set', many=True)

    class Meta:
        model = SellerRating
        fields = ('count', 'averages_set')


class SellerUserSerializer(serializers.ModelSerializer):
    sellerRatings = SellerRatingSerializer('sellerRatings', many=False)
    class Meta:
        model = SellerUser
        fields = ('UserId', 'login', 'country', 'rating', 'ratingIcon', 'company', 'allegroStandard',
                  'sellerRatings', 'feedbacks', 'saleRegulations')