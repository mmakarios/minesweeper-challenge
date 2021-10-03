from django.db import models
from random import choice
import uuid
import random
from enum import Enum


class BoardStatus(int, Enum):
    ACTIVE = 0
    WON = 1
    LOST = 2


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
    status = models.IntegerField(
        choices=[
            (BoardStatus.ACTIVE, "Active"),
            (BoardStatus.WON, "Won"),
            (BoardStatus.LOST, "Lost"),
        ],
        default=BoardStatus.ACTIVE,
    )
    mines_amount = models.IntegerField(default=0)
    boxes_opened = models.IntegerField(default=0)

    def save(self, *args, **kwargs):
        if not self.boxes:
            self.fill_board()
        super(Board, self).save(*args, **kwargs)

    def setup_board(self, rows_amount, columns_amount, mines_amount):
        boxes = []

        for i in range(rows_amount):
            boxes.append([])
            for j in range(columns_amount):
                boxes[i].append({"value": 0, "state": BoxStates.UNOPENED})

        self.boxes = {}
        self.boxes["data"] = boxes
        self.mines_amount = mines_amount

        self.update_boxes_with_mines()

    def box_to_position(self, box):
        columns_amount = len(self.boxes.get("data")[0])
        row = box // columns_amount
        column = box - (row * columns_amount)
        return [row, column]

    def update_boxes_with_mines(self):
        new_boxes = self.boxes.get("data")
        rows_amount = len(new_boxes)
        columns_amount = len(new_boxes[0])
        mines_positions = random.sample(
            range(rows_amount * columns_amount), self.mines_amount
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

    def open(self, box):
        position = self.box_to_position(box)
        new_boxes = self.boxes.get("data")
        box_data = new_boxes[position[0]][position[1]]
        if box_data.get("state") == BoxStates.OPENED:
            return
        if box_data.get("value") == BOX_MINE_INDICATOR:
            self.lost()
        else:
            # TODO: Expand all blank boxes
            if self.is_finished:
                self.won()
        self.save()

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

    @property
    def is_finished(self):
        boxes = self.boxes.get("data")
        board_area = len(boxes) * len(boxes[0])
        return board_area == self.mines_amount + self.boxes_opened

    def won(self):
        self.status = BoardStatus.WON

    def lost(self):
        self.status = BoardStatus.LOST
