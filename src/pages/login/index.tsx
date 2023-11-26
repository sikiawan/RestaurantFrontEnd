import LoginForm from '@/components/login/LoginForm';
import React, { useEffect } from 'react';

const Index = () => {
//   useEffect(() => {
//     fetch("https://localhost:7160/api/Roles")
//       .then((res) => {
//         if (!res.ok) {
//           throw new Error(`Request failed with status: ${res.status}`);
//         }
//         return res.json();
//       })
//       .then((resp) => {
//         console.log(resp);
//       })
//       .catch((error) => {
//         console.error('Fetch error:', error.message);
//       });
//   }, []);

  return <LoginForm />;
};

export default Index;
