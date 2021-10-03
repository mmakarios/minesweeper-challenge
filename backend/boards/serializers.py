from rest_framework import serializers

from .models import Board


class BoardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Board
        fields = ("id", "status", "boxes")

    boxes = serializers.SerializerMethodField()

    def get_boxes(self, board):
        boxes = board.boxes.get("data")
        for i, row in enumerate(boxes):
            for j, column in enumerate(row):
                if boxes[i][j]["state"] != "opened":
                    boxes[i][j]["value"] = ""
        return boxes


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


class SelectBoxSerializer(serializers.Serializer):
    box = serializers.IntegerField(min_value=0, required=True)

    def validate_box(self, value):
        boxes = self.context.get("boxes", {}).get("data")
        board_area = len(boxes) * len(boxes[0])
        if value >= board_area:
            raise serializers.ValidationError(
                "Select box is greater or equal to the number of boxes."
            )
        return value
