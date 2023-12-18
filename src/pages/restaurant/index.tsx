import React, { useEffect, useState } from 'react';
import { Restaurant } from './columns';
import RestaurantTable from '@/components/tables/RestaurantTable';
import { Button, Checkbox, Input, Link, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { EyeFilledIcon, EyeSlashFilledIcon } from '@/components/icons/icons';

const index = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [isVisible, setIsVisible] = React.useState(false);

    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [isActive, setIsActive] = useState<boolean>(true);


    const [id, setId] = useState<string>('');


    const [data, setData] = useState<Restaurant[]>([]);
    const [pages, setPages] = useState(0);
    const [totalRecords, setTotalRecords] = useState(0);
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [search, setSearch] = useState('');

    const toggleVisibility = () => setIsVisible(!isVisible);

    // useEffect(() => {
    //     getData();
    // }, []);


    const clear = () => {
        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setIsActive(true);
        setId('');
        setPage(1);
        setRowsPerPage(5);
        setSearch('');
    };
    const getData = (page = 1, pageSize = 5, search = '') => {
        console.log('api called out')
        axios.get(`https://localhost:7160/api/Restaurant?page=${page}&pageSize=${pageSize}&search=${search}`)
            .then((response) => {
                console.log('api called')
                setData(response.data.restaurants);
                console.log(data);
                setPages(response.data.totalPages);
                setTotalRecords(response.data.totalRecords);
            })
            .catch((error) => {
                console.error(error);
            });
    };
    const handleSave = (onClose: () => void) => {
        const url = 'https://localhost:7160/api/Restaurant';
        let data = {};
        if (id === '') {
            data = {
                name,
                email,
                password,
                confirmPassword,
                isActive,
            }
        }
        else {
            data = {
                id: parseInt(id, 10),
                //id: editId,
                name: name,
                isActive: isActive,
            }
        }

        axios.post(url, data)
            .then((result) => {
                getData(page, rowsPerPage, search);
                clear();
                onClose();
                toast.success('Record has been saved.');
            })
            .catch((error) => {
                console.error(error);
            });
    };
    const handleEdit = (id: string, page: number, rowsPerPage: number, search: string) => {
        onOpen();
        axios.get(`https://localhost:7160/api/Restaurant/GetById?id=${id}`)
            .then((result) => {
                setName(result.data.name);
                setIsActive(result.data.isActive);
                setId(id);
                setPage(page);
                setRowsPerPage(rowsPerPage);
                setSearch(search);
            })
            .catch((error) => {
                console.error(error);
            });
    };
    const handleAdd = (page: number, rowsPerPage: number, search: string) => {
        debugger;
        onOpen();
        setPage(page);
        setRowsPerPage(rowsPerPage);
        setSearch(search);
    };
    const handleDelete = (id: string, page: number, rowsPerPage: number, search: string) => {
        if (window.confirm('Are you sure to Delete this record !') === true) {
            axios.delete(`https://localhost:7160/api/ClientPreference?id=${id}`)
                .then(() => {
                    toast.success('Record has been deleted.');
                    getData(page, rowsPerPage, search);
                })
                .catch((error) => {
                    console.error(error);
                    toast.error('Error occurred while deleting record.');
                });
        }
    };

    // const handleUpdate = () => {
    //     debugger;
    //     const url = 'https://localhost:7160/api/Restaurant';
    //     const putData = {
    //         id: editId,
    //         name: editName,
    //         isActive: editIsActive,
    //     };

    //     axios.post(url, putData)
    //         .then((result) => {
    //             getData();
    //             clear();
    //             handleClose();
    //             alert('Record has been updated.');
    //         })
    //         .catch((error) => {
    //             console.error(error);
    //         });
    // };

    return (
        <>
            <section className='flex items-center justify-center my-2'>
                <div className='container'>
                    <RestaurantTable
                        restaurant={data}
                        pages={pages}
                        totalRecords={totalRecords}
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
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
                                            label="Name"
                                            placeholder="Enter name"
                                            variant="bordered"
                                            value={name}
                                            autoComplete="off"
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                        {id === '' && (
                                            <>
                                                <Input
                                                    label="Email"
                                                    placeholder="Enter email"
                                                    variant="bordered"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                />
                                                <Input
                                                    label="Password"
                                                    variant="bordered"
                                                    autoComplete='off'
                                                    placeholder="Enter your password"
                                                    endContent={
                                                        <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                                                            {isVisible ? (
                                                                <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                                            ) : (
                                                                <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                                            )}
                                                        </button>
                                                    }
                                                    type={isVisible ? "text" : "password"}
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                />
                                                <Input
                                                    label="Password"
                                                    variant="bordered"
                                                    autoComplete='off'
                                                    placeholder="Enter your password"
                                                    endContent={
                                                        <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                                                            {isVisible ? (
                                                                <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                                            ) : (
                                                                <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                                            )}
                                                        </button>
                                                    }
                                                    type={isVisible ? "text" : "password"}
                                                    value={confirmPassword}
                                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                                />
                                            </>
                                        )}
                                        <label className="relative inline-flex items-center me-5 cursor-pointer">
                                            <input type="checkbox" value="" className="sr-only peer"
                                                checked={isActive}
                                                onChange={(e) => setIsActive(e.target.checked)} />
                                            <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                                            <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">IsActive</span>
                                        </label>



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
        </>
    )
}

export default index
export async function getStaticProps({ locale }: { locale: string }) {
    return {
      props: {
        ...(await serverSideTranslations(locale, [
          'dashboard',
          'common'
        ])),
        // Will be passed to the page component as props
      },
    };
  }