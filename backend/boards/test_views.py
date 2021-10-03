from django.test import TestCase
from rest_framework.test import RequestsClient
from .models import Board, BoxStates
import json


class BoardsModelsTestCase(TestCase):
    client = RequestsClient()

    def test_create_board(self):
        data = json.dumps({"mines": 2, "rows": 3, "columns": 3})
        response = self.client.post(
            "/boards/",
            data=data,
            format="json",
            content_type="application/json",
        )
        response_content = json.loads(response.content)
        self.assertEqual(response.status_code, 201)
        self.assertIn("id", response_content)
        self.assertIsNotNone(response_content.get("boxes"))

    def test_retrieve_board(self):
        data = json.dumps({"mines": 2, "rows": 3, "columns": 3})
        response = self.client.post(
            "/boards/",
            data=data,
            format="json",
            content_type="application/json",
        )
        response_content = json.loads(response.content)
        response = self.client.get("/boards/" + response_content["id"] + "/")
        response_content = json.loads(response.content)
        # print(response_content)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response_content.get("status"), 0)
        self.assertIn("id", response_content)
        self.assertIsNotNone(response_content.get("boxes"))

    def test_flag_box(self):
        data = json.dumps({"mines": 2, "rows": 3, "columns": 3})
        response = self.client.post(
            "/boards/",
            data=data,
            format="json",
            content_type="application/json",
        )
        response_content = json.loads(response.content)

        data = json.dumps({"box": 0})
        response = self.client.patch(
            "/boards/" + response_content["id"] + "/flag/",
            data=data,
            format="json",
            content_type="application/json",
        )

        response_content = json.loads(response.content)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response_content.get("status"), 0)
        self.assertIn("id", response_content)
        self.assertIsNotNone(response_content.get("boxes"))
        self.assertEqual(
            response_content.get("boxes")[0][0]["state"], BoxStates.FLAGGED
        )

    def test_open_box(self):
        data = json.dumps({"mines": 2, "rows": 3, "columns": 3})
        response = self.client.post(
            "/boards/",
            data=data,
            format="json",
            content_type="application/json",
        )
        response_content = json.loads(response.content)

        data = json.dumps({"box": 0})
        response = self.client.patch(
            "/boards/" + response_content["id"] + "/open/",
            data=data,
            format="json",
            content_type="application/json",
        )
        response_content = json.loads(response.content)

        self.assertEqual(response.status_code, 200)
        self.assertIn("id", response_content)
        self.assertIsNotNone(response_content.get("boxes"))
        self.assertEqual(response_content.get("boxes")[0][0]["state"], BoxStates.OPENED)

    def test_remake_board(self):
        data = json.dumps({"mines": 2, "rows": 3, "columns": 3})
        response = self.client.post(
            "/boards/",
            data=data,
            format="json",
            content_type="application/json",
        )
        response_content = json.loads(response.content)

        response = self.client.post(
            "/boards/" + response_content["id"] + "/remake/",
            data=data,
            format="json",
            content_type="application/json",
        )

        response_content = json.loads(response.content)

        self.assertEqual(response.status_code, 201)
        self.assertIn("id", response_content)
        self.assertIsNotNone(response_content.get("boxes"))
