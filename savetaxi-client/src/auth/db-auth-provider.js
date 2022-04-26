import { fetcher } from '../helpers/fetcher';

//Sending a request to the server for an attached connection
//with data that contains information about the user
const dbAuthProvider = {
    isAuthenticated: false,
    async signIn(data) {
        const user = await fetcher('/auth/login', 'POST', data);
        return user;
    },
    async signOut(callback) {
        dbAuthProvider.isAuthenticated = false;
        await fetcher('auth/logout', 'GET');
    },
};

export { dbAuthProvider };
