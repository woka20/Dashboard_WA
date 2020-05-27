import createStore from 'unistore'

const initialState={
    // General
    baseUrl: 'http://localhost:5000/',

    // Dashboard related
    historyList: []
}

export const store=createStore(initialState)

export const actions=store=>({
    handleSetGlobal:(state,event)=>{
        store.setState({
            [event.target.name]:event.target.value
        })
    }
})