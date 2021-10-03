from django.db import models
from random import choice
import uuid
import random
from enum import Enum


class BoxStates(str, Enum):
    UNOPENED = "unopened"
    OPENED = "opened"
    FLAGGED = "flagged"


BOX_MINE_INDICATOR = "m"

POTENTIAL_NEIGHBORS = [
    [0, 1],
    [0, -1],
    [1, 1],
    [1, -1],
    [1, 0],
    [-1, 1],
    [-1, -1],
    [-1, 0],
]


class Board(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    boxes = models.JSONField()

    def save(self, *args, **kwargs):
        if not self.boxes:
            self.fill_board()
        super(Board, self).save(*args, **kwargs)

    def fill_board(self, rows_amount, columns_amount, mines_amount):
        boxes = []

        for i in range(rows_amount):
            boxes.append([])
            for j in range(columns_amount):
                boxes[i].append({"value": 0, "state": BoxStates.UNOPENED})

        self.boxes = {}
        self.boxes["data"] = boxes

        self.update_boxes_with_mines(mines_amount)

    def box_to_position(self, box):
        columns_amount = len(self.boxes.get("data")[0])
        row = box // columns_amount
        column = box - (row * columns_amount)
        return [row, column]

    def update_boxes_with_mines(self, mines_amount):
        new_boxes = self.boxes.get("data")
        rows_amount = len(new_boxes)
        columns_amount = len(new_boxes[0])
        mines_positions = random.sample(
            range(rows_amount * columns_amount), mines_amount
        )

        for i, mine in enumerate(mines_positions):
            mines_positions[i] = self.box_to_position(mine)

        for i, mine in enumerate(mines_positions):
            y = int(mine[0])
            x = int(mine[1])
            new_boxes[y][x]["value"] = BOX_MINE_INDICATOR

            for potential_neighbor in POTENTIAL_NEIGHBORS:
                neighbor_row = y + potential_neighbor[0]
                neighbor_column = x + potential_neighbor[1]
                is_valid_row = neighbor_row >= 0 and neighbor_row < rows_amount
                is_valid_column = (
                    neighbor_column >= 0 and neighbor_column < columns_amount
                )
                if (
                    not is_valid_row
                    or not is_valid_column
                    or new_boxes[neighbor_row][neighbor_column]["value"]
                    == BOX_MINE_INDICATOR
                ):
                    continue
                new_boxes[neighbor_row][neighbor_column]["value"] += 1

        self.boxes["data"] = new_boxes

    # TODO: Implement this
    def open(self, box):
        position = self.box_to_position(box)

    def flag(self, box):
        position = self.box_to_position(box)
        new_boxes = self.boxes.get("data")
        box_data = new_boxes[position[0]][position[1]]
        if box_data.get("state") == BoxStates.OPENED:
            return
        if box_data.get("state") == BoxStates.FLAGGED:
            box_data["state"] = BoxStates.UNOPENED
        else:
            box_data["state"] = BoxStates.FLAGGED
        new_boxes[position[0]][position[1]] = box_data
        self.boxes["data"] = new_boxes
        self.save()

    # TODO: Implement this
    def is_finished():
        return False
