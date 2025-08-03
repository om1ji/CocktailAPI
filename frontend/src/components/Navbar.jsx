import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [loading, setLoading] = useState(false);
  const [showIngredientForm, setShowIngredientForm] = useState(false);
  const [showDrinkForm, setShowDrinkForm] = useState(false);
  const [searchForm, setSearchForm] = useState({
    ingredient: '',
    drink: ''
  });
  const navigate = useNavigate();

  const loadRandomCocktailButton = async () => {
    setLoading(true);
    try {
      window.history.pushState({}, document.title, "/");
      window.location.reload()
    } catch (err) {
      console.error('Ошибка при загрузке случайного коктейля:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchIngredient = async () => {
    if (!searchForm.ingredient.trim()) {
      alert('Введите название ингредиента');
      return;
    }

    setLoading(true);
    try {
      // Переходим на главную страницу с параметром поиска
      navigate(`/?search_ingredient=${encodeURIComponent(searchForm.ingredient.trim())}`);
      setShowIngredientForm(false);
      setSearchForm({ ...searchForm, ingredient: '' });
    } catch (err) {
      console.error('Ошибка при поиске ингредиента:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchDrink = async () => {
    if (!searchForm.drink.trim()) {
      alert('Введите название коктейля');
      return;
    }

    setLoading(true);
    try {
      // Переходим на главную страницу с параметром поиска
      navigate(`/?search_drink=${encodeURIComponent(searchForm.drink.trim())}`);
      setShowDrinkForm(false);
      setSearchForm({ ...searchForm, drink: '' });
    } catch (err) {
      console.error('Ошибка при поиске коктейля:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseForms = () => {
    setShowIngredientForm(false);
    setShowDrinkForm(false);
    setSearchForm({ ingredient: '', drink: '' });
  };

  return (
    <>
      <nav className="navbar">
        <div className="nav-brand" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          Коктейли
        </div>
        <div className="nav-buttons">
        <button 
            onClick={() => setShowDrinkForm(true)}
            className="nav-btn"
          >
            Поиск по названию
          </button>
          <button 
            onClick={() => {window.location.href = window.location.pathname}}
            disabled={loading}
            className="nav-btn"
          >
            {loading ? 'Загрузка...' : 'Случайный коктейль'}
          </button>
          <button 
            onClick={() => setShowIngredientForm(true)}
            className="nav-btn"
          >
            Об ингредиенте
          </button>

        </div>
      </nav>

      {showIngredientForm && (
        <div className="modal-overlay" onClick={handleCloseForms}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Поиск ингредиента</h2>
              <button onClick={handleCloseForms} className="close-btn">×</button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Название ингредиента:</label>
                <input
                  type="text"
                  value={searchForm.ingredient}
                  onChange={(e) => setSearchForm({...searchForm, ingredient: e.target.value})}
                  placeholder="Например: vodka, gin, tequila..."
                  onKeyPress={(e) => e.key === 'Enter' && handleSearchIngredient()}
                />
              </div>
              <button 
                onClick={handleSearchIngredient}
                disabled={loading}
                className="submit-btn"
              >
                {loading ? 'Загрузка...' : 'Найти ингредиент'}
              </button>
            </div>
          </div>
        </div>
      )}

      {showDrinkForm && (
        <div className="modal-overlay" onClick={handleCloseForms}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Поиск коктейля</h2>
              <button onClick={handleCloseForms} className="close-btn">×</button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Название коктейля:</label>
                <input
                  type="text"
                  value={searchForm.drink}
                  onChange={(e) => setSearchForm({...searchForm, drink: e.target.value})}
                  placeholder="Например: margarita, mojito, martini..."
                  onKeyPress={(e) => e.key === 'Enter' && handleSearchDrink()}
                />
              </div>
              <button 
                onClick={handleSearchDrink}
                disabled={loading}
                className="submit-btn"
              >
                {loading ? 'Загрузка...' : 'Найти коктейль'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar; 