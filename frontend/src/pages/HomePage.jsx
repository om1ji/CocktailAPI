import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const HomePage = () => {
  const [currentCocktail, setCurrentCocktail] = useState(null);
  const [searchResult, setSearchResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchType, setSearchType] = useState(null); // 'drink' или 'ingredient'
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchDrink = params.get('search_drink');
    const searchIngredient = params.get('search_ingredient');
    
    if (searchDrink) {
      handleSearchDrink(searchDrink);
    } else if (searchIngredient) {
      handleSearchIngredient(searchIngredient);
    } else {
      loadRandomCocktail();
      console.log("BRUH")
    }
  }, [location.search]);


  const loadRandomCocktail = async () => {
    setLoading(true);
    setError(null);
    setSearchResult(null);
    setSearchType(null);

    try {
      const response = await axios.get('/api/v1/random-cocktail');
      setCurrentCocktail(response.data);
    } catch (err) {
      setError(err.response?.data?.detail || 'Произошла ошибка при запросе');
    } finally {
      setLoading(false);
    }
  };

  const handleSearchDrink = async (drinkName) => {
    setLoading(true);
    setError(null);
    setCurrentCocktail(null);
    setSearchType('drink');

    try {
      const response = await axios.get('/api/v1/search-drink', {
        params: { drink: drinkName }
      });
      setSearchResult(response.data);
    } catch (err) {
      setError(err.response?.data?.detail || 'Произошла ошибка при поиске коктейля');
    } finally {
      setLoading(false);
    }
  };

  const handleSearchIngredient = async (ingredientName) => {
    setLoading(true);
    setError(null);
    setCurrentCocktail(null);
    setSearchType('ingredient');

    try {
      const response = await axios.get('/api/v1/search-ingredient', {
        params: { ingredient: ingredientName }
      });
      setSearchResult(response.data);
    } catch (err) {
      setError(err.response?.data?.detail || 'Произошла ошибка при поиске ингредиента');
    } finally {
      setLoading(false);
    }
  };

  const renderCocktail = (cocktail) => (
    <div className="cocktail-card">
      <div className="cocktail-header">
        <img src={cocktail.image} alt={cocktail.name} className="cocktail-image" />
        <div className="cocktail-info">
          <h2>{cocktail.name}</h2>
          <p><strong>Категория:</strong> {cocktail.category}</p>
          <p><strong>Тип:</strong> {cocktail.alcoholic}</p>
          <p><strong>Бокал:</strong> {cocktail.glass}</p>
          {cocktail.iba && <p><strong>IBA:</strong> {cocktail.iba}</p>}
          {cocktail.tags && <p><strong>Теги:</strong> {cocktail.tags}</p>}
        </div>
      </div>
      
      <div className="cocktail-ingredients">
        <h3>Ингредиенты</h3>
        <div className="ingredients-list">
          {cocktail.ingredients.map((item, index) => (
            <div key={index} className="ingredient-item">
              <span className="ingredient-name">{item.ingredient}</span>
              {item.measure && <span className="ingredient-measure">{item.measure}</span>}
            </div>
          ))}
        </div>
      </div>
      
      <div className="cocktail-instructions">
        <h3>Приготовление</h3>
        <p>{cocktail.instructions}</p>
      </div>
    </div>
  );

  const renderIngredient = (ingredient) => (
    <div className="ingredient-card">
      <h2>{ingredient.name}</h2>
      <div className="ingredient-details">
        <p><strong>Тип:</strong> {ingredient.type}</p>
        <p><strong>Алкоголь:</strong> {ingredient.alcohol}</p>
        {ingredient.abv && <p><strong>Крепость:</strong> {ingredient.abv}%</p>}
      </div>
      {ingredient.description && (
        <div className="ingredient-description">
          <h3>Описание</h3>
          <p>{ingredient.description}</p>
        </div>
      )}
    </div>
  );

  const renderDrinksList = (drinksData) => (
    <div className="drinks-list">
      <h3>Найдено коктейлей ({drinksData.count}):</h3>
      <div className="drinks-grid">
        {drinksData.drinks.map((drink, index) => (
          <div 
            key={index} 
            className="drink-card"
            onClick={() => navigate(`/cocktail/${drink.id}`)}
            style={{ cursor: 'pointer' }}
          >
            <img src={drink.image} alt={drink.name} className="drink-image" />
            <div className="drink-info">
              <h4>{drink.name}</h4>
              <p>{drink.category}</p>
              <p>{drink.alcoholic}</p>
              <p><strong>Бокал:</strong> {drink.glass}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSearchResult = () => {
    if (!searchResult) return null;

    if (!searchResult.success) {
      return (
        <div className="error-message">
          <p>{searchResult.message}</p>
        </div>
      );
    }

    if (searchType === 'ingredient' && searchResult.ingredient) {
      return renderIngredient(searchResult.ingredient);
    }

    if (searchType === 'drink' && searchResult.drinks) {
      return renderDrinksList(searchResult);
    }

    return null;
  };

  return (
    <div className="content">
      {error && (
        <div className="error-message">
          <h3>Ошибка</h3>
          <p>{error}</p>
        </div>
      )}
      
      {loading && <div className="loading">Загрузка...</div>}
      
      {currentCocktail && currentCocktail.success && renderCocktail(currentCocktail.cocktail)}
      
      {renderSearchResult()}
    </div>
  );
};

export default HomePage; 