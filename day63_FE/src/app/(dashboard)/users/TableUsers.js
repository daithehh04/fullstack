"use client"
import { DeleteIcon } from "@/icons/DeleteIcon"
import { EditIcon } from "@/icons/EditIcon"
import { EyeIcon } from "@/icons/EyeIcon"
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
  Tooltip,
  Pagination,
  Spinner,
} from "@nextui-org/react"
import { IoIosWarning } from "react-icons/io"
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react"
import Link from "next/link"

import { useCallback, useEffect, useMemo, useState } from "react"
import { deleteAllUser, deleteUser } from "@/services/user.service"
import toast, { Toaster } from "react-hot-toast"
import queryString from "query-string"
import useSWR, { useSWRConfig } from "swr"

import { useRouter } from "next/navigation"

const statusColorMap = {
  true: "success",
  false: "danger",
}
const fetcher = (...args) => fetch(...args).then((res) => res.json())

const api = process.env.NEXT_PUBLIC_API
function TableUsers() {
  const [selectedKeys, setSelectedKeys] = useState(new Set([]))
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [userSelected, setUserSelected] = useState(null)
  const [isDel, setIsDel] = useState(false)
  const [page, setPage] = useState(1)
  const { mutate } = useSWRConfig()
  const router = useRouter()
  console.log("router.query:", router.query)
  const query = {
    page,
    limit: 10,
  }
  const queryStringified = queryString.stringify(query)
  const { data, error, isLoading } = useSWR(
    `${api}/users?${queryStringified}`,
    fetcher
  )
  useEffect(() => {
    router.push(`/users/?${queryStringified}`)
  }, [queryStringified])

  const users = data?.metadata?.users
  const [listIds, setListIds] = useState(users?.map((user) => user.id))
  console.log("data::", data)
  const pages = useMemo(() => {
    return data?.metadata?.count
      ? Math.ceil(data?.metadata?.count / query.limit)
      : 0
  }, [data?.metadata?.count, query.limit])
  const ids = Array.from(selectedKeys).map((id) => +id)
  const handleOpenModal = (user) => {
    setUserSelected(user)
    onOpen()
  }
  const handleOpenModalDeleteAll = () => {
    setIsDel(true)
    if (selectedKeys !== "all") {
      setListIds(ids)
    }
    onOpen()
  }
  const renderCell = useCallback((user, columnKey) => {
    const cellValue = user[columnKey]

    switch (columnKey) {
      case "id":
        return (
          <div className="flex flex-col">
            <p className="text-sm capitalize text-bold">{cellValue}</p>
          </div>
        )
      case "name":
        return (
          <User
            avatarProps={{ radius: "full", src: user?.avatar }}
            description={user.fullname}
            name={cellValue}
          />
        )
      case "email":
        return (
          <div className="flex flex-col">
            <p className="text-sm text-bold">{cellValue}</p>
          </div>
        )
      case "provider":
        return (
          <div className="flex flex-col">
            <p className="text-sm capitalize text-bold">
              {cellValue || "Gmail"}
            </p>
          </div>
        )
      case "status":
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[user.status]}
            size="sm"
            variant="flat"
          >
            {cellValue ? "active" : "inactive"}
          </Chip>
        )
      case "actions":
        return (
          <div className="relative flex items-center gap-3">
            <Tooltip content="Details">
              <Link href={`/users/${user.id}`}>
                <span className="text-lg cursor-pointer text-default-400 active:opacity-50">
                  <EyeIcon />
                </span>
              </Link>
            </Tooltip>
            <Tooltip content="Edit user">
              <Link href={`/users/edit/${user.id}`}>
                <span className="text-lg cursor-pointer text-default-400 active:opacity-50">
                  <EditIcon />
                </span>
              </Link>
            </Tooltip>
            <Tooltip color="danger" content="Delete user">
              <span
                className="text-lg cursor-pointer text-danger active:opacity-50"
                onClick={() => handleOpenModal(user)}
              >
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
        )
      default:
        return cellValue
    }
  }, [])
  const columns = [
    { name: "ID", uid: "id" },
    { name: "NAME", uid: "name" },
    { name: "EMAIL", uid: "email" },
    { name: "PROVIDER", uid: "provider" },
    { name: "STATUS", uid: "status" },
    { name: "ACTIONS", uid: "actions" },
  ]

  const handleDelete = async () => {
    const response = await deleteUser(userSelected.id)
    setSelectedKeys(new Set([]))
    if (response.status === 200) {
      toast.success("Xóa user thành công!")
    } else {
      toast.error("Đã có lỗi xảy ra!")
    }
    mutate(`${api}/users?${queryStringified}`)
  }
  const handleDeleteAllUser = async () => {
    const response = await deleteAllUser({ ids: listIds })
    setIsDel(false)
    setSelectedKeys(new Set([]))
    if (response.status === 200) {
      toast.success("Xóa user thành công!")
    } else {
      toast.error("Đã có lỗi xảy ra!")
    }
    mutate(`${api}/users?${queryStringified}`)
  }
  const loadingState =
    isLoading || data?.metadata?.users?.length === 0 ? "loading" : "idle"
  return (
    <div className="relative">
      <div className="absolute z-10 left-16 top-[26px]">
        {ids.length > 1 ? (
          <Tooltip color="danger" content="Delete users">
            <span
              className="text-xl cursor-pointer text-danger active:opacity-50"
              onClick={handleOpenModalDeleteAll}
            >
              <DeleteIcon />
            </span>
          </Tooltip>
        ) : (
          ""
        )}
      </div>
      <Table
        aria-label="Example table with custom cells"
        selectionMode="multiple"
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
        bottomContent={
          pages > 0 ? (
            <div className="flex justify-center w-full">
              <Pagination
                isCompact
                showControls
                showShadow
                color="primary"
                page={page}
                total={pages}
                onChange={(page) => setPage(page)}
              />
            </div>
          ) : null
        }
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          items={users ?? []}
          loadingContent={<Spinner />}
          loadingState={loadingState}
        >
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex items-start gap-1">
                <IoIosWarning fontSize={"1.6rem"} color="red" />
                Confirm
              </ModalHeader>
              <ModalBody>
                <p>Bạn có chắc chắn muốn xóa không!</p>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="primary"
                  variant="bordered"
                  onPress={onClose}
                  onClick={() => setIsDel(false)}
                >
                  Close
                </Button>

                {isDel ? (
                  <Button
                    color="danger"
                    onPress={onClose}
                    variant="bordered"
                    onClick={handleDeleteAllUser}
                  >
                    Delete all
                  </Button>
                ) : (
                  <Button
                    color="danger"
                    onPress={onClose}
                    variant="bordered"
                    onClick={handleDelete}
                  >
                    Delete
                  </Button>
                )}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Toaster />
    </div>
  )
}

export default TableUsers
