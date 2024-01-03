import { Listbox, ListboxItem } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Category, Item, SubCategory } from '@/types/types';
const index = () => {
    const [categoryData, setCategoryData] = useState<Category[]>([]);
    const [subCategoryData, setSubCategoryData] = useState<SubCategory[]>([]);
    const [itemData, setItemData] = useState<Item[]>([]);
    const [tableData, setTableData] = useState<Array<{ productName: string; price: number; quantity: number; subCategoryName: string }>>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const getCategoryData = () => {
        axios.get('https://localhost:7160/api/Category')
            .then((response) => {
                setCategoryData(response.data);
                debugger;
            })
            .catch((error) => {
                console.error(error);
            });
    };
    const getSubCategoryData = (id = 0) => {
        axios.get(`https://localhost:7160/api/SubCategory/GetSubCategoriesByCategoryId?categoryId=${id}`)
            .then((response) => {
                setSubCategoryData(response.data);
                debugger;
            })
            .catch((error) => {
                console.error(error);
            });
    };
    const getItemData = (id = 0) => {
        axios.get(`https://localhost:7160/api/Item/GetItemsBySubCategoryId?subCategoryId=${id}`)
            .then((response) => {
                setItemData(response.data);
                debugger;
            })
            .catch((error) => {
                console.error(error);
            });
    };
    useEffect(() => {
        getCategoryData();
    }, []);
    const handleCategoryClick = (categoryId: number) => {
        getSubCategoryData(categoryId);
    };
    const handleSubCategoryClick = (subCategoryId: number) => {
        getItemData(subCategoryId);
        setIsModalOpen(true);
    };
    const handleItemClick = (item: Item) => {
        // Check if the item is already in tableData
        const existingItemIndex = tableData.findIndex((tableItem) => tableItem.productName === item.name);
    
        if (existingItemIndex !== -1) {
            // If the item already exists, update the quantity
            setTableData((prevTableData) => {
                const updatedTableData = [...prevTableData];
                updatedTableData[existingItemIndex].quantity += 1;
                return updatedTableData;
            });
        } else {
            // If the item doesn't exist, add a new entry
            setTableData((prevTableData) => [
                ...prevTableData,
                { productName: item.name, price: item.price, quantity: 1, subCategoryName: item.subCategoryName },
            ]);
        }
    };
    // const yourData = [
    //     {
    //         id: 1,
    //         name: 'burger',
    //         pic: '/burger.jpg',
    //     },
    //     {
    //         id: 2,
    //         name: 'biryani',
    //         pic: '/biryani.jpg',
    //     },
    //     {
    //         id: 3,
    //         name: 'pizza',
    //         pic: '/pizza.jpg',
    //     },
    //     {
    //         id: 4,
    //         name: 'pizza',
    //         pic: '/pizza.jpg',
    //     },
    //     {
    //         id: 5,
    //         name: 'pizza',
    //         pic: '/pizza.jpg',
    //     },
    //     {
    //         id: 6,
    //         name: 'pizza',
    //         pic: '/pizza.jpg',
    //     },
    //     {
    //         id: 7,
    //         name: 'pizza',
    //         pic: '/pizza.jpg',
    //     },
    //     {
    //         id: 8,
    //         name: 'pizza',
    //         pic: '/pizza.jpg',
    //     },
    //     {
    //         id: 9,
    //         name: 'pizza',
    //         pic: '/pizza.jpg',
    //     },
    //     {
    //         id: 10,
    //         name: 'pizza',
    //         pic: '/pizza.jpg',
    //     },
    //     {
    //         id: 11,
    //         name: 'pizza',
    //         pic: '/pizza.jpg',
    //     },
    //     {
    //         id: 12,
    //         name: 'pizza',
    //         pic: '/pizza.jpg',
    //     },
    // ];
    const sideData = [
        {
            id: 1,
            name: 'Change Table',
            color: 'bg-color-Yellow',
        },
        {
            id: 2,
            name: 'Select Customer',
            color: 'bg-color-Primary',
        },
        {
            id: 3,
            name: 'Ticket Note',
            color: 'bg-color-Gray',
        },
        {
            id: 4,
            name: 'Print Bill',
            color: 'bg-color-Red',
        },
        {
            id: 5,
            name: 'Add Ticket',
            color: 'bg-color-Light',
        },
    ];
    // const tableData = [
    //     {
    //         productName: "Pizza",
    //         price: "3.75",
    //     },
    //     {
    //         productName: "Burger",
    //         price: "6.74",
    //     },
    // ];
    return (
        <>
            <div className=' bg-white'>
                <nav className='bg-[#f5f6f9] border-gray-200 dark:bg-gray-900 p-4'>
                    <div className='max-w-screen-xl flex items-center justify-between mx-auto'>
                        <button className='text-white bg-color-Cyan hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium text-sm px-5 py-1 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'>
                            Main Menu
                        </button>
                        <div id='navbar-default'>
                            <ul>
                                <li>Date</li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <div className="bg-[#efefef] px-1">
                    <div className="flex flex-row gap-4 overflow-x-auto scrollbar-hide max-h-[100px]">
                        {categoryData.map((item) => (
                            <div key={item.id}
                                className=" bg-color-Cyan border rounded-lg overflow-hidden shadow-md w-32 flex flex-col items-center justify-center my-2"
                                onClick={() => handleCategoryClick(item.id)}
                            >
                                <img src={item.pic} alt={item.name} className="w-10 h-10 mt-2 object-cover" />
                                <div className="p-1">
                                    <h3 className="text-center font-bold text-white">{item.name}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='flex flex-row h-full items-start justify-start gap-16'>
                    <div className='flex flex-col h-full ml-10 mt-2'>
                        {sideData.map((item) => (
                            <div
                                key={item.id}
                                className={` ${item.color} border rounded-lg overflow-hidden shadow-md w-32 h-16 flex flex-col items-center justify-center mb-4`}
                            >
                                <div className="p-1">
                                    <h3 className="text-center font-bold text-white">{item.name}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className=' h-[430px] w-[500px] rounded-xl mt-2 bg-[#f9f9f9]'>
                        <div className="container mx-auto mt-1">
                            <div className="flex flex-wrap gap-x-6 justify-center gap-2 overflow-x-auto scrollbar-hide max-h-[210px]">
                                {subCategoryData.map((item) => (
                                    <div
                                        key={item.id}
                                        className="border overflow-hidden shadow-md w-32"
                                        onClick={() => handleSubCategoryClick(item.id)}
                                    >
                                        <img src={item.pic} alt={item.name} className="w-full h-16 object-cover" />
                                        <div>
                                            <h4 className="text-center font-bold">{item.name}</h4>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="container mx-auto mt-1">
                            <div className='flex flex-row gap-12 mr-2'>
                                <div className="relative flex items-center w-[56.5%] ml-6">
                                    <input
                                        type="search"
                                        id="search-dropdown"
                                        className="block p-2.5 w-full h-8 rounded-tl-lg rounded-bl-lg ml-2 z-20 sm:text-xs text-gray-900 bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                                        placeholder=""
                                        required
                                    />
                                    <button
                                        type="submit"
                                        className=" px-3 h-8 text-sm font-medium text-white bg-[#bebebe] rounded-e-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    >
                                        <svg
                                            className="w-4 h-4"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                stroke="currentColor"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="m6 18L18 6M6 6l12 12"
                                            />
                                        </svg>
                                    </button>
                                </div>

                                <button type="button" className=" h-8 w-28 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-color-Cyan rounded-lg border border-gray-200 hover:bg-gray-100  ">Enter</button>
                            </div>
                        </div>
                        <div className="container mx-auto mt-1">
                            <div className='flex flex-wrap justify-center max-w-[500px] gap-x-10 mx-2'>
                                <button type="button" className=" h-8 w-28 py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-color-Light rounded-lg border border-gray-200 hover:bg-gray-100  ">1</button>
                                <button type="button" className=" h-8 w-28 py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-color-Light rounded-lg border border-gray-200 hover:bg-gray-100  ">2</button>
                                <button type="button" className=" h-8 w-28 py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-color-Light rounded-lg border border-gray-200 hover:bg-gray-100  ">3</button>
                                <button type="button" className=" h-8 w-28 py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-color-Light rounded-lg border border-gray-200 hover:bg-gray-100  ">4</button>
                                <button type="button" className=" h-8 w-28 py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-color-Light rounded-lg border border-gray-200 hover:bg-gray-100  ">5</button>
                                <button type="button" className=" h-8 w-28 py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-color-Light rounded-lg border border-gray-200 hover:bg-gray-100  ">6</button>
                                <button type="button" className=" h-8 w-28 py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-color-Light rounded-lg border border-gray-200 hover:bg-gray-100  ">7</button>
                                <button type="button" className=" h-8 w-28 py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-color-Light rounded-lg border border-gray-200 hover:bg-gray-100  ">8</button>
                                <button type="button" className=" h-8 w-28 py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-color-Light rounded-lg border border-gray-200 hover:bg-gray-100  ">9</button>
                                <button type="button" className=" h-8 w-28 py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-color-Light rounded-lg border border-gray-200 hover:bg-gray-100  ">.</button>
                                <button type="button" className=" h-8 w-28 py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-color-Light rounded-lg border border-gray-200 hover:bg-gray-100  ">0</button>
                                <button type="button" className=" h-8 w-28 py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-color-Light rounded-lg border border-gray-200 hover:bg-gray-100  ">X</button>


                            </div>
                        </div>
                    </div>
                    <div className='h-[430px] w-[500px] mt-2'>
                        <div className='container mx-auto relative'>
                            <div className='h-[385px] w-full bg-color-Light rounded-xl flex flex-col justify-between'>
                                <div className="relative overflow-x-auto sm:rounded-lg">
                                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                        <thead className="text-xs text-gray-700 bg-[#bebebe] dark:bg-gray-700 dark:text-gray-400">
                                            <tr>
                                                <th scope="col" className="px-6 py-3">
                                                    Table: A1
                                                </th>
                                                <th scope="col" className="px-6 py-3 absolute right-0">
                                                    Status: New
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {tableData.map((item, index) => (
                                                <tr key={index} className="bg-color-Light dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-600">
                                                    <th scope="row" className="px-6 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                        {item.quantity+' '+ item.subCategoryName + ' ('+ item.productName+')'}
                                                    </th>
                                                    <td className="px-2 py-1 absolute right-0 mr-5">
                                                        {item.price}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div className=" rounded-lg text-xs text-gray-700 bg-[#bebebe] dark:bg-gray-700 dark:text-gray-400">
                                    <div className=" flex flex-row font-semibold text-gray-900 dark:text-white">
                                        <div className="px-6 py-1 text-base">Total</div>
                                        <div className="px-6 py-2 absolute right-0 mr-5">
                                            {tableData.reduce((total, item) => total + item.price, 0).toFixed(2)}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <button type="button" className=" h-[30px] mt-1 w-32  px-5 me-2 mb-2 text-sm font-medium text-white focus:outline-none bg-color-Green rounded-sm border border-gray-200 hover:bg-gray-100  ">Settle</button>
                            <button type="button" className="absolute right-0 h-[30px] mt-1 w-32 px-5 me-2 mb-2 text-sm font-medium text-white focus:outline-none bg-color-Red rounded-sm border border-gray-200 hover:bg-gray-100">Close</button>
                        </div>
                    </div>

                </div>
            </div>
            {isModalOpen && (
                <div id="default-modal" className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-2xl p-4 md:p-5">
                    <div className="relative p-4 w-full max-w-2xl max-h-full">
                        {/* Modal content */}
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            {/* Modal header */}
                            <div className="flex items-center justify-between p-2 md:p-3 rounded-t dark:border-gray-600">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="text-black bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>
                            {/* Modal body */}
                            <div className="p-4 md:p-5 space-y-4">
                                <div className="flex flex-row gap-4 overflow-x-auto justify-center scrollbar-hide max-h-[100px]">
                                    {itemData.map((item) => (
                                        <div key={item.id}
                                            className=" bg-color-Cyan border rounded-lg overflow-hidden shadow-md h-20 w-32 flex flex-col items-center justify-center my-2"
                                            onClick={() => handleItemClick(item)}
                                            >
                                            <div className="p-1 flex flex-col">
                                                <h3 className="text-center font-bold text-white">{item.name}</h3>
                                                <h4 className="text-center font-bold text-white">{'('+ item.price+')'}</h4>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>)
            }

        </>
    )
}

export default index