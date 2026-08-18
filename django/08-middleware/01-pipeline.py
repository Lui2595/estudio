"""
TEMA: Pipeline middleware (orden conceptual)
"""

MIDDLEWARE_PIPELINE = [
    "SecurityMiddleware",
    "SessionMiddleware",
    "CommonMiddleware",
    "CsrfViewMiddleware",
    "AuthenticationMiddleware",  # pone request.user
    "MessageMiddleware",
    "XFrameOptionsMiddleware",
]

# Request entra arriba → abajo hasta la view
# Response sale view → arriba otra vez
