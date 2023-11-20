import React from "react";
import { Divider, Box, Heading } from "@chakra-ui/react";
import { useSelector } from "../core/useSelector.js";
import Form from "./Form.jsx";
import ResultTable from "./ResultTable.jsx";
import SliderThumbWithTooltip from "./Slider.jsx";
import { getLocalStorage } from "../utils/localStorage.js";
import ModalConFirm from "./Modal.jsx";
const Main = () => {
  const { state } = useSelector();
  let RANGE_NUMBER = getLocalStorage('RANGE_NUMBER')
  if(Array.isArray(RANGE_NUMBER) && !RANGE_NUMBER.length ) {
    RANGE_NUMBER = 100
  }
  const MAX_TIME = Math.ceil(Math.log2(RANGE_NUMBER))
  const { maxTimes,message } = state;
  return (
    <Box p="4" mt={4}>
      <Divider
        orientation="vertical"
        pos="fixed"
        top="0px"
        left="0px"
        h="8px"
        bg="teal.500"
        w={`${(maxTimes / MAX_TIME) * 100}%`}
      />
      <Heading as="h2" color="teal.500">
        {message}
      </Heading>
      <Heading as="h2" color="teal.600">
        Còn {maxTimes}/{MAX_TIME} lần
      </Heading>
      <Heading as="h2" color="teal.700">
        Bạn cần tìm kiếm một số từ 1 đến {RANGE_NUMBER}
      </Heading>
      <SliderThumbWithTooltip/>
      <Form />
      <ResultTable />
      <ModalConFirm/>
    </Box>
  );
};

export default Main;