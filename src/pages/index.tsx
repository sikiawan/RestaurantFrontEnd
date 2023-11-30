import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import CheckTable from "@/components/tables/CheckTable";
import axios from "axios";
import { useEffect, useState } from "react";
import { UsersHome } from "./columns";
const Home: NextPage = () => {
  const [data, setData] = useState<UsersHome[]>([]);

  const getData = () => {
    axios.get("https://localhost:7160/api/User")
        .then((response) => {
            setData(response.data.message);
        })
        .catch((error) => {
            console.error(error);
        });
}; 
useEffect(() => {
  getData();
}, []);
  return (
    <div className={styles.container}>
      <CheckTable usersData={data}/>
    </div>
  );
};

export default Home;
