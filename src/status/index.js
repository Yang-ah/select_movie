import { atom } from 'recoil';

export const isLoginAtom = atom({
    key: 'isLogin',
    default : false,
});

export const backOfficeTotalCount = atom({
    key: 'totalCount',
    default: {
        movies: '0',
        users: '1',
        reviews: '2',
    }
})

export const AdminLoginModalOpen = atom({
    key : 'adminLoginModalOpen',
    default : false,
})

export const AdminResistorModalOpen = atom({
    key : 'adminResistorModalOpen',
    default : false,
})