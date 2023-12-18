import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import UserTable from "@/components/tables/UserTable";
import axios from "axios";
import { FormEventHandler, useEffect, useState } from "react";
import {UsersHome } from "./columns";
import toast from 'react-hot-toast';
import { stat } from "fs";
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, useDisclosure } from "@nextui-org/react";
import { useRouter } from "next/router";
import Jwt from 'jsonwebtoken';
import { signIn, useSession } from "next-auth/react";
import { Roles, Tenants } from "@/types/types";


const Home: NextPage = () => {
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [data, setData] = useState<UsersHome[]>([]);
  const [tenants, setTenants] = useState<Tenants[]>([]);
  const [roles, setRoles] = useState<Roles[]>([]);
  const [pages, setPages] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [tenant, setTenant] = useState(0);
  const [search, setSearch] = useState('');
  const [statusList, setStatusList] = useState<string[]>(['true', 'false'])
  const [id, setId] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [role, setRole] = useState('');
  const [tenantId, setTenantId] = useState('');

  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [errorRole, setErrorRole] = useState('');
  const [errorUserName, setErrorUserName] = useState('');
  const [errorTenant, setErrorTenant] = useState('');
  const { data: session } = useSession()

  const getData = (tenant = 0, page = 1, pageSize = 5, search = '', statusFilter = ['true', 'false']) => {
    console.log('api called out');
    const url = 'https://localhost:7160/api/User';
    const data = {
      tenant: tenant,
      page: page,
      pageSize: pageSize,
      search: search,
      statusFilter: statusFilter,
    }
    axios.post(url, data)
      .then((response) => {
        console.log('api called');
        setData(response.data.message.users);
        setPages(response.data.message.totalPages);
        setTotalRecords(response.data.message.totalRecords);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const getTenants = () => {
    axios.get("https://localhost:7160/api/Restaurant/GetAll")
      .then((response) => {
        setTenants(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const getRoles = () => {
    axios.get("https://localhost:7160/api/Roles")
      .then((response) => {
        setRoles(response.data.message);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    getTenants();
    getRoles();
  }, []);
  const clear = () => {
    setUserName('');
    setEmail('');
    setPassword('');
    setPhoneNumber('');
    setRole('');
    setTenantId('');
    setPage(1)
    setRowsPerPage(5);
    setSearch('');
};
  const handleAdd = (tenant: number, page: number, rowsPerPage: number, search: string, statusFilter: string[]) => {
    debugger;
    onOpen();
    setPage(page);
    setRowsPerPage(rowsPerPage);
    setSearch(search);
  };

  const handleSave = (onClose: () => void) => {
    const url = 'https://localhost:7160/api/Auth/Register';
    let data = {};
    if (id === '') {
      data = {
        userName,
        email,
        password,
        phoneNumber,
        role,
        tenantId,
      }
    }
    else {
      data = {
        id: parseInt(id, 10),
        userName,
        email,
        password,
        phoneNumber,
        role,
        tenantId,
      }
    }

    const resp = axios.post(url, data)
      .then((result) => {
        getData(tenant,page, rowsPerPage, search, statusList);
        clear();
        onClose();
        toast.success('Record has been saved.');

      })
      .catch((error) => {
        if(error.response.data.errors){
          setErrorUserName(error.response.data.errors.Username);
          setErrorEmail(error.response.data.errors.Email);
          setErrorPassword(error.response.data.errors.Password);
          setErrorRole(error.response.data.errors.Role);
          setErrorTenant(error.response.data.errors.TenantId);
        }
        //console.error(error)
      });
      
  };
  const onTenantChange = ((id:number) => {
    if(isNaN(id)){
      setTenantId('');
    }
    else{
      setTenantId(id.toString())
    }
  });
  const handleLogin = async (id: string) => {
    if (window.confirm('Are you sure to Loing from this user !') === true) {
      try {
          debugger;
          const fetchResponse = await fetch(`https://localhost:7160/api/Auth/AuthenticateById?id=${id}&saId=${session?.user.id}`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
          });

          if (!fetchResponse.ok) {
              throw new Error(`Request failed with status: ${fetchResponse.status}`);
          }

          const resp = await fetchResponse.json();
          const json = Jwt.decode(resp.message) as { [key: string]: string };
          console.log(json);
          signIn("credentials", {
              email: json['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'],
              name: json['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'],
              role: json['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'],
              permission: json['permission'],
              saId : json['saId'],
              redirect: false,
          }).then(() => {
              router.push('/');
          });
      } catch (error) {
          console.error('Fetch error:');
      }
  }
  };
  return (
    <section className='flex items-center justify-center my-2'>
      <div className='container'>
        <UserTable
          usersData={data}
          tenants={tenants}
          pages={pages}
          totalRecords={totalRecords}
          //handleEdit={handleEdit} 
          //handleDelete={handleDelete} 
          handleLogin={handleLogin}
          handleAdd={handleAdd}
          getDataWithParams={getData}
        />
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          scrollBehavior='inside'
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">Add or Update</ModalHeader>
                <ModalBody>
                  <Input
                    autoFocus
                    //   endContent={
                    //     <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    //   }
                    label="User Name"
                    placeholder="Enter user name"
                    variant="bordered"
                    value={userName}
                    errorMessage={errorUserName}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                  <Input
                    label="Email"
                    placeholder="Enter a valid email"
                    variant="bordered"
                    value={email}
                    errorMessage={errorEmail}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Input
                    label="Password"
                    placeholder="Enter password"
                    variant="bordered"
                    value={password}
                    errorMessage={errorPassword}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Input
                    label="Phone No"
                    placeholder="Enter phone number"
                    variant="bordered"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                  <Select
                    label="Select role"
                    onChange={(e) => setRole(e.target.value)}
                    value={tenantId}
                    errorMessage={errorRole}
                  >
                    {roles.map((role) => (
                      <SelectItem key={role.name} value={role.name}>
                        {role.name}
                      </SelectItem>
                    ))}
                  </Select>
                  <Select
                    label="Select tenant"
                    onChange={(e) => onTenantChange(parseInt(e.target.value))}
                    value={tenantId}
                    errorMessage={errorTenant}
                  >
                    {tenants.map((tenant) => (
                      <SelectItem key={tenant.id} value={tenant.id}>
                        {tenant.name}
                      </SelectItem>
                    ))}
                  </Select>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="flat" onPress={onClose}>
                    Close
                  </Button>
                  <Button color="primary" onPress={() => handleSave(onClose)}>
                    Save
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </section>
  );
};

export default Home;
