import { EditIcon } from '@chakra-ui/icons'
import { Box , HStack, IconButton, Image, Text, useColorMode } from '@chakra-ui/react'
import React from 'react'
import { use } from 'react'

const ProductCard = ({ product }) => {
    const textColor = useColorModeValue('gray.700', 'gray.200');
    const bgColor = useColorModeValue('white', 'gray.800');
  return (
     <Box
     shadow='lg'
     rounded='lg'
     overflow='hidden'
     transition='all 0.3s ease-in-out'
        _hover={{ transform: 'translateY(-5px)', shadow: 'xl' }}
        bg={bgColor}

     >
        <Image src={product.imageUrl} alt={product.name}  h={48} w="full"  objectFit="cover"/>

        <Box p={4}>
            <Heading as="h3" size="md" mb={2}>
                {product.name}
            </Heading>
            <Text fontWeight="bold" color="teal.600">
                Price: ${product.price}
            </Text>
            <Text mt={2}>
                {product.description}
            </Text>

            <HStack mt={4} spacing={4}>
                <IconButton icon={<EditIcon />}   colorScheme='blue'/>
                <IconButton icon={<DeleteIcon />}  colorScheme='red'/>

            </HStack>

        </Box>

     </Box>



  )
}

export default ProductCard
