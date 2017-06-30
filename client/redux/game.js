//------- ACTIONS -------
const START_GAME = 'START_GAME';
const END_GAME = 'END_GAME';
const UPDATE_PLAYERS_STATE = 'UPDATE_PLAYERS_STATE';
const SET_PLAYER = 'SET_PLAYER';
const INIT_PLAYERS = 'INIT_PLAYERS';

// ------ ACTION CREATORS -------
export const startGame = () => ({ type: START_GAME });
export const endGame = () => ({ type: END_GAME });
export const updatePlayersState = players => ({ type: UPDATE_PLAYERS_STATE, players });
export const setPlayer = playerNumber => ({ type: SET_PLAYER, playerNumber });
export const initPlayers = players => ({ type: INIT_PLAYERS, players });

// ------- INIT STATE --------

// from game.players server state
/*
  EXAMPLE format:

  players = [
    {
      isPlayer: true
      number: 1,
      xPos: -300,
      yPos: 0,
      health: 100,
      characterGraphic: 'spritePath',
      weaponGraphic: 'spritePath'
    }, {}
  ]

 */

const initState = {
  isGamePlaying: false,
  players: [],
};


// ------- REDUCERS ------------
export default function (state = initState, action) {
  const newState = Object.assign({}, state );

  switch (action.type) {

    case START_GAME:
      newState.isGamePlaying = true;
      break;

    case END_GAME:
      newState.isGamePlaying = false;
      break;

    case INIT_PLAYERS:
      newState.players = action.players;
      break;

    case SET_PLAYER:
      // const updatedPlayers = newState.players.map(player => {
      //   if(player.number === action.playerNumber) player.isPlayer = true;
      //   return player;
      // });
      // newState.players = updatedPlayers;
      const playersObjCopy = Object.assign({}, newState.players);
      playersObjCopy[action.playerNumber].isPlayer = true
      newState.players = playersObjCopy
      break;

    case UPDATE_PLAYERS_STATE:

      const playersObjCopy2 = Object.assign({},newState.players)

      for(let key in playersObjCopy2){
        const newPlayerState = action.players[key]
        if(playersObjCopy2[key].isPlayer){
          playersObjCopy2[key].health = newPlayerState.health
          continue;
        }
        newPlayerState.isPlayer = false;
        continue;
      }

      // const updatedPlayerState = {
      // newState.players.map(player => {
      //   if(player.isPlayer){                           // if each old player isPlayer,
      //     player.health = action.players               
      //       .find(recievedPlayer =>
      //         recievedPlayer.number === player.number  // find the correct player from action.players 
      //       ).health;                                  // then get the health from that correct player
      //     return player;                               // set the health of old player to that health.
      //   }
      //   const newPlayer = action.players.find(recievedPlayer =>
      //     recievedPlayer.number === player.number
      //   )
      //   newPlayer.isPlayer = false;
      //   return newPlayer;
      // })
      // newState.players = updatedPlayerState;
      // break;


    default:
      break;
  }
  return newState;
}


// -------- DISPATCHERS -----------
export const processInitPlayers = players =>
  dispatch => dispatch(initPlayers(players));
