import { useRef, useState } from 'react';
import { useBasket } from '../../contexts/BasketContext';
import {
  Alert,
  AlertIcon,
  Image,
  Text,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  ModalFooter,
  Textarea,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { postOrder } from '../../api';

function Basket() {
  const [address, setAddress] = useState('');
  const { items, removeFromBasket, emptyBasket } = useBasket();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = useRef();

  const handleSubmitForm = async () => {
    const itemIds = items.map((item) => item._id);

    const input = {
      address,
      items: JSON.stringify(itemIds),
    };

    const response = await postOrder(input);
    console.log(response);

    emptyBasket();
    onClose();
  };

  const total = items.reduce((acc, obj) => acc + obj.price, 0);

  return (
    <div style={{ padding: 10 }}>
      {items.length < 1 && (
        <Alert status="warning">
          <AlertIcon />
          You have not any items in your basket.
        </Alert>
      )}

      {items.length > 0 && (
        <>
          <ul style={{ listStyleType: 'decimal' }}>
            {items.map((item) => (
              <li key={item._id}>
                <Link to={`/product/${item._id}`}>
                  {item.title} - {item.price} TL
                  <Image htmlWidth={200} src={item.photos[0]} alt={item.title} />
                </Link>

                <Button
                  mt="2"
                  size="sm"
                  colorScheme="pink"
                  onClick={() => removeFromBasket(item._id)}
                >
                  Remove from basket
                </Button>
              </li>
            ))}
          </ul>

          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <Text fontSize="2xl" as="h1">
            Total: {total} TL
          </Text>

          <Button mt="2" size="sm" colorScheme="green" onClick={onOpen}>
            Order
          </Button>

          <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Order</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <FormControl>
                  <FormLabel>Address</FormLabel>
                  <Textarea
                    ref={initialRef}
                    placeholder="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </FormControl>
              </ModalBody>

              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={handleSubmitForm}>
                  Save
                </Button>
                <Button onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      )}
    </div>
  );
}

export default Basket;
