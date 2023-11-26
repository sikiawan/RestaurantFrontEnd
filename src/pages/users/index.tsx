import { NextPage } from "next";
import { signOut, useSession } from "next-auth/react";
import Router from "next/router";
import React, { useState, useEffect, Fragment } from 'react'
import axios from 'axios';
import { signIn } from "next-auth/react";
import Jwt from 'jsonwebtoken';
import { useRouter } from 'next/router';
import { debug } from "console";

const Index: NextPage = (): JSX.Element => {
    const router = useRouter();
    const { status, data } = useSession();
    const [selectedTenant, setSelectedTenant] = useState<string | null>(null);
    const [tableData, setTableData] = useState<any[]>([]);
    const [tenantData, setTenantData] = useState<any[]>([]);

    useEffect(() => {
        console.log(data?.user?.image)
        if (status === "unauthenticated") Router.replace("/auth/signin");
    }, [status]);


    useEffect(() => {
        getData('0');
        getTenantData();
    }, []);

    const getData = (id: string) => {
        debugger;
        axios.get(`https://localhost:7160/api/User?tenantId=${id}`)
            .then((response) => {
                console.log(response.data);
                setTableData(response.data.message);
            })
            .catch((error) => {
                console.error(error);
            });
    };
    const getTenantData = () => {
        axios.get("https://localhost:7160/api/Restaurant")
            .then((response) => {
                setTenantData(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    };
    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure to Loing from this user !') === true) {
            try {
                debugger;
                const fetchResponse = await fetch(`https://localhost:7160/api/Auth/AuthenticateById?id=${id}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                });

                if (!fetchResponse.ok) {
                    throw new Error(`Request failed with status: ${fetchResponse.status}`);
                }

                const resp = await fetchResponse.json();

                const json = Jwt.decode(resp.message) as { [key: string]: string };
                signIn("credentials", {
                    email: json['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'],
                    name: json['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'],
                    role: json['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'],
                    redirect: false,
                }).then(() => {
                    router.push('/');
                });
            } catch (error) {
                console.error('Fetch error:');
            }
        }
    };

    const [currentPage, setCurrentPage] = useState<number>(1);
    const recordsPerPage: number = 5;
    const lastIndex: number = currentPage * recordsPerPage;
    const firstIndex: number = lastIndex - recordsPerPage;
    const records: any[] = tableData.slice(firstIndex, lastIndex); // Change any to the actual type
    const npage: number = Math.ceil(tableData.length / recordsPerPage);
    const numbers: number[] = Array.from({ length: npage }, (_, index) => index + 1);

    function nextPage() {
        if (currentPage !== npage) {
            setCurrentPage(currentPage + 1);
        }
    }

    function prePage() {
        if (currentPage !== 1) {
            setCurrentPage(currentPage - 1);
        }
    }

    function changeCPage(pnum: number) {
        setCurrentPage(pnum);
    }
    if (data?.user?.image === "SuperAdmin") {
        return (
            <div className='mx-20'>
                <main className='flex items-center justify-center'>
                    <h1 className='text-3xl font-bold'>Users</h1>
                </main>
                <div className="container mx-auto my-4">
                    <div className="flex space-x-4">
                        <button className="bg-blue-500 text-white p-2 rounded" >
                            Add Record
                        </button>
                        <select
                            className="border p-2 rounded"
                            //value={selectedTenant}
                            onChange={(e) => getData(e.target.value)}
                        >
                            <option value="">All Tenants</option>
                            {tenantData.map((tenant) => (
                                <option key={tenant.id.toString()} value={tenant.id.toString()}>
                                    {tenant.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Email
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    IsActive
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {records && records.length > 0 ? (
                                records.map((item, index) => (
                                    <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700" key={item.id}>
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.userName}</th>
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.email}</th>
                                        <td className="px-6 py-4">{item.isActive.toString()}</td>
                                        <td colSpan={2}>
                                            <button
                                                className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"

                                            >
                                                Edit
                                            </button>{' '}
                                            &nbsp;
                                            <button
                                                className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"

                                            >
                                                Delete
                                            </button>
                                            &nbsp;
                                            <button
                                                className="text-yellow-400 hover:text-white border border-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-white dark:hover:bg-yellow-400 dark:focus:ring-yellow-900"
                                                onClick={() => handleDelete(item.id)}
                                            >
                                                Login
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5}>Data not found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="flex justify-center my-4">
                    <ul className="flex space-x-2">
                        <li>
                            <a href="#" className="border p-2 rounded" onClick={prePage}>
                                Prev
                            </a>
                        </li>
                        {
                            numbers.map((n, i) => (
                                <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={i}>
                                    <a href='#' className="border p-2 rounded" onClick={() => changeCPage(n)}>
                                        {n}
                                    </a>
                                </li>
                            ))
                        }
                        <li>
                            <a href='#' className="border p-2 rounded"
                                onClick={nextPage}>Next</a>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
    else {
        return (
            <div>Only Super Admin can View this page</div>
        )
    }
}

export default Index