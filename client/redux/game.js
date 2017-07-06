//------- ACTIONS -------
const START_GAME = 'START_GAME';
const END_GAME = 'END_GAME';
const UPDATE_PLAYERS_STATE = 'UPDATE_PLAYERS_STATE';
const SET_PLAYER = 'SET_PLAYER';
const INIT_PLAYERS = 'INIT_PLAYERS';
const UPDATE_LOCAL_STATE = 'UPDATE_LOCAL_STATE';
const SET_ANIMATION = 'SET_ANIMATION';
const SET_ACTIVE_PLAYERS = 'SET_ACTIVE_PLAYERS';
const SET_WINNER = 'SET_WINNER';

// ------ ACTION CREATORS -------
export const startGame = () => ({ type: START_GAME });
export const endGame = () => ({ type: END_GAME });
export const updatePlayersState = (localPlayer, remotePlayers) => ({
  type: UPDATE_PLAYERS_STATE,
  localPlayer,
  remotePlayers
});
export const updateLocalState = (localPlayer, remotePlayers) => ({
  type: UPDATE_LOCAL_STATE,
  localPlayer,
  remotePlayers
});
export const setPlayer = playerNumber => ({ type: SET_PLAYER, playerNumber });
export const initPlayers = (localPlayer, remotePlayers) => ({
  type: INIT_PLAYERS,
  localPlayer,
  remotePlayers
});
export const setAnimation = animation => ({ type: SET_ANIMATION, animation });
export const setActivePlayers = numPlayers => ({ type: SET_ACTIVE_PLAYERS, numPlayers });
export const setWinner = player => ({ type: SET_WINNER, player });

// ------- INIT STATE --------

// from game.players server state
/*
  EXAMPLE format:
  localPlayer: {
    xCoord: 100,
    yCoord: 100
  }

  remotePlayers = {
    playerNumber: {
      number: 1,
      damage: 100,
      characterGraphic: 'spritePath',
      weaponGraphic: 'spritePath'
    },
    playerNumber: {.....}
  }

 */

const initState = {
  isGamePlaying: false,
  playerNumber: 0,
  localPlayer: {},
  remotePlayers: {},
  playerStateChanges: {},
  activePlayers: 4,
  winner: '',
};

const defaultPlayer = {
  damage: 4,
  xCoord: 0,
  yCoord: 0,
  animation: '',
  isHit: false,
  flyRight: false,
  lives: 3,
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
      newState.localPlayer = action.localPlayer;
      newState.remotePlayers = action.remotePlayers;
      break;

    case UPDATE_PLAYERS_STATE:
      const updatedPlayer = Object.assign({}, newState.localPlayer);
      updatedPlayer.damage = action.localPlayer.damage;
      updatedPlayer.isHit = action.localPlayer.isHit;
      updatedPlayer.flyRight = action.localPlayer.flyRight;
      newState.localPlayer = updatedPlayer;
      newState.remotePlayers = action.remotePlayers;
      break;

    case UPDATE_LOCAL_STATE:
      const stateChanges = {};
      // position changes
      const { xCoord, yCoord, animation, lives, number } = action.localPlayer;
      stateChanges[number] = {};
      stateChanges[number].xCoord = xCoord;
      stateChanges[number].yCoord = yCoord;
      stateChanges[number].animation = animation;
      stateChanges[number].lives = lives;

      // damage changes
      Object.keys(action.remotePlayers)
        .forEach(playerNum => {
          stateChanges[playerNum] = {};
          stateChanges[playerNum].damage = action.remotePlayers[playerNum].damage;
          stateChanges[playerNum].isHit = action.remotePlayers[playerNum].isHit;
          stateChanges[playerNum].flyRight = action.remotePlayers[playerNum].flyRight;
        });
      newState.playerStateChanges = stateChanges;
      break;

    case SET_PLAYER:
      newState.playerNumber = action.playerNumber;
      break;

    case SET_ANIMATION:
      const updatedLocalPlayer = Object.assign({}, newState.localPlayer);
      updatedLocalPlayer.animation = action.animation;
      newState.localPlayer = updatedLocalPlayer;
      break;

    case SET_ACTIVE_PLAYERS:
      newState.activePlayers = action.numPlayers;
      break;

    default:
      break;
  }
  return newState;
}


// -------- DISPATCHERS -----------
export const processInitPlayers = players =>
  dispatch =>
    dispatch(processPlayers(players, initPlayers));

export const processPlayerUpdate = players =>
  dispatch =>
    dispatch(processPlayers(players, updatePlayersState));

export const processPlayers = ( players, actionCreator ) =>
  (dispatch, getState) => {
    for(let key in players){
      for(let defaults in defaultPlayer){
        players[key][defaults] = players[key][defaults] || defaultPlayer[defaults];
      }
    }
    const playerNumber = getState().game.playerNumber;
    const localPlayer = players[playerNumber];
    const remotePlayers = players;
    delete remotePlayers[playerNumber];
    dispatch(actionCreator(localPlayer || {}, remotePlayers || {}));
  }
