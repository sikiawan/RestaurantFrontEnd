import { Listbox, ListboxItem } from '@nextui-org/react'
import React, { useState } from 'react'

const index = () => {
    const sideData = [
        {
            id: 1,
            name: 'Cash',
            color: 'bg-color-Yellow',
        },
        {
            id: 2,
            name: 'Credit Card',
            color: 'bg-color-Gray',
        },
        {
            id: 3,
            name: 'Voucher',
            color: 'bg-color-Primary',
        },
        {
            id: 4,
            name: 'Customer Account',
            color: 'bg-color-Light',
        },
        {
            id: 5,
            name: 'Close',
            color: 'bg-color-Red',
        },
    ];
    const tableData = [
        {
            productName: "Pizza",
            color: "SAR 3.75",
        },
        {
            productName: "Burger",
            color: "SAR 6.74",
        },
    ];
    return (
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

            <div className='flex flex-row h-full items-start justify-start gap-16'>
                <div className='flex flex-col h-full ml-10 mt-2'>
                    {sideData.map((item) => (
                        <div key={item.id} className={` ${item.color} border rounded-lg overflow-hidden shadow-md w-40 h-20 flex flex-col items-center justify-center mb-4`}>
                            <div className="p-1">
                                <h3 className="text-center font-bold text-white">{item.name}</h3>
                            </div>
                        </div>
                    ))}
                </div>
                <div className=' h-[500px] w-[500px] rounded-xl mt-2 bg-[#f9f9f9]'>
                    <div className="container mx-auto relative">
                        <div className='flex flex-row my-10 mx-10 gap-16'>
                            <h1 className='mt-6 font-bold'>Total:</h1>
                            <input
                                type="search"
                                id="search-dropdown"
                                className="block p-2.5 w-56 absolute right-0 mr-10 h-14 rounded-lg ml-2 z-20 sm:text-xs text-gray-900 bg-white border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                                placeholder=""
                                required
                            />
                        </div>
                        <div className='flex flex-row my-10 mx-10 gap-16'>
                            <h1 className='mt-6 font-bold'>Charged:</h1>
                            <input
                                type="search"
                                id="search-dropdown"
                                className="block p-2.5 w-56 absolute right-0 mr-10 h-14 rounded-lg ml-2 z-20 sm:text-xs text-gray-900 bg-white border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                                placeholder=""
                                required
                            />
                        </div>
                    </div>
                    <div className="container mt-20 flex items-center justify-center">
                        <div className="relative flex items-center w-[56.5%]">
                            <input
                                type="search"
                                id="search-dropdown"
                                className="p-2.5 w-full h-8 rounded-lg ml-2 z-20 sm:text-xs text-gray-900 bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                                placeholder=""
                                required
                            />
                        </div>
                    </div>

                    <div className="container mx-auto mt-1">
                        <div className='flex flex-wrap justify-center max-w-[500px] gap-x-2 mx-2'>
                            <button type="button" className=" h-8 w-20 py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-[#636363] rounded-lg border border-gray-200 hover:bg-gray-100  ">10</button>
                            <button type="button" className=" h-8 w-20 py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-color-Light rounded-lg border border-gray-200 hover:bg-gray-100  ">1</button>
                            <button type="button" className=" h-8 w-20 py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-color-Light rounded-lg border border-gray-200 hover:bg-gray-100  ">2</button>
                            <button type="button" className=" h-8 w-20 py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-color-Light rounded-lg border border-gray-200 hover:bg-gray-100  ">3</button>
                            <button type="button" className=" h-8 w-20 py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-[#3471ff] rounded-lg border border-gray-200 hover:bg-gray-100  ">All</button>
                            <button type="button" className=" h-8 w-20 py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-[#636363] rounded-lg border border-gray-200 hover:bg-gray-100  ">20</button>
                            <button type="button" className=" h-8 w-20 py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-color-Light rounded-lg border border-gray-200 hover:bg-gray-100  ">4</button>
                            <button type="button" className=" h-8 w-20 py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-color-Light rounded-lg border border-gray-200 hover:bg-gray-100  ">5</button>
                            <button type="button" className=" h-8 w-20 py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-color-Light rounded-lg border border-gray-200 hover:bg-gray-100  ">6</button>
                            <button type="button" className=" h-8 w-20 py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-[#3471ff] rounded-lg border border-gray-200 hover:bg-gray-100  ">1/n</button>
                            <button type="button" className=" h-8 w-20 py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-[#636363] rounded-lg border border-gray-200 hover:bg-gray-100  ">50</button>
                            <button type="button" className=" h-8 w-20 py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-color-Light rounded-lg border border-gray-200 hover:bg-gray-100  ">7</button>
                            <button type="button" className=" h-8 w-20 py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-color-Light rounded-lg border border-gray-200 hover:bg-gray-100  ">8</button>
                            <button type="button" className=" h-8 w-20 py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-color-Light rounded-lg border border-gray-200 hover:bg-gray-100  ">9</button>
                            <button type="button" className=" h-8 w-20 py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-[#3471ff] rounded-lg border border-gray-200 hover:bg-gray-100  ">Split</button>
                            <button type="button" className=" h-8 w-20 py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-[#636363] rounded-lg border border-gray-200 hover:bg-gray-100  ">100</button>
                            <button type="button" className=" h-8 w-20 py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-color-Light rounded-lg border border-gray-200 hover:bg-gray-100  ">.</button>
                            <button type="button" className=" h-8 w-20 py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-color-Light rounded-lg border border-gray-200 hover:bg-gray-100  ">0</button>
                            <button type="button" className=" h-8 w-20 py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-color-Light rounded-lg border border-gray-200 hover:bg-gray-100  ">X</button>
                            <button type="button" className=" h-8 w-20 py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-[#3471ff] rounded-lg border border-gray-200 hover:bg-gray-100  ">bal</button>
                            <button type="button" className=" h-8 w-36 py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-[#019706] rounded-lg border border-gray-200 hover:bg-gray-100  ">Discount%</button>
                            <button type="button" className=" h-8 w-36 py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-[#ffb534] rounded-lg border border-gray-200 hover:bg-gray-100  ">Round</button>
                            <button type="button" className=" h-8 w-36 py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-[#ff4155] rounded-lg border border-gray-200 hover:bg-gray-100  ">Print bill</button>


                        </div>
                    </div>
                </div>
                <div className='h-[500px] w-[500px] mt-2'>
                    <div className='container mx-auto relative'>
                        <div className='h-[455px] w-full bg-color-Light rounded-xl flex flex-col justify-between'>
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
                                                    {item.productName}
                                                </th>
                                                <td className="px-2 py-1 absolute right-0 mr-5">
                                                    {item.color}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className=" rounded-lg text-xs text-gray-700 bg-[#bebebe] dark:bg-gray-700 dark:text-gray-400">
                                <div className=" flex flex-row font-semibold text-gray-900 dark:text-white">
                                    <div className="px-6 py-1 text-base">Total</div>
                                    <div className="px-6 py-2 absolute right-0 mr-5">10.43</div>
                                </div>
                            </div>
                        </div>

                        <button type="button" className=" h-[30px] mt-1 w-32  px-5 me-2 mb-2 text-sm font-medium text-white focus:outline-none bg-color-Green rounded-sm border border-gray-200 hover:bg-gray-100  ">Settle</button>
                        <button type="button" className="absolute right-0 h-[30px] mt-1 w-32 px-5 me-2 mb-2 text-sm font-medium text-white focus:outline-none bg-color-Red rounded-sm border border-gray-200 hover:bg-gray-100">Close</button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default index