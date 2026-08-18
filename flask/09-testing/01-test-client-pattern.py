"""
TEMA: pytest + Flask test_client (patrón)
"""

# pip install pytest flask

def test_health(client):
    # client = app.test_client() via fixture
    res = client.get("/health")
    assert res.status_code == 200
    assert res.get_json()["status"] == "ok"


def test_projects_unauthorized(client):
    res = client.get("/api/projects")
    assert res.status_code == 401
