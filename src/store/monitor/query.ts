import { gql } from "@apollo/client";
import { flagName } from "./actionTypes";

const GET_USER_INFO_MONITOR_QUERY = {
  label: `${flagName}/GET_USER_INFO_MONITOR_QUERY`,
  query: gql`
    query UserInfo {
      userInfo {
        __typename
        ... on AccountObjectType {
          joinedProjects {
            id
            name
            farms {
              id
              name
              monitors {
                __typename
                ... on PortMonitorObjectType {
                  id
                  type
                  pause
                  pinOrder
                  name
                  host
                  port
                  interval
                  timeout
                  retries
                  assignZones {
                    code
                    name
                  }
                }
                ... on HttpMonitorObjectType {
                  id
                  type
                  pause
                  pinOrder
                  name
                  method
                  requestPayload
                  host
                  port
                  path
                  interval
                  timeout
                  retries
                  assignZones {
                    code
                    name
                  }
                  user
                  password
                  responseRegex
                  expectedCodes
                  followRedirect
                  headers {
                    key
                    value
                  }
                }
                ... on HttpsMonitorObjectType {
                  id
                  type
                  pause
                  pinOrder
                  name
                  method
                  requestPayload
                  host
                  port
                  path
                  interval
                  timeout
                  retries
                  assignZones {
                    code
                    name
                  }
                  user
                  password
                  notifySslNearlyExpriesInDays
                  sslCheck
                  responseRegex
                  expectedCodes
                  followRedirect
                  headers {
                    key
                    value
                  }
                }
                ... on PostgressMonitorObjectType {
                  id
                  type
                  pause
                  pinOrder
                  name
                  host
                  port
                  interval
                  timeout
                  retries
                  assignZones {
                    code
                    name
                  }
                  user
                  password
                  database
                  query
                  queryReturnExpect
                  uri
                  isUriConnection
                }
                ... on MysqlMonitorObjectType {
                  id
                  type
                  pause
                  pinOrder
                  name
                  host
                  port
                  interval
                  timeout
                  retries
                  assignZones {
                    code
                    name
                  }
                  user
                  password
                  database
                  query
                  queryReturnExpect
                  uri
                  isUriConnection
                }
                ... on MongoDBMonitorObjectType {
                  id
                  type
                  pause
                  pinOrder
                  name
                  host
                  port
                  interval
                  timeout
                  retries
                  assignZones {
                    code
                    name
                  }
                  user
                  password
                  database
                  query
                  queryReturnExpect
                  uri
                  isUriConnection
                }
                ... on RedisMonitorObjectType {
                  id
                  type
                  pause
                  pinOrder
                  name
                  host
                  port
                  interval
                  timeout
                  retries
                  assignZones {
                    code
                    name
                  }
                  password
                  database
                }
                ... on SmtpMonitorObjectType {
                  id
                  type
                  pause
                  pinOrder
                  name
                  host
                  port
                  interval
                  timeout
                  retries
                  assignZones {
                    code
                    name
                  }
                  user
                  password
                }
                ... on APIMonitorObjectType {
                  id
                  type
                  pause
                  pinOrder
                  name
                  apiPublicKey
                  interval
                  timeout
                  retries
                }
              }
              pinOrder
            }
            listAvailableExceptionCodes
            listAvailableIntervals
            listAvailableMethods
            listAvailableMonitorTypes
            listAvailableRetries
            listAvailableTimeouts
            listAvailableZones {
              code
              name
            }
            pinOrder
            members {
              id
              email
              role
              status
              account {
                id
                fullName
                username
                avatar
              }
            }
            canCreateProject
            canUpdateProject
            canDeleteProject
            canInviteProject
            canCreateFarm
            canUpdateFarm
            canDeleteFarm
            canCreateMonitor
            canUpdateMonitor
            canDeleteMonitor
            canStartMonitor
            canStopMonitor
            canUpdateNotify
            canCreateEnvironment
            canUpdateEnvironment
            canDeleteEnvironment
            logo
            owner {
              name
              avatar
              username
            }
            environments {
              id
              isSecret
              key
              value
            }
          }
          ownedProjects {
            id
            name
            logo
            farms {
              id
              name
              monitors {
                __typename
                ... on PortMonitorObjectType {
                  id
                  type
                  pause
                  pinOrder
                  name
                  host
                  port
                  interval
                  timeout
                  retries
                  assignZones {
                    code
                    name
                  }
                }
                ... on HttpMonitorObjectType {
                  id
                  type
                  pause
                  pinOrder
                  name
                  method
                  requestPayload
                  host
                  port
                  path
                  interval
                  timeout
                  retries
                  assignZones {
                    code
                    name
                  }
                  user
                  password
                  responseRegex
                  expectedCodes
                  followRedirect
                  headers {
                    key
                    value
                  }
                }
                ... on HttpsMonitorObjectType {
                  id
                  type
                  pause
                  pinOrder
                  name
                  method
                  requestPayload
                  host
                  port
                  path
                  interval
                  timeout
                  retries
                  assignZones {
                    code
                    name
                  }
                  user
                  password
                  notifySslNearlyExpriesInDays
                  sslCheck
                  responseRegex
                  expectedCodes
                  followRedirect
                  headers {
                    key
                    value
                  }
                }
                ... on PostgressMonitorObjectType {
                  id
                  type
                  pause
                  pinOrder
                  name
                  host
                  port
                  interval
                  timeout
                  retries
                  assignZones {
                    code
                    name
                  }
                  user
                  password
                  database
                  query
                  queryReturnExpect
                  uri
                  isUriConnection
                }
                ... on MysqlMonitorObjectType {
                  id
                  type
                  pause
                  pinOrder
                  name
                  host
                  port
                  interval
                  timeout
                  retries
                  assignZones {
                    code
                    name
                  }
                  user
                  password
                  database
                  query
                  queryReturnExpect
                  uri
                  isUriConnection
                }
                ... on MongoDBMonitorObjectType {
                  id
                  type
                  pause
                  pinOrder
                  name
                  host
                  port
                  interval
                  timeout
                  retries
                  assignZones {
                    code
                    name
                  }
                  user
                  password
                  database
                  query
                  queryReturnExpect
                  uri
                  isUriConnection
                }
                ... on RedisMonitorObjectType {
                  id
                  type
                  pause
                  pinOrder
                  name
                  host
                  port
                  interval
                  timeout
                  retries
                  assignZones {
                    code
                    name
                  }
                  password
                  database
                }
                ... on SmtpMonitorObjectType {
                  id
                  type
                  pause
                  pinOrder
                  name
                  host
                  port
                  interval
                  timeout
                  retries
                  assignZones {
                    code
                    name
                  }
                  user
                  password
                }
                ... on APIMonitorObjectType {
                  id
                  type
                  pause
                  pinOrder
                  name
                  apiPublicKey
                  interval
                  timeout
                  retries
                }
              }
              pinOrder
            }
            listAvailableExceptionCodes
            listAvailableIntervals
            listAvailableMethods
            listAvailableMonitorTypes
            listAvailableRetries
            listAvailableTimeouts
            listAvailableZones {
              code
              name
            }
            pinOrder
            members {
              id
              email
              role
              status
              account {
                id
                fullName
                username
                avatar
              }
            }
            canCreateProject
            canUpdateProject
            canDeleteProject
            canInviteProject
            canCreateFarm
            canUpdateFarm
            canDeleteFarm
            canCreateMonitor
            canUpdateMonitor
            canDeleteMonitor
            canStartMonitor
            canStopMonitor
            canUpdateNotify
            canCreateEnvironment
            canUpdateEnvironment
            canDeleteEnvironment
            environments {
              id
              isSecret
              key
              value
            }
          }
        }
      }
    }
  `,
};

