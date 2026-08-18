"""
ENTREVISTA VOZ: "How do you structure a FastAPI endpoint with validation and auth?"

Responde en voz (inglés):
- Pydantic schemas validate input/output
- Dependency injection for DB session and current user
- Business logic in service layer, not in route
"""

from datetime import datetime, timedelta
from typing import Optional

from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from passlib.context import CryptContext
from pydantic import BaseModel, EmailStr, Field

app = FastAPI()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

SECRET_KEY = "change-me-in-production"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 15


# --- Schemas (Pydantic) ---
class UserCreate(BaseModel):
    email: EmailStr
    password: str = Field(min_length=8)


class UserResponse(BaseModel):
    id: int
    email: EmailStr

    class Config:
        from_attributes = True


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"


# --- Auth helpers ---
def verify_password(plain: str, hashed: str) -> bool:
    return pwd_context.verify(plain, hashed)


def create_access_token(user_id: int) -> str:
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    payload = {"sub": str(user_id), "exp": expire}
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)


async def get_current_user(token: str = Depends(oauth2_scheme)) -> dict:
    """Dependency: decode JWT and return user — used on protected routes."""
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id = payload.get("sub")
        if user_id is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    # In real app: fetch user from DB
    return {"id": int(user_id), "email": "user@example.com"}


# --- Routes ---
@app.post("/users", response_model=UserResponse, status_code=201)
async def create_user(body: UserCreate):
    """ENTREVISTA: Never return password hash in response_model."""
    hashed = pwd_context.hash(body.password)
    # save to DB...
    return UserResponse(id=1, email=body.email)


@app.post("/token", response_model=Token)
async def login(email: str, password: str):
    # validate credentials against DB
    token = create_access_token(user_id=1)
    return Token(access_token=token)


@app.get("/me", response_model=UserResponse)
async def read_me(current_user: dict = Depends(get_current_user)):
    """Protected route — Depends injects authenticated user."""
    return UserResponse(id=current_user["id"], email=current_user["email"])
