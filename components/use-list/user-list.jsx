
import React,{Component} from 'react'
import PropTypes from 'prop-types'
import {WingBlank, WhiteSpace, Card} from 'antd-mobile'
import {withRouter} from 'react-router-dom'
const Header = Card.Header
const Body = Card.Body

class UserList extends Component {
  //get states
  static propTypes = {
    userList: PropTypes.array.isRequired
  }
  render () {
    const {userList} = this.props
    return (
      <WingBlank style={{marginBottom:50, marginTop:50}}>
         {
          userList.map(user => (
            <div key={user._id}>
              <WhiteSpace/>
              <Card onClick={() => this.props.history.push(`/chat/${user._id}`)}>
                <Header
                   thumb={require(`../../assets/images/${user.header}.png`)}
                  extra={user.username}
                />
                <Body>
                  <div>Position:{user.post}</div>
                  {user.company ?  <div>Company:{user.company}</div> : null}
                  {user.scope ?  <div>Scope:{user.scope}</div> : null}
                  <div>Brief: {user.info}</div>
                </Body>
              </Card>
            </div>
          ))
        }
      </WingBlank>
    )
  }
}

export default withRouter(UserList)