from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from models import Staff
from database import get_db
from sqlalchemy.future import select

router = APIRouter()

@router.post("/staff/")
async def create_user(name: str, email: str, db: AsyncSession = Depends(get_db)):
    new_user = Staff(name=name, email=email)
    db.add(new_user)
    await db.commit()
    await db.refresh(new_user)
    return new_user

@router.get("/staff/{staff_id}")
async def read_user(staff_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Staff).filter(Staff.id == staff_id))
    user = result.scalars().first()
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@router.get("/staff_all")
async def read_all_staffs(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Staff))
    staff_list = result.scalars().all()
    return staff_list