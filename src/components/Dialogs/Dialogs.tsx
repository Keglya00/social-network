import React, { useEffect, useRef, useState } from 'react'
import styleDialogs from './Dialogs.module.scss'
import Chat from './Chat/Chat.tsx'
import Message from './Message/Message.tsx'
import MyMessage from './Message/MyMessage.tsx'
import { Field, Form } from 'react-final-form'
import { required } from '../../utilits/validators.ts'
import { ChatType, MessageType, StatusType} from '../../redux/dialogsReducer'
import { getCurrenrId } from '../../ApiWsChat.ts'

type PropsType = {
    chatsData: Array<ChatType>,
    messagesData: Array<MessageType>,
    id: number,
    wsStatus: StatusType,
    currentUserId: number
    startWsChannel: () => void
    stopWsChannel: () => void
    sendMessage: (userId: number, message: string) => void
    setChats: () => void
    setCurrentUserId: (userId: number) => void
    setMessages: (userId: number) => void
}
type AddMessageFormPropsType = {
    wsStatus: StatusType
    addMessage: (message: string) => void
}

const Dialogs: React.FC<PropsType> = React.memo((props) => {
    
    useEffect(() => {
        props.setChats()
    }, [])

    useEffect(() => {
        if(props.currentUserId) {
            props.setMessages(props.currentUserId)
        }
    }, [props.currentUserId])

    let onSetCurrentUserId = (userId: number) => {
        props.setCurrentUserId(userId)
    } 

    const messagesAnchorRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if(isAutoScroll){
            messagesAnchorRef.current?.scrollIntoView()
        } 
    }, [props.messagesData])

    const [isAutoScroll, setAutoScroll] = useState(true)

    const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        let element = e.currentTarget
        if(Math.abs((element.scrollHeight - element.scrollTop) - element.clientHeight) < 10){
            setAutoScroll(true)
        } else {
            setAutoScroll(false)
        }
    }

    let onAddMessageClick = (newMessage: string) => {
        if(!newMessage){
            return
        }
        props.sendMessage(props.currentUserId, newMessage)
    }

    let chatsElements = props.chatsData.map((chat) => <li onClick={() => {
        onSetCurrentUserId(chat.id)
        getCurrenrId(chat.id)
    }}><Chat username={chat.userName} userid=''/></li>)

    let messagesElements = props.messagesData.map((message) => message.senderId === props.id 
    ? <div className={styleDialogs.mymessage}><MyMessage message={message.body} /></div>
    : <div className={styleDialogs.message}><Message message={message.body} userName={message.senderName}/></div>
    )

    return(
        <div className={styleDialogs.dialogs}>
            <ul className={styleDialogs.dialogs__chats}>
                {chatsElements}
            </ul>
            <div className={styleDialogs.dialogs__messages} onScroll={scrollHandler}>
                {messagesElements}
                {props.currentUserId ? <AddMessageForm addMessage={onAddMessageClick} wsStatus={props.wsStatus} /> : null}
                <div ref={messagesAnchorRef}></div>
            </div>
        </div>
    )
})

const AddMessageForm: React.FC<AddMessageFormPropsType> = (props) => {
    return (
        <Form onSubmit={(formData) => {props.addMessage(formData.newMessageBody)}}>
            {( { handleSubmit, form} ) => (
                <form onSubmit={handleSubmit} className={styleDialogs.dialogs__messages_addMessage}>
                    <Field validate={required} placeholder='Enter your message' component={'textarea'} name={'newMessageBody'} className={styleDialogs.dialogs__addMessages_textarea}></Field>
                    <button disabled={props.wsStatus !== 'ready'} onClick={() => {
                        handleSubmit()
                        form.reset()
                    }} className={styleDialogs.dialogs__addMessages_button}></button>
                </form>
            )}
        </Form>   
    )
}

export default Dialogs