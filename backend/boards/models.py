from django.db import models
from random import choice
import uuid
import random

# TODO: create board using some difficulty parameter to create boxes
# TODO: create constants
class Board(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    boxes = models.JSONField()

    def save(self, *args, **kwargs):
        if not self.boxes:
            self.fill_board()
        super(Board, self).save(*args, **kwargs)

    def fill_board(self):
        mines_amount = 3
        rows_amount = 3
        columns_amount = 4
        new_boxes = []

        for i in range(rows_amount):
            new_boxes.append([])
            for j in range(columns_amount):
                new_boxes[i].append({"value": 0, "state": "unopened"})

        new_boxes = self.update_boxes_with_mines(
            mines_amount, rows_amount, columns_amount, new_boxes
        )

        self.boxes = {}
        self.boxes["data"] = new_boxes

    def update_boxes_with_mines(
        self, mines_amount, rows_amount, columns_amount, new_boxes
    ):
        mines_positions = random.sample(
            range(rows_amount * columns_amount), mines_amount
        )

        for i, mine in enumerate(mines_positions):
            row = mine // columns_amount
            column = mine - (row * columns_amount)
            mines_positions[i] = [row, column]

        for i, mine in enumerate(mines_positions):
            y = int(mine[0])
            x = int(mine[1])
            new_boxes[y][x]["value"] = "m"

            # Top row
            if y > 0:
                # Top
                if new_boxes[y - 1][x]["value"] != "m":
                    new_boxes[y - 1][x]["value"] += 1
                # Top left
                if x > 0 and new_boxes[y - 1][x - 1]["value"] != "m":
                    new_boxes[y - 1][x - 1]["value"] += 1
                # Top right
                if x < columns_amount - 1 and new_boxes[y - 1][x + 1]["value"] != "m":
                    new_boxes[y - 1][x + 1]["value"] += 1

            if y < rows_amount - 1:
                # Bottom
                if new_boxes[y + 1][x]["value"] != "m":
                    new_boxes[y + 1][x]["value"] += 1
                # Bottom left
                if x > 0 and new_boxes[y + 1][x - 1]["value"] != "m":
                    new_boxes[y + 1][x - 1]["value"] += 1
                # Bottom right
                if x < columns_amount - 1 and new_boxes[y + 1][x + 1]["value"] != "m":
                    new_boxes[y + 1][x + 1]["value"] += 1

            if x > 0 and new_boxes[y][x - 1]["value"] != "m":
                # Left
                new_boxes[y][x - 1]["value"] += 1

            if x < columns_amount - 1 and new_boxes[y][x + 1]["value"] != "m":
                # Right
                new_boxes[y][x + 1]["value"] += 1

        return new_boxes
