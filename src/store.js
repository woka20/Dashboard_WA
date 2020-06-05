import createStore from 'unistore'
import axios from 'axios'
import { wait } from '@testing-library/react'

const initialState={
    // General
    baseUrl: 'http://localhost:5000/',

    // Dashboard related
    historyList: [],
    latestUpdate: '',

    // Filter in dashboard
    filterType: 'ID Pesan',
    uuidFilterProps: '',
    phoneFilterProps: '',
    keywordFilter: '',

    BulkOrNot: "Single",
    typeMsg:"text",
    trigger:"None",
    newForm: null,
    file:[],
    from_number:"",
    product_name:"",
    to_number:"",
    text_message:"",
    media_url:"",
    sender_id:"",
    caption:"",
    receiver:"",
    redirect:false,
    company_name:"",
    username:"",
    password:"",
    productTab:[],
    user_log:"",
    pass_log:"",
    logout:false
}

export const store=createStore(initialState)

export const actions=store=>({
    handleSetGlobal:(state,event)=>{
        store.setState({
            [event.target.name]:event.target.value
        })
    },

    /**
     * The following method is designed to filter message history by UUID
     */
    uuidFilter: async (state, event) => {
        /**
        * Hit related API to get all messaging history from database which satisfied given UUID
        */
        // Prepare the URL
        let value = event.target.value
        let url = initialState.baseUrl + "message/history"
        if (value !== "" && value !== null) {
            url += "/id/" + value
        }
        
        // Define object that will be passed as an argument to axios function
        const axiosArgs = {
            method: "get",
            url: url,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`
            },
            params: {
                p: 1,
                rp: 25,
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
                latestUpdate: Date().toString(),
                uuidFilterProps: value,
                keywordFilter: value
            })
        })
        .catch(error => {
            console.warn(error);
            alert(error)
        });
    },

    /**
     * The following method is designed to filter message history by phone number
     */
    phoneFilter: async (state, event) => {
        /**
        * Hit related API to get all messaging history from database which satisfied given UUID
        */
        // Prepare the URL
        let value = event.target.value
        let url = initialState.baseUrl + "message/history"
        if (value !== "" && value !== null) {
            url += "/num/" + value
        }
        
        // Define object that will be passed as an argument to axios function
        const axiosArgs = {
            method: "get",
            url: url,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`
            },
            params: {
                p: 1,
                rp: 25,
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
                latestUpdate: Date().toString(),
                phoneFilterProps: value,
                keywordFilter: value
            })
        })
        .catch(error => {
            console.warn(error);
            alert(error)
        });
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
    },
  
    handleFileUpload:(state,event)=>{
        let reader=new FileReader()
        const file=event.target.files[0]
        var allList=[]
        reader.readAsText(file)
        reader.onload=async()=>{
            var content=reader.result
            var splitContent=content.split("\n")
            var headers=splitContent[0].split(/[;,]+/)
            for(var i=1; i<splitContent.length; i++){
                var obj={}
                var currentLine=splitContent[i].split(/[;,]+/)
                if (currentLine.length !== 1){
                    for(var j=0;j<currentLine.length;j++){
                        obj[headers[j]]=currentLine[j]
                    }
                allList.push(obj)
                }
            }
            await store.setState({file:allList})
        }
      
    },

    handleSendMessage:(state,event)=>{
        var obj={}
       
        if(state.typeMsg==="text"){
            obj.sender_id=state.sender_id
            obj.to_number=state.to_number
            obj.message_type=state.typeMsg
            obj.text_message=state.text_message
            
        }else{

            obj.sender_id=state.sender_id
            obj.to_number=state.to_number
            obj.message_type=state.typeMsg
            obj.media_url=state.media_url
            obj.caption=state.caption
        
            
        }
    
        const req={method:"post",
                  url:"http://127.0.0.1:5000/message",
                  headers:{"Access-Control-Allow-Origin":"*","Authorization":"Bearer " + localStorage.getItem("token"),"Content-Type": "application/json"},
                  data:obj
                }
                axios(req)
                .then((response)=>{
                    store.setState({redirect:true})
                    alert("Pesan Anda Telah Dikirim")


                })
                .catch((error)=>alert(error))
    },

    handleBulkMessage:(state,event)=>{
        var obj={}
        state.file.map(index=>{
             obj.to_number=index['to_number']
             obj.product_name=index['product_name']
             obj.message_type=index['message_type']
             obj.text_message=index['text_message']
             obj.media_url=index['media_url']
             obj.caption=index['caption']
             obj.receiver=index['receiver']
            
        })
        // console.log(state.file)
        const req={method:"post",
                  url:"http://127.0.0.1:5000/message_bulk",
                  headers:{"Access-Control-Allow-Origin":"*",'Authorization':'Bearer ' + localStorage.getItem("token"),'Content-Type': 'application/json'},
                  data:{csv_file:state.file}
                }
                axios(req)
                .then((response)=>{
                    store.setState({redirect:true})
                    alert("Pesan Anda Telah Dikirim")

                })
                .catch((error)=>alert(error))
    },
    
    logOutFunc:async(state,event)=>{
        localStorage.removeItem("token")
        localStorage.removeItem("log_as")
        localStorage.removeItem("company_name")
        await store.setState({logout:true})
        store.setState({logout:true})

    }
})