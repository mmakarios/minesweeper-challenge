from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Board


class BoardViews(viewsets.ViewSet):
    def create(self, request):
        new_board = Board()
        new_board.save()

        return Response(new_board.boxes)
