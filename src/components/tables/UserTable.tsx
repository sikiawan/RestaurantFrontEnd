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
  Tooltip,
  Select,
  SelectItem
} from "@nextui-org/react";
import { PlusIcon, VerticalDotsIcon, ChevronDownIcon, SearchIcon, EditIcon, DeleteIcon, EyeIcon } from "../icons/icons";

import { capitalize } from "@/utils/utils";
import { columns, UsersHome, statusOptions, renderCell, Tenants } from "@/pages/users/columns";

const INITIAL_VISIBLE_COLUMNS = ["userName", "role", "isActive", "actions"];

export default function UserTable({ 
  usersData, 
  tenants,
  pages,
  totalRecords,
  //handleEdit,
  //handleDelete,
  handleLogin,
  handleAdd,
  getDataWithParams,
}: { 
  usersData: UsersHome[], 
  tenants: Tenants[],
  pages: number;
  totalRecords: number;
  //handleEdit: (id: string, page:number, rowsPerPage:number, search:string) => void;
  //handleDelete: (id: string, page:number, rowsPerPage:number, search:string) => void;
  handleLogin: (id: string) => void;
  handleAdd: (tenant : number, page:number, rowsPerPage:number, search:string, statusFilter:string[]) => void;
  getDataWithParams: (tenant : number, page: number, pageSize: number, search: string, statusFilter:string[]) => void;
}) {
  const [filterValue, setFilterValue] = React.useState("");
  const [visibleColumns, setVisibleColumns] = React.useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [statusFilter, setStatusFilter] = React.useState<Selection>("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "namee",
    direction: "ascending",
  });
  const [page, setPage] = React.useState(1);
  const [tenant, setTenant] = React.useState(0);
  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;
    return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
  }, [visibleColumns]);
  // const filteredItems = React.useMemo(() => {
  //   console.log(statusFilter);
  //   let filteredUsers = Array.isArray(usersData) ? [...usersData] : [];
  //   if (statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
  //     debugger;
  //     filteredUsers = filteredUsers.filter((user) =>

  //       Array.from(statusFilter).includes(user.isActive.toString()),
  //     );
  //   }

  //   return filteredUsers;
  // }, [usersData, statusFilter]);
  const getStatusList = React.useCallback(() => {
    if (statusFilter === "all") {
      return Array.from(['true', 'false']).map(String);
    } else {
      return Array.from(statusFilter).map(String);
    }
  }, [statusFilter]);
  React.useEffect(() => {
    const statusList = getStatusList();
    getDataWithParams(tenant, page, rowsPerPage, filterValue,  statusList );
  }, [tenant, page, rowsPerPage, filterValue, statusFilter]);

  const sortedItems = React.useMemo(() => {
    return [...usersData].sort((a: UsersHome, b: UsersHome) => {
      const first = a[sortDescriptor.column as keyof UsersHome] as string;
      const second = b[sortDescriptor.column as keyof UsersHome] as string;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, usersData]);
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
  const onTenantChange = ((id:number) => {
    console.log(id);
    if(isNaN(id)){
      setTenant(0);
    }
    else{
      setTenant(id)
    }
  });
  const onAdd = React.useCallback(() => {
    const statusList = getStatusList();
    handleAdd(tenant, page, rowsPerPage, filterValue, statusList)
  }, [tenant, page, rowsPerPage, filterValue, statusFilter]);
  // const onEdit = React.useCallback((id:string) => {
  //   handleEdit(id, page, rowsPerPage, filterValue)
  // }, [page, rowsPerPage, filterValue]);
  // const onDelete = React.useCallback((id:string) => {
  //   handleDelete(id, page, rowsPerPage, filterValue)
  // }, [page, rowsPerPage, filterValue]);
  const onLogin = React.useCallback((id:string) => {
    handleLogin(id)
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by name..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
          <Select
            label="Select tenant"
            className="max-w-xs"
            onChange={(e) => onTenantChange(parseInt(e.target.value))}
          >
            {tenants.map((tenant) => (
              <SelectItem key={tenant.id} value={tenant.id}>
                {tenant.name}
              </SelectItem>
            ))}
          </Select>
        </div>
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                  Status
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={statusFilter}
                selectionMode="multiple"
                onSelectionChange={setStatusFilter}
              >
                {statusOptions.map((status) => (
                  <DropdownItem key={status.uid}>
                    {status.name}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
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
          <span className="text-default-400 text-small">Total {totalRecords} users</span>
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
  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    onSearchChange,
    onRowsPerPageChange,
    usersData.length,
    //hasSearchFilter,
  ]);

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
  }, [usersData.length, page, pages]);

  return (
    <Table
      className="mt-1"
      aria-label="Example table with custom cells, pagination and sorting"
      isHeaderSticky
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      classNames={{
        wrapper: "max-h-[382px]",
      }}
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
      <TableBody emptyContent={"No users found"} items={sortedItems}>
        {(usersData) => (
          <TableRow key={usersData.id}>
            {(columnKey) => <TableCell>{renderCell(usersData, columnKey, onLogin)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
