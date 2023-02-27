import { Flex } from '@chakra-ui/react';
import Card from '../../components/Card';
import { useQuery } from 'react-query';
import { fetchProductList } from '../../api';

function Products() {
  const { isLoading, isError, data, error } = useQuery('products', fetchProductList);

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div>
      <Flex>
        {data?.map((item) => (
          <Card key={item._id} item={item} />
        ))}
      </Flex>
    </div>
  );
}

export default Products;
