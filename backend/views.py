import httpx
from fastapi import HTTPException, Response

class APIViews():
    def __init__(self):
        self.base_url = "https://www.thecocktaildb.com/api/json/v1/1"
    
    async def get_cocktail(self, id: int):
        try:
            async with httpx.AsyncClient() as client:
                response = await client.get(f"{self.base_url}/lookup.php", params={"i": id})
                response.raise_for_status()
                data = response.json()
                
                if data.get("drinks") and len(data["drinks"]) > 0:
                    cocktail = data["drinks"][0]
                    return {
                        "success": True,
                        "cocktail": {
                            "id": cocktail["idDrink"],
                            "name": cocktail["strDrink"],
                            "category": cocktail["strCategory"],
                            "alcoholic": cocktail["strAlcoholic"],
                            "glass": cocktail["strGlass"],
                            "instructions": cocktail["strInstructions"],
                            "image": f"/api/v1/image?url={cocktail['strDrinkThumb']}",
                            "ingredients": self._extract_ingredients(cocktail),
                            "tags": cocktail["strTags"],
                            "iba": cocktail["strIBA"]
                        }
                    }
                else:
                    return {"success": False, "message": "Коктейль не найден"}
        except httpx.HTTPStatusError as e:
            raise HTTPException(status_code=e.response.status_code, detail=f"The Cocktail DB API error: {e}")
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")
           
    
    async def get_random_cocktail(self):
        try:
            async with httpx.AsyncClient() as client:
                response = await client.get(f"{self.base_url}/random.php")
                response.raise_for_status()
                data = response.json()
                
                if data.get("drinks") and len(data["drinks"]) > 0:
                    cocktail = data["drinks"][0]
                    return {
                        "success": True,
                        "cocktail": {
                            "id": cocktail["idDrink"],
                            "name": cocktail["strDrink"],
                            "category": cocktail["strCategory"],
                            "alcoholic": cocktail["strAlcoholic"],
                            "glass": cocktail["strGlass"],
                            "instructions": cocktail["strInstructions"],
                            "image": f"/api/v1/image?url={cocktail['strDrinkThumb']}",
                            "ingredients": self._extract_ingredients(cocktail),
                            "tags": cocktail["strTags"],
                            "iba": cocktail["strIBA"]
                        }
                    }
                else:
                    return {"success": False, "message": "Коктейль не найден"}
                    
        except httpx.HTTPStatusError as e:
            raise HTTPException(status_code=e.response.status_code, detail=f"Ошибка: {e}")
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Ошибка: {str(e)}")
    
    async def search_ingredient(self, ingredient: str):
        try:
            async with httpx.AsyncClient() as client:
                response = await client.get(f"{self.base_url}/search.php", params={"i": ingredient})
                response.raise_for_status()
                data = response.json()
                
                if data.get("ingredients") and len(data["ingredients"]) > 0:
                    ingredient_data = data["ingredients"][0]
                    return {
                        "success": True,
                        "ingredient": {
                            "id": ingredient_data["idIngredient"],
                            "name": ingredient_data["strIngredient"],
                            "description": ingredient_data["strDescription"],
                            "type": ingredient_data["strType"],
                            "alcohol": ingredient_data["strAlcohol"],
                            "abv": ingredient_data["strABV"]
                        }
                    }
                else:
                    return {"success": False, "message": "Ингредиент не найден"}
                    
        except httpx.HTTPStatusError as e:
            raise HTTPException(status_code=e.response.status_code, detail=f"The Cocktail DB API error: {e}")
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Ошибка: {str(e)}")
    
    async def search_drink(self, drink: str):
        try:
            async with httpx.AsyncClient() as client:
                response = await client.get(f"{self.base_url}/search.php", params={"s": drink})
                response.raise_for_status()
                data = response.json()
                
                if data.get("drinks") and len(data["drinks"]) > 0:
                    drinks = []
                    for cocktail in data["drinks"]:
                        drinks.append({
                            "id": cocktail["idDrink"],
                            "name": cocktail["strDrink"],
                            "category": cocktail["strCategory"],
                            "alcoholic": cocktail["strAlcoholic"],
                            "glass": cocktail["strGlass"],
                            "instructions": cocktail["strInstructions"],
                            "image": f"/api/v1/image?url={cocktail['strDrinkThumb']}",
                            "ingredients": self._extract_ingredients(cocktail),
                            "tags": cocktail["strTags"],
                            "iba": cocktail["strIBA"]
                        })
                    
                    return {
                        "success": True,
                        "drinks": drinks,
                        "count": len(drinks)
                    }
                else:
                    return {"success": False, "message": "Коктейли не найдены"}
                    
        except httpx.HTTPStatusError as e:
            raise HTTPException(status_code=e.response.status_code, detail=f"Ошибка: {e}")
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Ошибка: {str(e)}")
    
    async def proxy_image(self, url: str):
        try:
            async with httpx.AsyncClient() as client:
                resp = await client.get(url)
                resp.raise_for_status()
                content_type = resp.headers.get("Content-Type", "image/jpeg")  # fallback
                return Response(content=resp.content, media_type=content_type)
        except httpx.HTTPStatusError as e:
            raise HTTPException(status_code=resp.status_code, detail="Ошибка при загрузке изображения")
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Внутренняя ошибка: {str(e)}")
        
    def _extract_ingredients(self, cocktail):
        ingredients = []
        for i in range(1, 16):
            ingredient_key = f"strIngredient{i}"
            measure_key = f"strMeasure{i}"
            
            ingredient = cocktail.get(ingredient_key)
            measure = cocktail.get(measure_key)
            
            if ingredient and ingredient.strip():
                ingredients.append({
                    "ingredient": ingredient.strip(),
                    "measure": measure.strip() if measure else ""
                })
        
        return ingredients