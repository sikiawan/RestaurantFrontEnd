import { User, Tooltip } from '@nextui-org/react'
import { DeleteIcon, EditIcon, EyeIcon } from '@/components/icons/icons'


export type User = {
  id: string
  userName: string
  email: string
  tenantId : string
}

export const columns = [
  {
    key: 'userName',
    label: 'NAME'
  },
  {
    key: 'tenantId',
    label: 'TENANT'
  },
  {
    key: 'actions',
    label: 'Actions'
  }
]

export const renderCell = (user: User, columnKey: React.Key) => {
  const cellValue = user[columnKey as keyof User]

  switch (columnKey) {
    case 'userName':
      return (
        <User
          avatarProps={{ radius: 'lg', src: 'https://i.pravatar.cc/150?u=a092581d4ef9026700d' }}
          description={user.email}
          name={cellValue}
        >
          {user.email}
        </User>
      )
    case 'fordate':
      return <span>{new Date(cellValue).toLocaleDateString()}</span>
    case 'actions':
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
          <Tooltip content='Details'>
            <span className='cursor-pointer text-lg text-default-400 active:opacity-50'>
              <EyeIcon />
            </span>
          </Tooltip>
        </div>
      )
    default:
      return cellValue
  }
}
