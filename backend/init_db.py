import asyncio
from sqlalchemy.ext.asyncio import create_async_engine
from models import Base

DATABASE_URL = "postgresql+asyncpg://robert:robert@127.0.0.1/ghdardy"

async def create_tables():
    engine = create_async_engine(DATABASE_URL, echo=True)
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    await engine.dispose()

if __name__ == "__main__":
    asyncio.run(create_tables())