import React, { Component,Fragment } from 'react'
import Users from './Users'

export default class UsersContainer extends Component {


  render(){
    const users =  this.props.users.map(user => <Users key={user.id} user={user}  handleUsersClick={this.props.handleUsersClick}/>)
    return(
      <Fragment>
        {users}
      </Fragment>
    )
  }
}
