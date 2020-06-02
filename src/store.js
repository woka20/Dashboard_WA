import createStore from 'unistore'
import axios from 'axios'
import { wait } from '@testing-library/react'

const initialState={
    BulkOrNot: "Single",
    typeMsg:"text",
    trigger:"None",
    newForm: null,
    file:[],
    from_number:"",
    to_number:"",
    text_message:"",
    media_url:"",
    sender_id:"",
    caption:"",
    receiver:"",
    redirect:false,
    company_name="",
    username:"",
    password:"",
    user_log:"",
    pass_log:"",
    log_as:""

}

export const store=createStore(initialState)

export const actions=store=>({
    handleSetGlobal:(state,event)=>{
        store.setState({
            [event.target.name]:event.target.value
        })
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
            
            obj.to_number=state.to_number
            obj.message_type=state.typeMsg
            obj.media_url=state.media_url
            obj.caption=state.caption
        
            
        }
    
        const req={method:"post",
                  url:"http://127.0.0.1:5000/message",
                  headers:{"Access-Control-Allow-Origin":"*"},
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
             obj.message_type=index['message_type']
             obj.text_message=index['text_message']
             obj.media_url=index['media_url']
             obj.caption=index['caption']
             obj.receiver=index['receiver']
            
        })
     
        const req={method:"post",
                  url:"http://127.0.0.1:5000/message_bulk",
                  headers:{"Access-Control-Allow-Origin":"*"},
                  data:obj
                }
                axios(req)
                .then((response)=>{
                    store.setState({redirect:true})
                    alert("Pesan Anda Telah Dikirim")

                })
                .catch((error)=>alert(error))
    }
})