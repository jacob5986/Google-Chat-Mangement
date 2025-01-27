from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import root, users, staff

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://34.171.187.107:5173"],  # Allow your React app's origin
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

# Include routers
app.include_router(root.router)
app.include_router(users.router)
app.include_router(staff.router)