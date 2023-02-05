import axios from 'axios';

export const GeneralStore = {
    state: () => {
        return {
            isShow: {
                ShowHexaNavigation: false,
                ShowKeeperNav: false,
            },
            users: [
                {
                    id: 1,
                    firstName: 'Ann',
                    lastName: 'Brain',
                    email: 'Ann@mail.ru',
                    password: 'Anna12',
                    roleUser: 'user',
                },
                {
                    id: 1,
                    firstName: 'Peter',
                    lastName: 'Bud',
                    email: 'Peter@mail.ru',
                    password: 'Peter12',
                    roleUser: 'user',
                },
                {
                    id: 1,
                    firstName: 'Danil',
                    lastName: 'Petrov',
                    email: 'Danil@mail.ru',
                    password: 'Danil12',
                    roleUser: 'admin',
                }
            ],
            loginIn: {
                isLogin: false,
                nameUser: '',
                firstName: '',
                lastName: '',
            },
            email: "",
            password: "",
            token: "",
        }
    },
    getters: {},
    mutations: {
        setEmail(state, email) {
            state.email = email
        },
        setPassword(state, password) {
            state.password = password
        },
        setToken(state, token) {
            state.token = token
        },

        loginSet(state) {
            state.loginIn.isLogin = true
            //state.loginIn.firstName = user.firstName
            //state.loginIn.lastName = user.lastName
            //state.loginIn.nameUser = `${user.firstName}${user.lastName}`
        },
        loginRemove(state) {
            state.loginIn.isLogin = false
            state.loginIn.firstName = ''
            state.loginIn.lastName = ''
            state.loginIn.nameUser = ''
        },
        changeShowhexaNav(state, isShowNav) {
            let key = Object.keys(state.isShow)
            for (let i = 0; i < key.length; i++) {
                state.isShow[key[i]] = false
            }

            state.isShow[isShowNav] = true
            localStorage.setItem('showNav', JSON.stringify(state.isShow))
        },
        removeNav(state) {
            let key = Object.keys(state.isShow)
            for (let i = 0; i < key.length; i++) {
                state.isShow[key[i]] = false
            }
            localStorage.setItem('showNav', JSON.stringify(state.isShow))
        },
        addShowNav(state, obj) {
            state.isShow = obj
        },
    },
    actions: {

        async logUser({ state, dispatch, commit }) {
            try {
                const userUse = await axios.post("https://localhost:5002/Users/Login", {
                    Email: state.email,
                    Password: state.password,
                })
                if (userUse.data) {
                    commit('setToken', userUse.data.userToken)
                    dispatch('setUser')
                    commit('loginSet')
                }
                console.log(userUse.data)
            } catch (err) {
                console.log(err)
            }
        },

        //userToken = token,
        ////StatusCode= 200,
        //userName = user.Email,

        getUser({ commit }) {
            let user = JSON.parse(localStorage.getItem('DanilPetrov'))
            if (user) {
                commit('loginSet')
            }
        },
        setUser({ state }) {
            localStorage.setItem('DanilPetrov', JSON.stringify({ token: state.token, user: state.email }))
        },
        removeUser({ commit }) {
            localStorage.removeItem('DanilPetrov')
            commit('loginRemove')
        },
        getShowNav({ commit }) {
            let obj = JSON.parse(localStorage.getItem('showNav'))
            if (obj) {
                commit('addShowNav', obj)
            }

        },
    },
    namespaced: true,
}