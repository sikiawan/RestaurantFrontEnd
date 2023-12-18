import { DeleteIcon, EditIcon, EyeIcon, UserIcon } from "@/components/icons/icons"
import { Chip, ChipProps, Tooltip, User } from "@nextui-org/react"
import React, { useCallback } from 'react';

export type UsersHome = {
  id: string
  userName: string
  email: string
  isActive: string
  tenantId : string
}

 export const columns = [
  {name: "NAME", uid: "userName", sortable: true},
  {name: "ROLE", uid: "role", sortable: true},
  {name: "STATUS", uid: "isActive", sortable: true},
  {name: "ACTIONS", uid: "actions"},
];
export const statusOptions = [
  {name: "Active", uid: "true"},
  {name: "InActive", uid: "false"},
];
const statusColorMap: Record<string, ChipProps["color"]> = {
  true: "success",
  false: "danger",
};
export const renderCell = (user: UsersHome, columnKey: React.Key, onLogin: (id: string) => void,) => {
  const cellValue = user[columnKey as keyof UsersHome];

  switch (columnKey) {
    case "userName":
      return (
        <User
          avatarProps={{radius: "lg", src: '/user.png'}}
          description={user.email}
          name={cellValue}
        >
          {user.email}
        </User>
      );
    // case "role":
    //   return (
    //     <div className="flex flex-col">
    //       <p className="text-bold text-small capitalize">{cellValue}</p>
    //       <p className="text-bold text-tiny capitalize text-default-400">{user.team}</p>
    //     </div>
    //   );
    case "isActive":
      return (
        <Chip className="capitalize" color={statusColorMap[user.isActive]} size="sm" variant="flat">
          {user.isActive? 'Active' : 'InActive'}
        </Chip>
      );
    case "actions":
      return (
                <div className='relative flex items-center gap-4'>
                  <Tooltip content='Edit user'>
                    <span className='cursor-pointer text-lg text-default-400 active:opacity-50'>
                      <EditIcon />
                    </span>
                  </Tooltip>
                  <Tooltip color='danger' content='Delete user'>
                    <span className='cursor-pointer text-lg text-danger active:opacity-50'>
                      <DeleteIcon />
                    </span>
                  </Tooltip>
                  <Tooltip content='Login'>
                    <span className='cursor-pointer text-lg text-default-400 active:opacity-50' onClick={() => onLogin(user.id)}>
                      <UserIcon />
                    </span>
                  </Tooltip>
                </div>
              )
    default:
      return cellValue;
  }
};