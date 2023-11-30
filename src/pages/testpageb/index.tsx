import UserTable from '@/components/tables/UserTable';
import React, { useEffect, useState } from 'react';
import { User } from './columns';
async function getUsers(): Promise<User[]> {
    const res = await fetch('https://localhost:7160/api/User');
    const data = await res.json();
    return data.message;
}
const Users = () => {
    const [user, setUser] = useState<User[]>([]);
    useEffect(() => {
        const fetchDataAsync = async () => {
            try {
                const users = await getUsers();
                setUser(users)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        // Call the async function when the component mounts
        fetchDataAsync();
    }, []); // Empty dependency array means it runs once after the initial render

    return (
        <section className='flex items-center justify-center my-2'>
            <div className='container'>
                {/* Render your UserTable component with the fetched data */}
                <UserTable users={user} />
            </div>
        </section>
    );
};

export default Users;
