'use client'
import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  User,
  Pagination,
  Selection,
  ChipProps,
  SortDescriptor,
  Tooltip
} from "@nextui-org/react";
import { PlusIcon, VerticalDotsIcon, ChevronDownIcon, SearchIcon, EditIcon, DeleteIcon, EyeIcon } from "../icons/icons";

import { capitalize } from "@/utils/utils";
import { ClientPreference, columns, renderCell } from '@/pages/clientpreference/columns'
import { debug } from "console";
const INITIAL_VISIBLE_COLUMNS = ["name", "address", "tenantId", "cellNo", "actions"];
export default function ClientPreferenceTable({
  clientPreference,
  pages,
  totalRecords,
  handleEdit,
  handleDelete,
  handleAdd,
  getDataWithParams,
}: {
  clientPreference: ClientPreference[];
  pages: number;
  totalRecords: number;
  handleEdit: (id: string, page:number, rowsPerPage:number, search:string) => void;
  handleDelete: (id: string, page:number, rowsPerPage:number, search:string) => void;
  handleAdd: (page:number, rowsPerPage:number, search:string) => void;
  getDataWithParams: (page: number, pageSize: number, search: string) => void;
}) {
  const [filterValue, setFilterValue] = React.useState("");
  const [visibleColumns, setVisibleColumns] = React.useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "namee",
    direction: "ascending",
  });
  const [page, setPage] = React.useState(1);
  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;
    return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
  }, [visibleColumns]);

  React.useEffect(() => {
    getDataWithParams(page, rowsPerPage, filterValue);
  }, [page, rowsPerPage, filterValue]);

  const sortedItems = React.useMemo(() => {
    return [...clientPreference].sort((a: ClientPreference, b: ClientPreference) => {
      const first = a[sortDescriptor.column as keyof ClientPreference] as string;
      const second = b[sortDescriptor.column as keyof ClientPreference] as string;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, clientPreference]);
  const onNextPage = React.useCallback(() => {
    setPage(pages);
  }, [pages]);

  const onPreviousPage = React.useCallback(() => {
    setPage(1);
  }, []);

  const onRowsPerPageChange = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const newRowsPerPage = Number(e.target.value);
      setRowsPerPage(newRowsPerPage);
      setPage(1);
    },
    []
  );

  const onSearchChange = React.useCallback(
    (value?: string) => {
      setFilterValue(value ?? "");
      setPage(1);
    },[]);
  const onClear = React.useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);
  const onAdd = React.useCallback(() => {
    handleAdd(page, rowsPerPage, filterValue)
  }, [page, rowsPerPage, filterValue]);
  const onEdit = React.useCallback((id:string) => {
    handleEdit(id, page, rowsPerPage, filterValue)
  }, [page, rowsPerPage, filterValue]);
  const onDelete = React.useCallback((id:string) => {
    handleDelete(id, page, rowsPerPage, filterValue)
  }, [page, rowsPerPage, filterValue]);
  

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="h-12 w-full sm:max-w-[44%]"
            placeholder="Search by name..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={onClear}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                  Columns
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Button onClick={onAdd} color="primary" endContent={<PlusIcon />}>
              Add New
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">Total {totalRecords} clientPreferences</span>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [filterValue, visibleColumns, onSearchChange, onRowsPerPageChange, onAdd, totalRecords]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onPreviousPage}>
            First
          </Button>
          <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onNextPage}>
            Last
          </Button>
        </div>
      </div>
    );
  }, [onNextPage, onPreviousPage, getDataWithParams, page, pages, rowsPerPage]);

  return (
    <Table
      aria-label="Example table with custom cells, pagination and sorting"
      isHeaderSticky
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
      onSortChange={setSortDescriptor}
    >
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
            allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={"No clientPreference found"} items={sortedItems}>
        {(clientPreference) => (
          <TableRow key={clientPreference.id}>
            {(columnKey) => (
              <TableCell>{renderCell(clientPreference, columnKey, onEdit, onDelete)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
