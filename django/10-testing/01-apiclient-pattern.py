"""
TEMA: APIClient smoke pattern
"""

# from rest_framework.test import APIClient, APITestCase
#
# class ProjectApiTests(APITestCase):
#     def setUp(self):
#         self.user = User.objects.create_user("a@b.com", password="x")
#         self.client = APIClient()
#
#     def test_list_requires_auth(self):
#         res = self.client.get("/api/projects/")
#         self.assertEqual(res.status_code, 401)
#
#     def test_list_ok(self):
#         self.client.force_authenticate(self.user)
#         res = self.client.get("/api/projects/")
#         self.assertEqual(res.status_code, 200)
