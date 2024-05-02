import {defineStore} from 'pinia'

export const useDataStore = defineStore('user', {
    state: () => {
        return {
            userId: '1',
            userName: '',
            nickName: '游客',
            sex: '',
            roles: [],
            avatar: '',
        }
    },
    actions: {},
})
