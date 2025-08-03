# Cocktail API

Сервис для работы с The Cocktail DB API, включающий бэкенд на FastAPI и фронтенд на React.


## Установка и запуск

### Бэкенд (FastAPI)

1. Установите зависимости Python:
```bash
pip3 install -r requirements.txt
```

2. Запустите сервер:
```bash
cd backend
python3 main.py
```

Сервер будет доступен по адресу: http://localhost:8000

### Фронтенд (React)

1. Установите зависимости Node.js:
```bash
cd frontend
npm install
```

2. Запустите React приложение:
```bash
npm run dev
```

Фронтенд будет доступен по адресу: http://localhost:5173

## API Эндпоинты

Все эндпоинты используют **GET** запросы:

### GET /api/cocktail
Получить определённый коктейль по ID

Пример:
```
GET /api/cocktail?id=17824
```

Параметры

`id` - id (int) коктейля в Cocktail DB API

Ответ:
```json
{
    "success": true,
    "cocktail": {
        "id": "17824",
        "name": "The Laverstoke",
        "category": "Cocktail",
        "alcoholic": "Alcoholic",
        "glass": "Balloon Glass",
        "instructions": "1) Squeeze two lime wedges into a balloon glass then add the cordial, Bombay Sapphire and MARTINI Rosso Vermouth, swirl to mix.\n\n2) Fully fill the glass with cubed ice and stir to chill.\n\n3) Top with Fever-Tree Ginger Ale and gently stir again to combine.\n\n4) Garnish with a snapped ginger slice and an awoken mint sprig.",
        "image": "https://www.thecocktaildb.com/images/media/drink/6xfj5t1517748412.jpg",
        "ingredients": [
            {
                "ingredient": "Gin",
                "measure": "50 ml"
            },
            {
                "ingredient": "Elderflower cordial",
                "measure": "15 ml"
            },
            {
                "ingredient": "Rosso Vermouth",
                "measure": "15 ml"
            },
            {
                "ingredient": "Tonic Water",
                "measure": "75 ml"
            },
            {
                "ingredient": "Lime",
                "measure": "2 Wedges"
            },
            {
                "ingredient": "Ginger",
                "measure": "1 Slice"
            },
            {
                "ingredient": "Mint",
                "measure": "1 Large Sprig"
            }
        ],
        "tags": null,
        "iba": null
    }
}
```

### GET /api/random-cocktail
Получить случайный коктейль из базы данных

Пример:
```
GET /api/random-cocktail
```

Ответ:
```json
{
  "success": true,
  "cocktail": {
    "id": "17120",
    "name": "Brain Fart",
    "category": "Punch / Party Drink",
    "alcoholic": "Alcoholic",
    "glass": "Punch bowl",
    "instructions": "Mix all ingredients together...",
    "image": "https://www.thecocktaildb.com/images/media/drink/...",
    "ingredients": [
      {
        "ingredient": "Everclear",
        "measure": "1 fifth"
      }
    ],
    "tags": null,
    "iba": null
  }
}
```

### GET /api/search-ingredient
Поиск ингредиента по названию

Query параметры:
- `ingredient` (str): название ингредиента

Пример:
```
GET /api/search-ingredient?ingredient=vodka
```

### GET /api/search-drink
Поиск коктейля по названию

Query параметры:
- `drink` (str): название коктейля

Пример:
```
GET /api/search-drink?drink=margarita
```

## Технологии

- **Бэкенд**: FastAPI, httpx
- **Фронтенд**: React, axios
- **Стили**: CSS3 с градиентами и анимациями
- **API**: The Cocktail DB (https://www.thecocktaildb.com/)

## Источники

- [The Cocktail DB API](https://www.thecocktaildb.com/api.php)
- [Free Public APIs - Cocktail Recipe API](https://www.freepublicapis.com/cocktail-recipe-api)
