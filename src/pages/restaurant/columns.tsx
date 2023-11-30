import { Tooltip, Chip, ChipProps } from '@nextui-org/react'
import { DeleteIcon, EditIcon, EyeIcon } from '@/components/icons/icons'


export type Restaurant = {
  id: string
  name: string
  isActive: string
}
export const columns = [
  {name: "NAME", uid: "name", sortable: true},
  {name: "ISACTIVE", uid: "isActive", sortable: true},
  {name: "ACTIONS", uid: "actions"},
];
const statusColorMap: Record<string, ChipProps["color"]> = {
  true: "success",
  false: "danger",
};
export const renderCell = (restaurant: Restaurant, columnKey: React.Key, onEdit: (id: string) => void, onDelete: (id: string) => void) => {
  const cellValue = restaurant[columnKey as keyof Restaurant]

  switch (columnKey) {
    case 'fordate':
      return <span>{new Date(cellValue).toLocaleDateString()}</span>
    case "isActive":
      return (
        <Chip className="capitalize" color={statusColorMap[restaurant.isActive]} size="sm" variant="flat">
          {restaurant.isActive? 'Active' : 'InActive'}
        </Chip>
      );
    case 'actions':
      return (
        <div className='relative flex items-center gap-4'>
          <Tooltip content='Edit user'>
            <span className='cursor-pointer text-lg text-default-400 active:opacity-50' onClick={() => onEdit(restaurant.id)}>
              <EditIcon />
            </span>
          </Tooltip>
          <Tooltip color='danger' content='Delete user'>
            <span className='cursor-pointer text-lg text-danger active:opacity-50' onClick={() => onDelete(restaurant.id)}>
              <DeleteIcon />
            </span>
          </Tooltip>
        </div>
      )
    default:
      return cellValue
  }
}
