from django.shortcuts import get_object_or_404
from rest_framework import viewsets, status, serializers
from rest_framework.response import Response
from rest_framework.decorators import action

from .models import Board
from .serializers import BoardSerializer, NewBoardSerializer, SelectBoxSerializer


class BoardViews(viewsets.ViewSet):
    queryset = Board.objects.all()

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

    def retrieve(self, request, pk=None):
        id = serializers.UUIDField().to_internal_value(data=pk)
        board = get_object_or_404(self.queryset, pk=id)
        serializer = BoardSerializer(board)
        return Response(serializer.data)

    @action(detail=True, methods=["patch"])
    def flag(self, request, pk=None):
        id = serializers.UUIDField().to_internal_value(data=pk)
        board = get_object_or_404(self.queryset, pk=id)
        inputSerializer = SelectBoxSerializer(
            data=request.data, context={"boxes": board.boxes}
        )
        if not inputSerializer.is_valid(raise_exception=True):
            return Response(status=status.HTTP_400_BAD_REQUEST)
        box = inputSerializer.validated_data.get("box")
        board.flag(box)
        serializer = BoardSerializer(board)
        return Response(serializer.data)

    @action(detail=True, methods=["patch"])
    def open(self, request, pk=None):
        id = serializers.UUIDField().to_internal_value(data=pk)
        board = get_object_or_404(self.queryset, pk=id)
        inputSerializer = SelectBoxSerializer(
            data=request.data, context={"boxes": board.boxes}
        )
        if not inputSerializer.is_valid(raise_exception=True):
            return Response(status=status.HTTP_400_BAD_REQUEST)
        box = inputSerializer.validated_data.get("box")
        # board.open(box)
        serializer = BoardSerializer(board)
        return Response(serializer.data)
