import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// Contenedor principal con fondo claro
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f9f9f9; // Fondo claro
  min-height: 100vh;
`;

const Header = styled.header`
  margin-bottom: 20px;
  font-size: 2.2em;
  color: #333; // Color de texto oscuro
  font-family: 'Roboto Condensed', sans-serif;
  text-align: center; // Centrar el texto
`;

const CategoryList = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 20px;
`;

const CategoryButton = styled.button`
  padding: 10px 15px;
  border: none;
  background-color: #3d84b8; // Color de fondo de los botones
  color: white;
  font-family: 'Roboto', sans-serif;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;

  &:hover {
    background-color: #295a79; // Color al pasar el mouse
    transform: scale(1.05);
  }
`;

const ProductList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  list-style: none;
  padding: 0;
  justify-content: center;
`;

const ProductItem = styled.li`
  background: white; // Fondo blanco para los productos
  border: 1px solid #ddd; // Borde gris claro
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); // Sombra suave
  overflow: hidden;
  width: 200px;
  text-align: center;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const ProductTitle = styled.h2`
  font-size: 1.1em;
  color: #333; // Color oscuro para el título
  margin: 10px 0;
  padding: 0 10px;
`;

const ProductPrice = styled.p`
  font-size: 1.1em;
  color: #4caf50; // Color verde para el precio
  margin: 10px 0;
`;

const ProductDisplay: React.FC = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('electronics');
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products/categories');
        setCategories(response.data);
      } catch (error) {
        setError('Error al cargar las categorías');
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://fakestoreapi.com/products/category/${selectedCategory}`);
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error al cargar los productos');
        setLoading(false);
      }
    };
    fetchProducts();
  }, [selectedCategory]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Container>
      <Header>Lista de Productos de la Tienda GameHub</Header>
      <CategoryList>
        {categories.map(category => (
          <CategoryButton key={category} onClick={() => handleCategoryChange(category)}>
            {category}
          </CategoryButton>
        ))}
      </CategoryList>
      <ProductList>
        {products.map(product => (
          <ProductItem key={product.id}>
            <Link to={`/product/${product.id}`}>
              <ProductImage src={product.image} alt={product.title} />
              <ProductTitle>{product.title}</ProductTitle>
              <ProductPrice>${product.price}</ProductPrice>
            </Link>
          </ProductItem>
        ))}
      </ProductList>
    </Container>
  );
};

export default ProductDisplay;
