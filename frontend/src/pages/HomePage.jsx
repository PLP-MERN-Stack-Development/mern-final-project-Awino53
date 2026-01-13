import React, { useEffect } from 'react';
import { Container, VStack, Text, SimpleGrid } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import useProductStore from '../store/product';
import ProductCard from '../components/ProductCard';

const HomePage = () => {
  const { products, fetchProducts } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  console.log('products:', products);

  return (
    <Container maxW="container.xl" py={12}>
      <VStack spacing={8}>
         {products.length === 0 && (
  <Text fontSize="lg" textAlign="center" color="gray.600">
    No products available at the moment.
    <Link to="/create">
      <Text
        as="span"
        color="blue.500"
        textDecoration="underline"
        ml={1}
      >
        Create a new product
      </Text>
    </Link>
  </Text>
)}


        {/* 🔵 SHOW PRODUCTS */}
        {products.length > 0 && (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10} w="full">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </SimpleGrid>
        )}

        {/* 🔵 EMPTY STATE */}
        {products.length === 0 && (
          <Text fontSize="lg" textAlign="center" color="gray.600">
            No products available at the moment.
            <Link to="/create">
              <Text
                as="span"
                color="blue.500"
                textDecoration="underline"
                ml={1}
              >
                Create a new product
              </Text>
            </Link>
          </Text>
        )}
      </VStack>
    </Container>
  );
};

export default HomePage;
