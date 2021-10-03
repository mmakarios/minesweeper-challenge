from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Board
from .serializers import BoardSerializer, NewBoardSerializer


class BoardViews(viewsets.ViewSet):
    def create(self, request):
        inputSerializer = NewBoardSerializer(data=request.data)
        if not inputSerializer.is_valid(raise_exception=True):
            return Response(status=status.HTTP_400_BAD_REQUEST)

        rows = inputSerializer.validated_data.get("rows")
        columns = inputSerializer.validated_data.get("columns")
        mines = inputSerializer.validated_data.get("mines")

        new_board = Board()
        new_board.fill_board(rows, columns, mines)
        new_board.save()

        serializer = BoardSerializer(new_board)

        return Response(serializer.data, status=status.HTTP_201_CREATED)
