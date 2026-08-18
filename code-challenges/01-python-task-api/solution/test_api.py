import pytest

from app import User, app, create_app, db


@pytest.fixture()
def client(tmp_path):
    test_app = create_app()
    test_app.config["SQLALCHEMY_DATABASE_URI"] = f"sqlite:///{tmp_path / 'test.db'}"
    test_app.config["TESTING"] = True
    with test_app.app_context():
        db.drop_all()
        db.create_all()
    return test_app.test_client()


def test_login_success(client):
    client.post("/api/auth/register", json={"email": "a@test.com", "password": "Secret123!"})
    res = client.post("/api/auth/login", json={"email": "a@test.com", "password": "Secret123!"})
    assert res.status_code == 200
    assert "access_token" in res.get_json()


def test_create_task_unauthorized(client):
    res = client.post("/api/tasks", json={"title": "Hello world"})
    assert res.status_code == 401
