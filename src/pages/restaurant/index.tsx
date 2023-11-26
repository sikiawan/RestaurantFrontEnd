import { Container } from 'postcss'
import React, { useState, useEffect, Fragment } from 'react'
import axios from 'axios';

const index = () => {
    const [show, setShow] = useState<boolean>(false);
    const [showadd, setShowadd] = useState<boolean>(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleaddClose = () => setShowadd(false);
    const handleaddShow = () => setShowadd(true);

    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [isActive, setIsActive] = useState<boolean>(true);


    const [editId, setEditId] = useState<string>('');
    const [editName, setEditName] = useState<string>('');
    const [editIsActive, setEditIsActive] = useState<boolean>(true);


    const [data, setData] = useState<any[]>([]); // Change any to the actual type

    useEffect(() => {
        getData();
    }, []);


    const clear = () => {
        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setIsActive(true);
        setEditName('');
        setEditIsActive(true);
        setEditId('');
    };
    const getData = () => {
        axios.get("https://localhost:7160/api/Restaurant")
            .then((response) => {
                console.log(response.data);
                setData(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    };
    const handleSave = () => {
        const url = 'https://localhost:7160/api/Restaurant';
        const postData = {
            name,
            email,
            password,
            confirmPassword,
            isActive,
        };

        axios.post(url, postData)
            .then((result) => {
                getData();
                clear();
                handleaddClose();
                alert('Record has been added.');
            })
            .catch((error) => {
                console.error(error);
            });
    };
    const handleEdit = (id: string) => {
        handleShow();
        axios.get(`https://localhost:7160/api/Restaurant/GetById?id=${id}`)
            .then((result) => {
                setEditName(result.data.name);
                setEditIsActive(result.data.isActive);
                setEditId(id);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const handleDelete = (id: string) => {
        if (window.confirm('Are you sure to Delete this record !') === true) {
            axios.delete(`https://localhost:7160/api/ClientPreference?id=${id}`)
                .then(() => {
                    alert('record has been deleted.');
                })
                .catch((error) => {
                    console.error(error);
                    alert('Error occurred while deleting record.');
                });
        }
    };

    const handleUpdate = () => {
        debugger;
        const url = 'https://localhost:7160/api/Restaurant';
        const putData = {
            id: editId,
            name: editName,
            isActive: editIsActive,
        };
    
        axios.post(url, putData)
            .then((result) => {
                getData();
                clear();
                handleClose();
                alert('Record has been updated.');
            })
            .catch((error) => {
                console.error(error);
            });
    };
    
    const [currentPage, setCurrentPage] = useState<number>(1);
    const recordsPerPage: number = 5;
    const lastIndex: number = currentPage * recordsPerPage;
    const firstIndex: number = lastIndex - recordsPerPage;
    const records: any[] = data.slice(firstIndex, lastIndex); // Change any to the actual type
    const npage: number = Math.ceil(data.length / recordsPerPage);
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
    return (
        <div className='mx-20'>
            <main className='flex items-center justify-center'>
                <h1 className='text-3xl font-bold'>Restaurant</h1>
            </main>
            <div className="container mx-auto my-4">
                <div className="flex space-x-4">
                    <button className="bg-blue-500 text-white p-2 rounded" onClick={() => handleaddShow()}>
                        Add Record
                    </button>
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
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.name}</th>
                                    <td className="px-6 py-4">{item.isActive.toString()}</td>
                                    <td colSpan={2}>
                                        <button
                                            className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
                                            onClick={() => handleEdit(item.id)}
                                        >
                                            Edit
                                        </button>{' '}
                                        &nbsp;
                                        <button
                                            className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                                            onClick={() => handleDelete(item.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5}>loading . . .</td>
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

            <div className={`fixed top-0 left-0 w-screen h-screen flex items-center justify-center ${showadd ? 'visible' : 'hidden'}`}>
                <div className="bg-white dark:bg-gray-900 p-4 rounded shadow-md w-1/2">
                    <div className="flex justify-between mb-4">
                        <h2 className="text-xl font-semibold">Add Record</h2>
                        <button className="text-gray-500" onClick={handleaddClose}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                    </div>
                    <div className="flex flex-col space-y-4">
                        <input
                            type="text"
                            className="border p-2 rounded"
                            placeholder="Enter Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <input
                            type="text"
                            className="border p-2 rounded"
                            placeholder="Enter Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            className="border p-2 rounded"
                            placeholder="Enter Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <input
                            type="password"
                            className="border p-2 rounded"
                            placeholder="Enter Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <label className="relative inline-flex items-center me-5 cursor-pointer">
                            <input type="checkbox" value="" className="sr-only peer"
                                checked={isActive}
                                onChange={(e) => setIsActive(e.target.checked)} />
                            <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                            <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">IsActive</span>
                        </label>               
                        <button className="bg-blue-500 text-white p-2 rounded self-end" onClick={handleSave}>
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>



            <div className={`fixed top-0 left-0 w-screen h-screen flex items-center justify-center ${show ? 'visible' : 'hidden'}`}>
                <div className="bg-white dark:bg-gray-900 p-4 rounded shadow-md w-1/2">
                    <div className="flex justify-between mb-4">
                        <h2 className="text-xl font-semibold">Edit Record</h2>
                        <button className="text-gray-500" onClick={handleClose}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                    </div>
                    <div className="flex flex-col space-y-4">
                        <input
                            type="text"
                            className="border p-2 rounded"
                            placeholder="Enter Name"
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                        />
                        <label className="relative inline-flex items-center me-5 cursor-pointer">
                            <input type="checkbox" value="" className="sr-only peer"
                                checked={editIsActive}
                                onChange={(e) => setEditIsActive(e.target.checked)} />
                            <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                            <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">IsActive</span>
                        </label>     
                        <button className="bg-blue-500 text-white p-2 rounded self-end" onClick={handleUpdate}>
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default index