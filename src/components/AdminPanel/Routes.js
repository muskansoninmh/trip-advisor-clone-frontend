import React from 'react';
import AdminPanel from './AdminPanel';
import PlaceList from './PlaceList';
import UserList from './UserList';


const Routes = [
    {
        path: '/admin',
        sidebarName: 'Dashboard',
        component: AdminPanel
    },
    {
        path: '/admin/user',
        sidebarName: 'User',
        component: UserList
    },
    {
        path: '/admin/place',
        sidebarName: 'Places',
        component: PlaceList
    },
];

export default Routes;