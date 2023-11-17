import React, { useRef, useEffect } from "react";
import {
  TableContainer,
  Box,
  Flex,
  Table,
  Tr,
  Th,
  Td,
  TableCaption,
  Thead,
  Tbody,
  Text,
  IconButton,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { useSelector } from "../core/useSelector";
import { getLocalStorage } from "../utils/localStorage";
const ResultTable = () => {
  const tableRef = useRef(null);
  const pageTableRef = useRef(0);

  const { state, dispatch } = useSelector();
  const { isAddTable } = state;
  const data = getLocalStorage("data") || [];

  useEffect(() => {
    pageTableRef.current = 0;
    const scrollWidth = tableRef.current?.clientWidth * pageTableRef.current;
    if (tableRef.current) {
      tableRef.current.scroll({
        left: scrollWidth,
        behavior: "smooth",
      });
    }
  }, [isAddTable]);

  useEffect(() => {
    const currentTableRef = tableRef.current;

    function handleKeyDown(e) {
      if (e.key === "ArrowRight" && pageTableRef.current < data?.length - 1) {
        pageTableRef.current += 1;
      } else if (e.key === "ArrowLeft" && pageTableRef.current > 0) {
        pageTableRef.current -= 1;
      }

      currentTableRef.scroll({
        left: currentTableRef.clientWidth * pageTableRef.current,
        behavior: "smooth",
      });
    }
    function handleScroll() {
      const scrollLeft = currentTableRef.scrollLeft;
      pageTableRef.current = Math.round(
        scrollLeft / currentTableRef.clientWidth
      );
    }
    if (currentTableRef) {
      document.addEventListener("keydown", handleKeyDown);
      currentTableRef.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (currentTableRef) {
        document.removeEventListener("keydown", handleKeyDown);
        currentTableRef.addEventListener("scroll", handleScroll);
      }
    };
  }, [data]);

  const deleteTable = () => {
    dispatch({ type: "REMOVE_TABLE" });
  };
  return (
    <Box mt={4}>
      {data.length ? (
        <Flex
          overflow={data?.length > 0 ? "scroll hidden" : "hidden"}
          ref={tableRef}
        >
          <IconButton
            position="fixed"
            right="16px"
            color="#1d4044"
            background="teal"
            variant="solid"
            icon={<DeleteIcon />}
            onClick={deleteTable}
          />
          {data.map((item, index) => {
            return (
              <TableContainer
                w="100vw"
                maxW="100%"
                flexShrink="0"
                borderRadius="8px"
                border={"2px solid #2c7a7b"}
                display="block"
                overflow="hidden"
                key={index}
              >
                <Table margin="16px 0">
                  <Thead>
                    <Tr>
                      <Th textAlign="center">Số lần nhập</Th>
                      <Th textAlign="center">Số nhập vào</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {item.map(({ number, time, right }, index) => {
                      return (
                        <Tr key={index}>
                          <Td p="0px">
                            <Text textAlign="center">{time}</Text>
                          </Td>
                          <Td p="0px">
                            <Text
                              textAlign="center"
                              color={right ? "primary.500" : "#822727"}
                            >
                              {number}
                            </Text>
                          </Td>
                        </Tr>
                      );
                    })}
                  </Tbody>
                  <TableCaption fontSize="md">
                    Lần chơi thứ: {data.length - index} / {data.length}
                  </TableCaption>
                  <TableCaption fontSize="md">
                    Số lần nhập tối đa: {Math.ceil(Math.log2(getLocalStorage("RANGE_NUMBER")))}
                  </TableCaption>
                </Table>
              </TableContainer>
            );
          })}
        </Flex>
      ) : (
        ""
      )}
    </Box>
  );
};

export default ResultTable;