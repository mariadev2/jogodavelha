/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getPlayer = /* GraphQL */ `
  query GetPlayer($username: String!) {
    getPlayer(username: $username) {
      id
      cognitoID
      username
      name
      email
      games {
        items {
          id
          gameID
          playerUsername
          createdAt
          owners
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listPlayers = /* GraphQL */ `
  query ListPlayers(
    $username: String
    $filter: ModelPlayerFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listPlayers(
      username: $username
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        cognitoID
        username
        name
        email
        games {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const searchPlayers = /* GraphQL */ `
  query SearchPlayers(
    $filter: SearchablePlayerFilterInput
    $sort: [SearchablePlayerSortInput]
    $limit: Int
    $nextToken: String
    $from: Int
    $aggregates: [SearchablePlayerAggregationInput]
  ) {
    searchPlayers(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
      aggregates: $aggregates
    ) {
      items {
        id
        cognitoID
        username
        name
        email
        games {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
      total
      aggregateItems {
        name
        result {
          ... on SearchableAggregateScalarResult {
            value
          }
          ... on SearchableAggregateBucketResult {
            buckets {
              key
              doc_count
            }
          }
        }
      }
    }
  }
`;
export const getGame = /* GraphQL */ `
  query GetGame($id: ID!) {
    getGame(id: $id) {
      id
      status
      owners
      initiator
      turn
      state
      winner
      players {
        items {
          id
          gameID
          playerUsername
          createdAt
          owners
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listGames = /* GraphQL */ `
  query ListGames(
    $filter: ModelGameFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGames(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        status
        owners
        initiator
        turn
        state
        winner
        players {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getPlayerGame = /* GraphQL */ `
  query GetPlayerGame($id: ID!) {
    getPlayerGame(id: $id) {
      id
      gameID
      playerUsername
      createdAt
      owners
      game {
        id
        status
        owners
        initiator
        turn
        state
        winner
        players {
          nextToken
        }
        createdAt
        updatedAt
      }
      player {
        id
        cognitoID
        username
        name
        email
        games {
          nextToken
        }
        createdAt
        updatedAt
      }
      updatedAt
    }
  }
`;
export const listPlayerGames = /* GraphQL */ `
  query ListPlayerGames(
    $filter: ModelPlayerGameFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPlayerGames(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        gameID
        playerUsername
        createdAt
        owners
        game {
          id
          status
          owners
          initiator
          turn
          state
          winner
          createdAt
          updatedAt
        }
        player {
          id
          cognitoID
          username
          name
          email
          createdAt
          updatedAt
        }
        updatedAt
      }
      nextToken
    }
  }
`;