const GET_USER_INFO_INVITATION_QUERY = {
  label: `${flagName}/GET_USER_INFO_INVITATION_QUERY`,
  query: gql`
    query UserInfo {
      userInfo {
        __typename
        ... on AccountObjectType {
          inviations {
            uuid
            inviterName
            projectName
            status
            expiresIn
            expiresAt
            isExpired
            role
            id
            email
          }
        }
      }
    }
  `,
};

const CREATE_OR_UPDATE_PROJECT_MUTATION = {
  label: `${flagName}/CREATE_OR_UPDATE_PROJECT_MUTATION`,
  query: gql`
    mutation CreateOrUpdateProject($project: ProjectInput) {
      createOrUpdateProject(project: $project) {
        message
        ok
      }
    }
  `,
};

const DELETE_PROJECT_MUTATION = {
  label: `${flagName}/DELETE_PROJECT_MUTATION`,
  query: gql`
    mutation DeleteProject($project: ProjectDeleteInput) {
      deleteProject(project: $project) {
        ok
        message
      }
    }
  `,
};

export {
  GET_USER_INFO_MONITOR_QUERY,
  GET_USER_INFO_INVITATION_QUERY,
  CREATE_OR_UPDATE_PROJECT_MUTATION,
  DELETE_PROJECT_MUTATION,
};
