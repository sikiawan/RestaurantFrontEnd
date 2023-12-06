import React, { useEffect, useState } from 'react';
import { ClientPreference } from './columns';
import ClientPreferenceTable from '@/components/tables/ClientPreferenceTable';
import { Button, Checkbox, Input, Link, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { debug } from 'console';
const ClientPreferences = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [name, setName] = useState<string>('');
    const [tenantId, setTenantId] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [cellNo, setCellno] = useState<string>('');

    const [id, setId] = useState<string>('');
    const [data, setData] = useState<ClientPreference[]>([]);
    const [pages, setPages] = useState(0);
    const [totalRecords, setTotalRecords] = useState(0);
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [search, setSearch] = useState('');

    const handleEdit = (id: string, page:number, rowsPerPage:number, search:string) => {
        onOpen();
        axios.get(`https://localhost:7160/api/ClientPreference/GetById?id=${id}`)
            .then((result) => {
                setName(result.data.name);
                setTenantId(result.data.tenantId);
                setAddress(result.data.address);
                setCellno(result.data.cellNo);
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

    const handleDelete = (id: string, page:number, rowsPerPage:number, search:string) => {
        if (window.confirm('Are you sure to delete this record?')) {
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
      
    const clear = () => {
        setName('');
        setTenantId('');
        setAddress('');
        setCellno('');
        setId('');
        setPage(1);
        setRowsPerPage(5);
        setSearch('');
    };
    const getData = (page = 1, pageSize = 5, search = '') => {
        axios.get(`https://localhost:7160/api/ClientPreference?page=${page}&pageSize=${pageSize}&search=${search}`)
            .then((response) => {
                setData(response.data.clientPreferences);
                console.log(data);
                setPages(response.data.totalPages);
                setTotalRecords(response.data.totalRecords);
            })
            .catch((error) => {
                console.error(error);
            });
    };
    
    const handleSave = (onClose: () => void) => {
        debugger;
        const url = 'https://localhost:7160/api/ClientPreference';
        let data = {};
        if (id === '') {
            data = {
                name: name,
                tenantId: tenantId,
                address: address,
                cellNo: cellNo,
            }
        }
        else {
            data = {
                id: parseInt(id, 10),
                name: name,
                tenantId: tenantId,
                address: address,
                cellNo: cellNo,
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
    return (
        <>
            <section className='flex items-center justify-center my-2'>
                <div className='container'>
                    <ClientPreferenceTable 
                    clientPreference={data} 
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
                                            //   endContent={
                                            //     <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                            //   }
                                            label="Name"
                                            placeholder="Enter name"
                                            variant="bordered"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                        <Input
                                            label="Restaurant"
                                            placeholder="Enter restaurant"
                                            variant="bordered"
                                            value={tenantId}
                                            onChange={(e) => setTenantId(e.target.value)}
                                        />
                                        <Input
                                            //   endContent={
                                            //     <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                            //   }
                                            label="Address"
                                            placeholder="Enter address"
                                            variant="bordered"
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                        />
                                        <Input
                                            label="Cell No"
                                            placeholder="Enter cell no"
                                            variant="bordered"
                                            value={cellNo}
                                            onChange={(e) => setCellno(e.target.value)}
                                        />

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
    );
};

export default ClientPreferences;
