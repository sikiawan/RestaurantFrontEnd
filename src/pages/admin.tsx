import FullTable from "@/components/tables/FullTable";
import { FC } from "react";

interface Props {}

const Admin: FC<Props> = (props): JSX.Element => {
  return <div>
    <FullTable />
  </div>;
};

export default Admin;
