import createStore from 'unistore'
import axios from 'axios'

const initialState={
    // General
    baseUrl: 'http://localhost:5000/',

    // Dashboard related
    historyList: [],
    latestUpdate: ''
}

export const store=createStore(initialState)

export const actions=store=>({
    handleSetGlobal:(state,event)=>{
        store.setState({
            [event.target.name]:event.target.value
        })
    },

    /**
     * The following method is designed to update data in history table
     */
    updateTable: async (state) => {
        /**
        * Hit related API to get all messaging history from database
        */
        // Define object that will be passed as an argument to axios function
        const axiosArgs = {
            method: "get",
            url: initialState.baseUrl + "message/history",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`
            },
            params: {
                p: 1,
                rp: 100
            },
            validateStatus: (status) => {
                return status < 500
            }
        };

        // Hit related API (passed axiosArgs as the argument) and manage the response
        await axios(axiosArgs)
        .then(response => {
            // Set the store using the data returned by the API
            store.setState({
                historyList: response.data,
                latestUpdate: Date().toString()
            })
        })
        .catch(error => {
            console.warn(error);
        });
    }
})