from rest_framework import serializers

from api.DashboardSeller.api.models import Averages

from api.DashboardSeller.api.models import User


class AverageSerializer(serializers.ModelSerializer):

    class Meta:
        model = Averages
        fields = {'title', 'rating'}


class SellerRatingSerializer(serializers.ModelSerializer):
    count = serializers.IntegerField()
    averages =


class UserSerializer(serializers.Serializer):
    consumer_set = CustomerSerializer('consumer_set', many=True)

    class Meta:
        model = User
        fields = ()