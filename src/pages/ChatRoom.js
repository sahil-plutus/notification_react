import { React, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useFormik } from 'formik';
import { useState } from 'react';



const ChatRoom = () => {
    let [message, setMessage] = useState([]);
    const { roomname } = useParams();
    console.log(roomname)
    useEffect(() => {
        fetch(`http://127.0.0.1:8000/chats/${roomname}/`).then(response => response.json()).then(data => setMessage(data))})

    
    const formik = useFormik({
        initialValues: {
            content: ''
        },
        onSubmit: async(values) => {
            console.log(values)
            formik.resetForm()
        }
    })
    console.log(message)
    
    var ws = new WebSocket('ws://' + '127.0.0.1:8000' + '/ws/wsc/' + roomname + '/')
    ws.onopen = function(){
        console.log('websocket connected...')
        ws.send(JSON.stringify({
            'msg': 'message from client...'
        }))
    }

    ws.onmessage = function(event){
        console.log('message recieved', event.data)
        var data = JSON.parse(event.data)
        console.log('data', data);
    }
    
    return (
        <div>
            <div className="container">
                <h2 className='text-center mt-4'>Welcome to {roomname} ChatRoom</h2>

                <div className="container">
                    <div className="row mt-5">
                        <div className="col-4">
                            <form action="" onSubmit={formik.handleSubmit}>
                                <input type="text" className='form-control' name='content' placeholder='Type your message' value={formik.values.content} onChange={formik.handleChange} />
                              
                                <input type="submit" className='btn btn-primary mt-3' value="send" />
                            </form>
                        </div>

                        <div className="col-8 chat-box">
                            {  
                                message.map(function(item, i){
                                    console.log(item)
                                    return JSON.stringify(item) !== '{}' || 
                                    '[]' ? <li key={i}>{item.content}</li> : <li>no message</li>
                                })
                            }
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ChatRoom