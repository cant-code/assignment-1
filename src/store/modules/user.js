import json from "@/assets/userData.json";  

const state = {
    email: localStorage.getItem('email') || '',
    userType: localStorage.getItem('userType') || '',
    track: localStorage.getItem('track') || ''
};

const getters = {
    getEmail: (state) => {return state.email},
    getUserType: (state) => {return state.userType}
};

const mutations = {
    SET_STUDENT(state, data) {
        state.email = data.email;
        state.userType = data.userType;
        state.track = data.track;
    },
    SET_INSTRUCTOR(state, data) {
        state.email = data.email;
        state.userType = data.userType;
    },
};

const actions = {
    // PlaceHolder for registration using a backend API
    // async registerUser({ commit }, data) {
    //     try {
    //            await Axios.post('#link', {
    //                 email: data.email,
    //                 password: data.password,
    //                 userType: data.userType
    //             });
    //     } catch (error) {
    //         throw new Error('Error Occurred, please try again');
    //     }
    // },
    async loginUser({ commit }, data) {
        try {
            const users = json.users;
            let found = false;
            users.map((user) => {
                if(user.email === data.email && user.password === data.password) {
                    found = true;
                    data.userType = user.userType;
                    if(data.checked[0] === true) {
                        localStorage.setItem('email', data.email);
                        localStorage.setItem('userType', data.userType);
                        if(user.userType === "student") {
                            data.track = user.track;
                            localStorage.setItem("track", data.track);
                            commit("SET_STUDENT", data);
                        }
                        else commit("SET_INSTRUCTOR", data);
                    }
                    else {
                        if(data.userType === "student") {
                            data.track = user.track;
                            commit("SET_STUDENT", data);
                        }
                        else commit("SET_INSTRUCTOR", data);
                    }
                }
            });
            if(found === false) throw new Error('Invalid User, please try again');
        } catch (error) {
            throw new Error('Invalid User, please try again');
        }
    },
    logoutUser({ commit }) {
        try {
            localStorage.removeItem('email');
            localStorage.removeItem('userType');
            if(state.userType === "student") localStorage.removeItem('track');
            commit("SET_STUDENT", {
                email: '',
                userType: '',
                track: ''
            });
        } catch (error) {
            console.log(error);
        }
    },
};

const module = {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};

export default module;