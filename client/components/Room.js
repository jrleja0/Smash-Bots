import React from 'react';
import PropTypes from 'prop-types';
import Lobby from './Lobby';
import { connect } from 'react-redux';
import store from '../store';
import { enterLobby, loadRooms } from '../redux/lobby';
import { endGame } from '../redux/game';
import { onUpdate, emitJoin, emitRoomMounted } from '../sockets/client';

export class Room extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showLobby: false,

    }
    this.initLobby = this.initLobby.bind(this);
  }

initLobby(){
  this.props.onEnterLobby();
  this.props.disableGame();
  this.setState({
    showLobby: true
  });
}

componentDidMount(){
  onUpdate(this.props.onLoadRooms)
  emitRoomMounted()
}

  render() {
    return (
      <div>
        {!this.state.showLobby ? (
        <div>
        <table>
          <tbody>
            {this.props.rooms.map(room => (
              <tr key={room}>
                <div>
                  <td> {room} </td>
                  <td> {/*room.clients.length /10*/}</td>
                  <td>
                    <button
                      onClick={() => {
                        emitJoin(room, this.props.weapon, this.props.armor, this.props.username)
                        this.initLobby()
                      }}
                      >
                      Join Lobby
                    </button>
                  </td>
                </div>
              </tr>
            ))
            }
          </tbody>
        </table>
        <button
          onClick={() => {
            emitJoin(null, this.props.weapon, this.props.armor, this.props.username)
            this.initLobby()
          }}
          >
          Create Lobby
        </button>
        </div>
      ) : <Lobby />
        }
      </div>
    )
  }
}

const mapUserState = ({ user, lobby }) => ({
  weapon: user.weapon,
  armor: user.armor,
  username: user.username,
  rooms: lobby.rooms
});

const mapDispatch = dispatch => ({
  onEnterLobby: () => dispatch(enterLobby()),
  disableGame: () => dispatch(endGame()),
  onLoadRooms: rooms => dispatch(loadRooms(rooms))
})

export default connect(mapUserState, mapDispatch)(Room);
