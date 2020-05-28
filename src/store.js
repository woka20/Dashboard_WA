import createStore from 'unistore'
import axios from 'axios'

const initialState={
    BulkOrNot: "Single",
    typeMsg:"Text",
    trigger:"None",
    newForm: null,
    file:null,
    from_number:"",
    to_number:"",
    text_message:"",
    media_url:"",
    caption:"",
    input:null,
    redirect:false

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
        reader.onload=()=>{
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
        }
        store.setState({file:allList})
    },

    handleSendMessage:(state,event)=>{
        if(state.typeMsg==="Text"){
            store.setState({input:{
                from_number:state.from_number,
                to_number:state.from_number,
                text_message:state.text_message
            }})
        }else{
            store.setState({input:{
                from_number:state.from_number,
                to_number:state.from_number,
                media_url:state.media_url,
                caption:state.caption
            }})
        }
        const req={method:"post",
                  url:"http://127.0.0.1:5000/message",
                  headers:{"Access-Control-Allow-Origin":"*","Authorization":"Bearer"+"NN"},
                  data:state.input
                }
                axios(req)
                .then((response)=>{
                    alert("Pesan Anda Telah Dikirim")
                    store.setState({redirect:true})

                })
                .catch((error)=>alert(error))
    }
})