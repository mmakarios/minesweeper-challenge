from rest_framework import serializers

from .models import Board


class BoardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Board
        fields = ("id", "boxes")


class NewBoardSerializer(serializers.Serializer):
    rows = serializers.IntegerField(min_value=1, max_value=9, required=True)
    columns = serializers.IntegerField(min_value=1, max_value=9, required=True)
    mines = serializers.IntegerField(min_value=1, required=True)

    def validate_mines(self, value):
        board_area = self.initial_data.get("rows") * self.initial_data.get("columns")
        if value >= board_area:
            raise serializers.ValidationError(
                "Number of mines is greater or equal to the number of boxes."
            )
        return value
