import { User, Tooltip } from '@nextui-org/react'
import { DeleteIcon, EditIcon, EyeIcon } from '@/components/icons/icons'


export type ClientPreference = {
  id: string
  name: string
  tenanatId: string
  address : string
  cellNO : string
}
export const columns = [
  {name: "NAME", uid: "name", sortable: true},
  {name: "TENANT", uid: "tenantId", sortable: true},
  {name: "ADDRESS", uid: "address", sortable: true},
  {name: "CELLNO", uid: "cellNo", sortable: true},
  {name: "ACTIONS", uid: "actions"},
];

export const renderCell = (user: ClientPreference, columnKey: React.Key, onEdit: (id: string) => void, onDelete: (id: string) => void) => {
  const cellValue = user[columnKey as keyof ClientPreference]

  switch (columnKey) {
    case 'fordate':
      return <span>{new Date(cellValue).toLocaleDateString()}</span>
    case 'actions':
      return (
        <div className='relative flex items-center gap-4'>
          <Tooltip content='Edit user'>
            <span className='cursor-pointer text-lg text-default-400 active:opacity-50' onClick={() => onEdit(user.id)}>
              <EditIcon />
            </span>
          </Tooltip>
          <Tooltip color='danger' content='Delete user'>
            <span className='cursor-pointer text-lg text-danger active:opacity-50' onClick={() => onDelete(user.id)}>
              <DeleteIcon />
            </span>
          </Tooltip>
        </div>
      )
    default:
      return cellValue
  }
}
