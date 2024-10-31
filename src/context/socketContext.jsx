// socketContext.js
import React, { createContext, useEffect, useContext } from 'react';
import io from 'socket.io-client';
//AUTH CONTEXTS
// import { useCourses } from './courses/coursesContext';
import { useTeachers } from './teachers/teachersContext';

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
    const { getTeachers } = useTeachers();

    useEffect(() => {
        const socketConnection = io('https://fepiis-server-7a9217b2683c.herokuapp.com', {
            transports: ['websocket'],
        });

        socketConnection.on('databaseChange', () => {
            console.log('Database change detected, updating data...');
            getTeachers();
        });

        return () => {
            socketConnection.disconnect();
        };
    }, [
        getTeachers
    ]);

    return (
        <SocketContext.Provider value={{}}>
            {children}
        </SocketContext.Provider>
    );
};

export const useSocket = () => useContext(SocketContext);