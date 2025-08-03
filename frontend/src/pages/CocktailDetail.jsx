import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const CocktailDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cocktail, setCocktail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadCocktail();
  }, [id]);

  const loadCocktail = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`/api/v1/cocktail?id=${id}`);
      if (response.data.success) {
        setCocktail(response.data.cocktail);
      } else {
        setError(response.data.message || 'Коктейль не найден');
      }
    } catch (err) {
      setError(err.response?.data?.detail || 'Произошла ошибка при загрузке коктейля');
    } finally {
      setLoading(false);
    }
  };

  const renderCocktail = (cocktail) => (
    <div className="cocktail-detail">
      <div className="cocktail-header">
        <img src={cocktail.image} alt={cocktail.name} className="cocktail-image" />
        <div className="cocktail-info">
          <h1>{cocktail.name}</h1>
          <p><strong>Категория:</strong> {cocktail.category}</p>
          <p><strong>Тип:</strong> {cocktail.alcoholic}</p>
          <p><strong>Бокал:</strong> {cocktail.glass}</p>
          {cocktail.iba && <p><strong>IBA:</strong> {cocktail.iba}</p>}
          {cocktail.tags && <p><strong>Теги:</strong> {cocktail.tags}</p>}
        </div>
      </div>
      
      <div className="cocktail-ingredients">
        <h2>Ингредиенты</h2>
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
        <h2>Приготовление</h2>
        <p>{cocktail.instructions}</p>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="content">
        <div className="loading">Загрузка коктейля...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="content">
        <div className="error-message">
          <h3>Ошибка</h3>
          <p>{error}</p>
          <button onClick={() => navigate('/')} className="back-btn">
            ← Вернуться на главную
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="content">
      {cocktail && renderCocktail(cocktail)}
    </div>
  );
};

export default CocktailDetail; 