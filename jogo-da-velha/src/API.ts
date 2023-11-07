/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type GameData = {
  __typename: "GameData",
  id: string,
  status: GameStatus,
  turn: string,
  state: Array< Symbol | null >,
  winner?: string | null,
};

export enum GameStatus {
  REQUESTED = "REQUESTED",
  DECLINED = "DECLINED",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
  CANCELLED = "CANCELLED",
}


export enum Symbol {
  x = "x",
  o = "o",
}


export type CreatePlayerInput = {
  id?: string | null,
  cognitoID: string,
  username: string,
  name: string,
  email: string,
};

export type ModelPlayerConditionInput = {
  cognitoID?: ModelStringInput | null,
  name?: ModelStringInput | null,
  email?: ModelStringInput | null,
  and?: Array< ModelPlayerConditionInput | null > | null,
  or?: Array< ModelPlayerConditionInput | null > | null,
  not?: ModelPlayerConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type Player = {
  __typename: "Player",
  id: string,
  cognitoID: string,
  username: string,
  name: string,
  email: string,
  games?: ModelPlayerGameConnection | null,
  createdAt: string,
  updatedAt: string,
};

export type ModelPlayerGameConnection = {
  __typename: "ModelPlayerGameConnection",
  items:  Array<PlayerGame | null >,
  nextToken?: string | null,
};

export type PlayerGame = {
  __typename: "PlayerGame",
  id: string,
  gameID: string,
  playerUsername: string,
  createdAt: string,
  owners: Array< string >,
  game: Game,
  player: Player,
  updatedAt: string,
};

export type Game = {
  __typename: "Game",
  id: string,
  status: GameStatus,
  owners: Array< string >,
  initiator: string,
  turn: string,
  state: Array< Symbol | null >,
  winner?: string | null,
  players?: ModelPlayerGameConnection | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdatePlayerInput = {
  id?: string | null,
  cognitoID?: string | null,
  username: string,
  name?: string | null,
  email?: string | null,
};

export type DeletePlayerInput = {
  username: string,
};

export type CreateGameInput = {
  id?: string | null,
  status: GameStatus,
  owners: Array< string >,
  initiator: string,
  turn: string,
  state: Array< Symbol | null >,
  winner?: string | null,
};

export type ModelGameConditionInput = {
  status?: ModelGameStatusInput | null,
  owners?: ModelStringInput | null,
  initiator?: ModelStringInput | null,
  turn?: ModelStringInput | null,
  state?: ModelSymbolInput | null,
  winner?: ModelStringInput | null,
  and?: Array< ModelGameConditionInput | null > | null,
  or?: Array< ModelGameConditionInput | null > | null,
  not?: ModelGameConditionInput | null,
};

export type ModelGameStatusInput = {
  eq?: GameStatus | null,
  ne?: GameStatus | null,
};

export type ModelSymbolInput = {
  eq?: Symbol | null,
  ne?: Symbol | null,
};

export type UpdateGameInput = {
  id: string,
  status?: GameStatus | null,
  owners?: Array< string > | null,
  initiator?: string | null,
  turn?: string | null,
  state?: Array< Symbol | null > | null,
  winner?: string | null,
};

export type DeleteGameInput = {
  id: string,
};

export type CreatePlayerGameInput = {
  id?: string | null,
  gameID: string,
  playerUsername: string,
  createdAt?: string | null,
  owners: Array< string >,
};

export type ModelPlayerGameConditionInput = {
  gameID?: ModelIDInput | null,
  playerUsername?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  owners?: ModelStringInput | null,
  and?: Array< ModelPlayerGameConditionInput | null > | null,
  or?: Array< ModelPlayerGameConditionInput | null > | null,
  not?: ModelPlayerGameConditionInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type UpdatePlayerGameInput = {
  id: string,
  gameID?: string | null,
  playerUsername?: string | null,
  createdAt?: string | null,
  owners?: Array< string > | null,
};

export type DeletePlayerGameInput = {
  id: string,
};

export type ModelPlayerFilterInput = {
  id?: ModelIDInput | null,
  cognitoID?: ModelStringInput | null,
  username?: ModelStringInput | null,
  name?: ModelStringInput | null,
  email?: ModelStringInput | null,
  and?: Array< ModelPlayerFilterInput | null > | null,
  or?: Array< ModelPlayerFilterInput | null > | null,
  not?: ModelPlayerFilterInput | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelPlayerConnection = {
  __typename: "ModelPlayerConnection",
  items:  Array<Player | null >,
  nextToken?: string | null,
};

export type SearchablePlayerFilterInput = {
  id?: SearchableIDFilterInput | null,
  cognitoID?: SearchableStringFilterInput | null,
  username?: SearchableStringFilterInput | null,
  name?: SearchableStringFilterInput | null,
  email?: SearchableStringFilterInput | null,
  createdAt?: SearchableStringFilterInput | null,
  updatedAt?: SearchableStringFilterInput | null,
  and?: Array< SearchablePlayerFilterInput | null > | null,
  or?: Array< SearchablePlayerFilterInput | null > | null,
  not?: SearchablePlayerFilterInput | null,
};

export type SearchableIDFilterInput = {
  ne?: string | null,
  gt?: string | null,
  lt?: string | null,
  gte?: string | null,
  lte?: string | null,
  eq?: string | null,
  match?: string | null,
  matchPhrase?: string | null,
  matchPhrasePrefix?: string | null,
  multiMatch?: string | null,
  exists?: boolean | null,
  wildcard?: string | null,
  regexp?: string | null,
  range?: Array< string | null > | null,
};

export type SearchableStringFilterInput = {
  ne?: string | null,
  gt?: string | null,
  lt?: string | null,
  gte?: string | null,
  lte?: string | null,
  eq?: string | null,
  match?: string | null,
  matchPhrase?: string | null,
  matchPhrasePrefix?: string | null,
  multiMatch?: string | null,
  exists?: boolean | null,
  wildcard?: string | null,
  regexp?: string | null,
  range?: Array< string | null > | null,
};

export type SearchablePlayerSortInput = {
  field?: SearchablePlayerSortableFields | null,
  direction?: SearchableSortDirection | null,
};

export enum SearchablePlayerSortableFields {
  id = "id",
  cognitoID = "cognitoID",
  username = "username",
  name = "name",
  email = "email",
  createdAt = "createdAt",
  updatedAt = "updatedAt",
}


export enum SearchableSortDirection {
  asc = "asc",
  desc = "desc",
}


export type SearchablePlayerAggregationInput = {
  name: string,
  type: SearchableAggregateType,
  field: SearchablePlayerAggregateField,
};

export enum SearchableAggregateType {
  terms = "terms",
  avg = "avg",
  min = "min",
  max = "max",
  sum = "sum",
}


export enum SearchablePlayerAggregateField {
  id = "id",
  cognitoID = "cognitoID",
  username = "username",
  name = "name",
  email = "email",
  createdAt = "createdAt",
  updatedAt = "updatedAt",
}


export type SearchablePlayerConnection = {
  __typename: "SearchablePlayerConnection",
  items:  Array<Player | null >,
  nextToken?: string | null,
  total?: number | null,
  aggregateItems:  Array<SearchableAggregateResult | null >,
};

export type SearchableAggregateResult = {
  __typename: "SearchableAggregateResult",
  name: string,
  result?: SearchableAggregateGenericResult | null,
};

export type SearchableAggregateGenericResult = SearchableAggregateScalarResult | SearchableAggregateBucketResult


export type SearchableAggregateScalarResult = {
  __typename: "SearchableAggregateScalarResult",
  value: number,
};

export type SearchableAggregateBucketResult = {
  __typename: "SearchableAggregateBucketResult",
  buckets?:  Array<SearchableAggregateBucketResultItem | null > | null,
};

export type SearchableAggregateBucketResultItem = {
  __typename: "SearchableAggregateBucketResultItem",
  key: string,
  doc_count: number,
};

export type ModelGameFilterInput = {
  id?: ModelIDInput | null,
  status?: ModelGameStatusInput | null,
  owners?: ModelStringInput | null,
  initiator?: ModelStringInput | null,
  turn?: ModelStringInput | null,
  state?: ModelSymbolInput | null,
  winner?: ModelStringInput | null,
  and?: Array< ModelGameFilterInput | null > | null,
  or?: Array< ModelGameFilterInput | null > | null,
  not?: ModelGameFilterInput | null,
};

export type ModelGameConnection = {
  __typename: "ModelGameConnection",
  items:  Array<Game | null >,
  nextToken?: string | null,
};

export type ModelPlayerGameFilterInput = {
  id?: ModelIDInput | null,
  gameID?: ModelIDInput | null,
  playerUsername?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  owners?: ModelStringInput | null,
  and?: Array< ModelPlayerGameFilterInput | null > | null,
  or?: Array< ModelPlayerGameFilterInput | null > | null,
  not?: ModelPlayerGameFilterInput | null,
};

export type StartGameMutationVariables = {
  invitee: string,
};

export type StartGameMutation = {
  startGame?:  {
    __typename: "GameData",
    id: string,
    status: GameStatus,
    turn: string,
    state: Array< Symbol | null >,
    winner?: string | null,
  } | null,
};

export type PlayMoveMutationVariables = {
  game: string,
  index: number,
};

export type PlayMoveMutation = {
  playMove?:  {
    __typename: "GameData",
    id: string,
    status: GameStatus,
    turn: string,
    state: Array< Symbol | null >,
    winner?: string | null,
  } | null,
};

export type CreatePlayerMutationVariables = {
  input: CreatePlayerInput,
  condition?: ModelPlayerConditionInput | null,
};

export type CreatePlayerMutation = {
  createPlayer?:  {
    __typename: "Player",
    id: string,
    cognitoID: string,
    username: string,
    name: string,
    email: string,
    games?:  {
      __typename: "ModelPlayerGameConnection",
      items:  Array< {
        __typename: "PlayerGame",
        id: string,
        gameID: string,
        playerUsername: string,
        createdAt: string,
        owners: Array< string >,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdatePlayerMutationVariables = {
  input: UpdatePlayerInput,
  condition?: ModelPlayerConditionInput | null,
};

export type UpdatePlayerMutation = {
  updatePlayer?:  {
    __typename: "Player",
    id: string,
    cognitoID: string,
    username: string,
    name: string,
    email: string,
    games?:  {
      __typename: "ModelPlayerGameConnection",
      items:  Array< {
        __typename: "PlayerGame",
        id: string,
        gameID: string,
        playerUsername: string,
        createdAt: string,
        owners: Array< string >,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeletePlayerMutationVariables = {
  input: DeletePlayerInput,
  condition?: ModelPlayerConditionInput | null,
};

export type DeletePlayerMutation = {
  deletePlayer?:  {
    __typename: "Player",
    id: string,
    cognitoID: string,
    username: string,
    name: string,
    email: string,
    games?:  {
      __typename: "ModelPlayerGameConnection",
      items:  Array< {
        __typename: "PlayerGame",
        id: string,
        gameID: string,
        playerUsername: string,
        createdAt: string,
        owners: Array< string >,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateGameMutationVariables = {
  input: CreateGameInput,
  condition?: ModelGameConditionInput | null,
};

export type CreateGameMutation = {
  createGame?:  {
    __typename: "Game",
    id: string,
    status: GameStatus,
    owners: Array< string >,
    initiator: string,
    turn: string,
    state: Array< Symbol | null >,
    winner?: string | null,
    players?:  {
      __typename: "ModelPlayerGameConnection",
      items:  Array< {
        __typename: "PlayerGame",
        id: string,
        gameID: string,
        playerUsername: string,
        createdAt: string,
        owners: Array< string >,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateGameMutationVariables = {
  input: UpdateGameInput,
  condition?: ModelGameConditionInput | null,
};

export type UpdateGameMutation = {
  updateGame?:  {
    __typename: "Game",
    id: string,
    status: GameStatus,
    owners: Array< string >,
    initiator: string,
    turn: string,
    state: Array< Symbol | null >,
    winner?: string | null,
    players?:  {
      __typename: "ModelPlayerGameConnection",
      items:  Array< {
        __typename: "PlayerGame",
        id: string,
        gameID: string,
        playerUsername: string,
        createdAt: string,
        owners: Array< string >,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteGameMutationVariables = {
  input: DeleteGameInput,
  condition?: ModelGameConditionInput | null,
};

export type DeleteGameMutation = {
  deleteGame?:  {
    __typename: "Game",
    id: string,
    status: GameStatus,
    owners: Array< string >,
    initiator: string,
    turn: string,
    state: Array< Symbol | null >,
    winner?: string | null,
    players?:  {
      __typename: "ModelPlayerGameConnection",
      items:  Array< {
        __typename: "PlayerGame",
        id: string,
        gameID: string,
        playerUsername: string,
        createdAt: string,
        owners: Array< string >,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreatePlayerGameMutationVariables = {
  input: CreatePlayerGameInput,
  condition?: ModelPlayerGameConditionInput | null,
};

export type CreatePlayerGameMutation = {
  createPlayerGame?:  {
    __typename: "PlayerGame",
    id: string,
    gameID: string,
    playerUsername: string,
    createdAt: string,
    owners: Array< string >,
    game:  {
      __typename: "Game",
      id: string,
      status: GameStatus,
      owners: Array< string >,
      initiator: string,
      turn: string,
      state: Array< Symbol | null >,
      winner?: string | null,
      players?:  {
        __typename: "ModelPlayerGameConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    },
    player:  {
      __typename: "Player",
      id: string,
      cognitoID: string,
      username: string,
      name: string,
      email: string,
      games?:  {
        __typename: "ModelPlayerGameConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    },
    updatedAt: string,
  } | null,
};

export type UpdatePlayerGameMutationVariables = {
  input: UpdatePlayerGameInput,
  condition?: ModelPlayerGameConditionInput | null,
};

export type UpdatePlayerGameMutation = {
  updatePlayerGame?:  {
    __typename: "PlayerGame",
    id: string,
    gameID: string,
    playerUsername: string,
    createdAt: string,
    owners: Array< string >,
    game:  {
      __typename: "Game",
      id: string,
      status: GameStatus,
      owners: Array< string >,
      initiator: string,
      turn: string,
      state: Array< Symbol | null >,
      winner?: string | null,
      players?:  {
        __typename: "ModelPlayerGameConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    },
    player:  {
      __typename: "Player",
      id: string,
      cognitoID: string,
      username: string,
      name: string,
      email: string,
      games?:  {
        __typename: "ModelPlayerGameConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    },
    updatedAt: string,
  } | null,
};

export type DeletePlayerGameMutationVariables = {
  input: DeletePlayerGameInput,
  condition?: ModelPlayerGameConditionInput | null,
};

export type DeletePlayerGameMutation = {
  deletePlayerGame?:  {
    __typename: "PlayerGame",
    id: string,
    gameID: string,
    playerUsername: string,
    createdAt: string,
    owners: Array< string >,
    game:  {
      __typename: "Game",
      id: string,
      status: GameStatus,
      owners: Array< string >,
      initiator: string,
      turn: string,
      state: Array< Symbol | null >,
      winner?: string | null,
      players?:  {
        __typename: "ModelPlayerGameConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    },
    player:  {
      __typename: "Player",
      id: string,
      cognitoID: string,
      username: string,
      name: string,
      email: string,
      games?:  {
        __typename: "ModelPlayerGameConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    },
    updatedAt: string,
  } | null,
};

export type GetPlayerQueryVariables = {
  username: string,
};

export type GetPlayerQuery = {
  getPlayer?:  {
    __typename: "Player",
    id: string,
    cognitoID: string,
    username: string,
    name: string,
    email: string,
    games?:  {
      __typename: "ModelPlayerGameConnection",
      items:  Array< {
        __typename: "PlayerGame",
        id: string,
        gameID: string,
        playerUsername: string,
        createdAt: string,
        owners: Array< string >,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListPlayersQueryVariables = {
  username?: string | null,
  filter?: ModelPlayerFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListPlayersQuery = {
  listPlayers?:  {
    __typename: "ModelPlayerConnection",
    items:  Array< {
      __typename: "Player",
      id: string,
      cognitoID: string,
      username: string,
      name: string,
      email: string,
      games?:  {
        __typename: "ModelPlayerGameConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type SearchPlayersQueryVariables = {
  filter?: SearchablePlayerFilterInput | null,
  sort?: Array< SearchablePlayerSortInput | null > | null,
  limit?: number | null,
  nextToken?: string | null,
  from?: number | null,
  aggregates?: Array< SearchablePlayerAggregationInput | null > | null,
};

export type SearchPlayersQuery = {
  searchPlayers?:  {
    __typename: "SearchablePlayerConnection",
    items:  Array< {
      __typename: "Player",
      id: string,
      cognitoID: string,
      username: string,
      name: string,
      email: string,
      games?:  {
        __typename: "ModelPlayerGameConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
    total?: number | null,
    aggregateItems:  Array< {
      __typename: "SearchableAggregateResult",
      name: string,
      result: ( {
          __typename: "SearchableAggregateScalarResult",
          value: number,
        } | {
          __typename: "SearchableAggregateBucketResult",
          buckets?:  Array< {
            __typename: string,
            key: string,
            doc_count: number,
          } | null > | null,
        }
      ) | null,
    } | null >,
  } | null,
};

export type GetGameQueryVariables = {
  id: string,
};

export type GetGameQuery = {
  getGame?:  {
    __typename: "Game",
    id: string,
    status: GameStatus,
    owners: Array< string >,
    initiator: string,
    turn: string,
    state: Array< Symbol | null >,
    winner?: string | null,
    players?:  {
      __typename: "ModelPlayerGameConnection",
      items:  Array< {
        __typename: "PlayerGame",
        id: string,
        gameID: string,
        playerUsername: string,
        createdAt: string,
        owners: Array< string >,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListGamesQueryVariables = {
  filter?: ModelGameFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListGamesQuery = {
  listGames?:  {
    __typename: "ModelGameConnection",
    items:  Array< {
      __typename: "Game",
      id: string,
      status: GameStatus,
      owners: Array< string >,
      initiator: string,
      turn: string,
      state: Array< Symbol | null >,
      winner?: string | null,
      players?:  {
        __typename: "ModelPlayerGameConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetPlayerGameQueryVariables = {
  id: string,
};

export type GetPlayerGameQuery = {
  getPlayerGame?:  {
    __typename: "PlayerGame",
    id: string,
    gameID: string,
    playerUsername: string,
    createdAt: string,
    owners: Array< string >,
    game:  {
      __typename: "Game",
      id: string,
      status: GameStatus,
      owners: Array< string >,
      initiator: string,
      turn: string,
      state: Array< Symbol | null >,
      winner?: string | null,
      players?:  {
        __typename: "ModelPlayerGameConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    },
    player:  {
      __typename: "Player",
      id: string,
      cognitoID: string,
      username: string,
      name: string,
      email: string,
      games?:  {
        __typename: "ModelPlayerGameConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    },
    updatedAt: string,
  } | null,
};

export type ListPlayerGamesQueryVariables = {
  filter?: ModelPlayerGameFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListPlayerGamesQuery = {
  listPlayerGames?:  {
    __typename: "ModelPlayerGameConnection",
    items:  Array< {
      __typename: "PlayerGame",
      id: string,
      gameID: string,
      playerUsername: string,
      createdAt: string,
      owners: Array< string >,
      game:  {
        __typename: "Game",
        id: string,
        status: GameStatus,
        owners: Array< string >,
        initiator: string,
        turn: string,
        state: Array< Symbol | null >,
        winner?: string | null,
        createdAt: string,
        updatedAt: string,
      },
      player:  {
        __typename: "Player",
        id: string,
        cognitoID: string,
        username: string,
        name: string,
        email: string,
        createdAt: string,
        updatedAt: string,
      },
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnUpdateGameByIdSubscriptionVariables = {
  id: string,
};

export type OnUpdateGameByIdSubscription = {
  onUpdateGameById?:  {
    __typename: "Game",
    id: string,
    status: GameStatus,
    owners: Array< string >,
    initiator: string,
    turn: string,
    state: Array< Symbol | null >,
    winner?: string | null,
    players?:  {
      __typename: "ModelPlayerGameConnection",
      items:  Array< {
        __typename: "PlayerGame",
        id: string,
        gameID: string,
        playerUsername: string,
        createdAt: string,
        owners: Array< string >,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreatePlayerSubscription = {
  onCreatePlayer?:  {
    __typename: "Player",
    id: string,
    cognitoID: string,
    username: string,
    name: string,
    email: string,
    games?:  {
      __typename: "ModelPlayerGameConnection",
      items:  Array< {
        __typename: "PlayerGame",
        id: string,
        gameID: string,
        playerUsername: string,
        createdAt: string,
        owners: Array< string >,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdatePlayerSubscription = {
  onUpdatePlayer?:  {
    __typename: "Player",
    id: string,
    cognitoID: string,
    username: string,
    name: string,
    email: string,
    games?:  {
      __typename: "ModelPlayerGameConnection",
      items:  Array< {
        __typename: "PlayerGame",
        id: string,
        gameID: string,
        playerUsername: string,
        createdAt: string,
        owners: Array< string >,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeletePlayerSubscription = {
  onDeletePlayer?:  {
    __typename: "Player",
    id: string,
    cognitoID: string,
    username: string,
    name: string,
    email: string,
    games?:  {
      __typename: "ModelPlayerGameConnection",
      items:  Array< {
        __typename: "PlayerGame",
        id: string,
        gameID: string,
        playerUsername: string,
        createdAt: string,
        owners: Array< string >,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateGameSubscription = {
  onCreateGame?:  {
    __typename: "Game",
    id: string,
    status: GameStatus,
    owners: Array< string >,
    initiator: string,
    turn: string,
    state: Array< Symbol | null >,
    winner?: string | null,
    players?:  {
      __typename: "ModelPlayerGameConnection",
      items:  Array< {
        __typename: "PlayerGame",
        id: string,
        gameID: string,
        playerUsername: string,
        createdAt: string,
        owners: Array< string >,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateGameSubscription = {
  onUpdateGame?:  {
    __typename: "Game",
    id: string,
    status: GameStatus,
    owners: Array< string >,
    initiator: string,
    turn: string,
    state: Array< Symbol | null >,
    winner?: string | null,
    players?:  {
      __typename: "ModelPlayerGameConnection",
      items:  Array< {
        __typename: "PlayerGame",
        id: string,
        gameID: string,
        playerUsername: string,
        createdAt: string,
        owners: Array< string >,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteGameSubscription = {
  onDeleteGame?:  {
    __typename: "Game",
    id: string,
    status: GameStatus,
    owners: Array< string >,
    initiator: string,
    turn: string,
    state: Array< Symbol | null >,
    winner?: string | null,
    players?:  {
      __typename: "ModelPlayerGameConnection",
      items:  Array< {
        __typename: "PlayerGame",
        id: string,
        gameID: string,
        playerUsername: string,
        createdAt: string,
        owners: Array< string >,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreatePlayerGameSubscription = {
  onCreatePlayerGame?:  {
    __typename: "PlayerGame",
    id: string,
    gameID: string,
    playerUsername: string,
    createdAt: string,
    owners: Array< string >,
    game:  {
      __typename: "Game",
      id: string,
      status: GameStatus,
      owners: Array< string >,
      initiator: string,
      turn: string,
      state: Array< Symbol | null >,
      winner?: string | null,
      players?:  {
        __typename: "ModelPlayerGameConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    },
    player:  {
      __typename: "Player",
      id: string,
      cognitoID: string,
      username: string,
      name: string,
      email: string,
      games?:  {
        __typename: "ModelPlayerGameConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    },
    updatedAt: string,
  } | null,
};

export type OnUpdatePlayerGameSubscription = {
  onUpdatePlayerGame?:  {
    __typename: "PlayerGame",
    id: string,
    gameID: string,
    playerUsername: string,
    createdAt: string,
    owners: Array< string >,
    game:  {
      __typename: "Game",
      id: string,
      status: GameStatus,
      owners: Array< string >,
      initiator: string,
      turn: string,
      state: Array< Symbol | null >,
      winner?: string | null,
      players?:  {
        __typename: "ModelPlayerGameConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    },
    player:  {
      __typename: "Player",
      id: string,
      cognitoID: string,
      username: string,
      name: string,
      email: string,
      games?:  {
        __typename: "ModelPlayerGameConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    },
    updatedAt: string,
  } | null,
};

export type OnDeletePlayerGameSubscription = {
  onDeletePlayerGame?:  {
    __typename: "PlayerGame",
    id: string,
    gameID: string,
    playerUsername: string,
    createdAt: string,
    owners: Array< string >,
    game:  {
      __typename: "Game",
      id: string,
      status: GameStatus,
      owners: Array< string >,
      initiator: string,
      turn: string,
      state: Array< Symbol | null >,
      winner?: string | null,
      players?:  {
        __typename: "ModelPlayerGameConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    },
    player:  {
      __typename: "Player",
      id: string,
      cognitoID: string,
      username: string,
      name: string,
      email: string,
      games?:  {
        __typename: "ModelPlayerGameConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    },
    updatedAt: string,
  } | null,
};
