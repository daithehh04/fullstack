/* eslint-disable react/prop-types */
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from '@chakra-ui/react'
import { useDispatch } from 'react-redux'
import { remove } from '../../stores/slices/productSlice'

export default function ModalConFirm({isOpen, onClose, product}) {
  const dispatch = useDispatch()
  const handleRemove = () => {
    dispatch(remove(product))
    onClose()
  }
  return (
    <>
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent padding={'1rem'}>
          <ModalHeader fontSize={'2rem'} color={'#e74c3c'} fontWeight={700}>Confirm!</ModalHeader>
          <ModalCloseButton fontSize={'1.4rem'}/>
          <ModalBody pb={6} fontSize={'1.8rem'} fontWeight={500}>
            Bạn chắc chắn muốn xóa {product?.name} chứ?
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='red' onClick={handleRemove} padding={'1.6rem'} mr={3} fontSize={'1.6rem'}>
              Ok
            </Button>
            <Button onClick={onClose} padding={'1.6rem'} fontSize={'1.6rem'}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}