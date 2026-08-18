"""
TEMA: JWT mental model con DRF (estudio)
"""

JWT_FLOW = """
1. POST /api/auth/login/  → { access, refresh }
2. Client: Authorization: Bearer <access>
3. View: permission_classes = [IsAuthenticated]
4. Invalid/missing token → 401
"""

# from rest_framework.permissions import IsAuthenticated
# from rest_framework.views import APIView
#
# class MeView(APIView):
#     permission_classes = [IsAuthenticated]
#
#     def get(self, request):
#         return Response({"id": request.user.id, "email": request.user.email})
