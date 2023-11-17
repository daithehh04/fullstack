import React, { useEffect, useRef, useState, useId } from "react";
import {
  Button,
  FormLabel,
  Input,
  FormControl,
  Box,
  Flex,
} from "@chakra-ui/react";
import { toast } from "react-toastify";
import { useSelector } from "../core/useSelector";
import { getLocalStorage } from "../utils/localStorage";
const RANGE_NUMBER = getLocalStorage("RANGE_NUMBER")
const MAX_TIME = Math.ceil(Math.log2(RANGE_NUMBER));
const Form = () => {
  const inputRef = useRef(null);
  const buttonRef = useRef(null);
  const id = useId();
  const { state, dispatch } = useSelector();
  const { randomOfRangeNumber, maxTimes } = state;
  const [playAgain, setPlayAgain] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    const number = +inputRef.current.value;
      let message;
      if (!number) {
        message = "Nhập số muốn đoán";
        toast.warning(message);
        return;
      }
      if (number === randomOfRangeNumber) {
        setPlayAgain(true);
        message = "Bạn đoán đúng số rồi";
        toast.success(message);
      } else {
        message =
          number > randomOfRangeNumber
            ? "Bạn cần giảm xuống 1 chút"
            : "Bạn cần tăng thêm 1 chút";
        if (maxTimes - 1 === 0) {
          setPlayAgain(true);
          message = "Tiếc quá bạn vẫn chưa đoán đúng.";
          toast.error(message);
        } else {
          toast.warning(message);
        }
      }
      dispatch({
        type: "SUBMIT_FORM",
        payload: { number, message },
      });
  };

  const handlePlayAgain = (e) => {
    setPlayAgain(false);
    dispatch({ type: "PLAY_AGAIN_FORM", payload: MAX_TIME });
  };
  const handleChange = (e) => {
    const regex = new RegExp(`^[0-9]{0,${(RANGE_NUMBER - 1 + "").length}}$`);
    if (!regex.test(e.target.value)) {
      inputRef.current.value = e.target.value.slice(0, -1);
    }
  };

  return (
    <Box pt={4}>
      {!playAgain ? (
        <form onSubmit={handleSubmit}>
          <Flex direction="column" gap={5} align="center">
            <FormControl>
              <FormLabel htmlFor={id} color="teal.500">
                Hãy thử nhập 1 số
              </FormLabel>
              <Input
                id={id}
                ref={inputRef}
                type="number"
                min={1}
                placeholder="Thử một số"
                onChange={handleChange}
              />
            </FormControl>
          </Flex>
        </form>
      ) : (
        <Button
          type="button"
          ref={buttonRef}
          bg="teal.500"
          onClick={handlePlayAgain}
        >
          Chơi lại
        </Button>
      )}
    </Box>
  );
};

export default Form;