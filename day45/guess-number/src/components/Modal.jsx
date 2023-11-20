import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  IconButton,
} from '@chakra-ui/react'
import { DeleteIcon } from "@chakra-ui/icons";
import { useSelector } from '../core/useSelector';
import { getLocalStorage } from '../utils/localStorage';

function ModalConFirm() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { state,dispatch } = useSelector();
  const data = getLocalStorage("data") || [];
  const handleDeleteTable = () => {
    dispatch({
      type: "REMOVE_TABLE"
    })
    onClose()
  }
  if(!data.length) {
    return null
  }
  return (
    <>
    {data.length && (
      <IconButton
        position="absolute"
        right="16px"
        top={'50%'}
        color="#1d4044"
        background="teal"
        variant="solid"
        icon={<DeleteIcon />}
        onClick={onOpen}
      />
    )}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Xóa tất cả lịch sử chơi!</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          Bạn chắc chắn chứ? Bạn sẽ không thể giữ lại lịch sử chơi trong quá khứ sau khi bấm xoá.
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='teal' mr={3} onClick={onClose}>
              Giữ lại
            </Button>
            <Button colorScheme='red' onClick={handleDeleteTable}>Xóa luôn</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ModalConFirm