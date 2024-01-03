import { Tooltip, Chip, ChipProps } from '@nextui-org/react'
import { DeleteIcon, EditIcon, EyeIcon } from '@/components/icons/icons'
import { useRouter } from 'next/router'

export type Restaurant = {
  id: string
  name: string
  localizedName : string
  isActive: string
}

const statusColorMap: Record<string, ChipProps["color"]> = {
  true: "success",
  false: "danger",
};
export const renderCell = (restaurant: Restaurant, columnKey: React.Key, locale: any, commonT : any, onEdit: (id: string) => void, onDelete: (id: string) => void) => {
  const cellValue = restaurant[columnKey as keyof Restaurant]

  switch (columnKey) {
    case 'name':
      return (locale === 'en' ? restaurant.name : restaurant.localizedName);
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
          <Tooltip content={commonT('edit')}>
            <span className='cursor-pointer text-lg text-default-400 active:opacity-50' onClick={() => onEdit(restaurant.id)}>
              <EditIcon />
            </span>
          </Tooltip>
          <Tooltip color='danger' content={commonT('delete')}>
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
