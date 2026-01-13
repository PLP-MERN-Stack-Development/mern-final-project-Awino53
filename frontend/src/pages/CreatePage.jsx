import {
  Container,
  VStack,
  Heading,
  Box,
  Input,
  Button,
  useColorModeValue,
  useToast
} from '@chakra-ui/react';

import { useState } from 'react';
import useProductStore from "../store/product.js";

 


const CreatePage = () => {
    const [newProduct, setNewProduct] = useState({
        name: "",
        description: "",
        price: "",
        imageUrl: ""
    }); 
    const toast = useToast()
    const {createProduct} = useProductStore();
    const handleAddProduct = async() => {
        const {success, message} = await createProduct(newProduct);
        if(success){
            toast({
                title: "Product Created",
                description: "The product has been created successfully.",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
            setNewProduct({
                name: "",
                description: "",
                price: "",
                imageUrl: ""
            })
        } else {
            toast({
                title: "Error",
                description: message || "An error occurred while creating the product.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
         
        // Here you can add logic to send the new product data to your backend or state management
    } 



    return <Container maxW = {"container.sm"} >
        <VStack 
        spacing={8}
        >
            <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>Create New Product</Heading>
            <Box 
            w={"full"} bg = {useColorModeValue("gray.100", "gray.700")}
            p={6} rounded={"lg"} shadow={"md"}
            >
                <VStack spacing={4}>
                    <Input
                    placeholder='Product Name'
                    name='name'
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}

                     />
                    <Input
                    placeholder='Description'
                    name='description'
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                        />
                    <Input
                    placeholder='Price'
                    name='price'
                    type='number'
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                    />
                    <Input
                    placeholder='Image URL'
                    name='imageUrl'
                    value={newProduct.imageUrl}
                    onChange={(e) => setNewProduct({...newProduct, imageUrl: e.target.value})}
                    />

                    <Button
                    colorScheme={"teal"}
                    w={"full"}
                    mt={4}
                    onClick={handleAddProduct}

                    >
                        Create Product
                    </Button>

                </VStack>

            </Box>
        </VStack>
    </Container>;
};

export default CreatePage
