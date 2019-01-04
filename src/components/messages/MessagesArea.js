import React,{Component} from 'react';
import { API_ROOT, HEADERS } from '../../constants';
import NewMessageForm from './NewMessageForm';


export default class MessagesArea extends Component {


  constructor(props){
    super(props)
    this.state = {
      user_id: this.props.user_id,
      username: this.props.username,
      conversationId: this.props.conversation.id,
      conversationTitle: this.props.conversation.title,
      messages: this.props.conversation.messages,
      recieverName: this.props.conversation.recieverName,
      recieverId: this.props.conversation.reciever_Id

    }
  }

   handleOnClick = () => {

    let localVideo = document.getElementById("local-video");


    navigator.mediaDevices
      .getUserMedia({ video: { width: 400, height: 300 }, audio: true })
      .then(stream => {
        localVideo.srcObject = stream;
          localVideo.muted = true;
          this.props.setLocalStream(stream)
        }).then(() => this.makeOffer())
    }


    makeOffer = () => {
    const JOIN_ROOM = "JOIN_ROOM";

    const data = { video: {
      kind: JOIN_ROOM,
      user_id: this.state.user_id,
      from: this.state.user_id,
      conversation_id: this.state.conversationId
    }
    }

    fetch(API_ROOT + "/videos", {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify(data)
    })

  }

   orderedMessages = (messages, user) => {
    const sortedMessages = messages.sort(
      (a, b) => new Date(a.created_at) - new Date(b.created_at)
    );
    return sortedMessages.map(message => {
      return (
        <div key={message.id} class="media msg ">
          <div class="media-body">
              <small class="pull-right time"><i class="fa fa-clock-o"></i> 12:10am</small>
              <h5 class="media-heading">{message.author_name}</h5>
              <small class="col-lg-10">{message.text}</small>
                </div>
            </div>
      );
    })
  }

  render() {
    const {user_id, conversationId, conversationTitle } = this.state
  return (
        <div class="message-wrap col-lg-8">
            <div class="msg-wrap">
              <h2> Messages </h2>
        <h2>{conversationTitle}</h2>
        <ul>{this.orderedMessages(this.props.conversation.messages, user_id)}</ul>
        <NewMessageForm conversation_id={conversationId} user_id={user_id} />
      </div>
      <button onClick={() => {this.handleOnClick()}}>VIDEO</button>
    </div>
    )
  }
}