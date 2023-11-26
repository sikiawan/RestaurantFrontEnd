import { FC } from "react";
interface Props {}

const index: FC<Props> = (props): JSX.Element => {
  return (
    <div className='px-10'>
      <main className='flex items-center justify-center'>
        <h1 className='text-3xl font-bold'>Dash Board</h1>
      </main>
    </div>
  )
}

export default index