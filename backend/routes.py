from fastapi import APIRouter, Query
from views import APIViews

views = APIViews()
api_version = "v1"

router = APIRouter(prefix=f"/api/{api_version}")

@router.get("/")
async def root():
    return {"message": "Cocktail API"}

@router.get("/health")
async def health_check():
    return {"status": "ok"}

@router.get("/cocktail")
async def get_cocktail(id: int):
    """Получить коктейль по ID"""
    return await views.get_cocktail(id)

@router.get("/random-cocktail")
async def get_random_cocktail():
    """Получить случайный коктейль"""
    return await views.get_random_cocktail()

@router.get("/search-ingredient")
async def search_ingredient(ingredient: str):
    """Поиск ингредиента по названию"""
    return await views.search_ingredient(ingredient)

@router.get("/search-drink")
async def search_drink(drink: str):
    """Поиск коктейля по названию"""
    return await views.search_drink(drink)

@router.get("/image")
async def proxy_image(url: str):
    return await views.proxy_image(url)