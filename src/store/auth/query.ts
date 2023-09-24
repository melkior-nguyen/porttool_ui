import { gql } from "@apollo/client";
import { flagName } from "../auth/actionTypes";

const GET_COUNTRY_LIST_QUERY = {
  label: `${flagName}/GET_COUNTRY_LIST_QUERY`,
  query: gql`
    query {
      countryList
    }
  `,
};

const GET_USER_INFO_QUERY = {
  label: `${flagName}/GET_USER_INFO_QUERY`,
  query: gql`
    {
      userInfo {
        __typename
        ... on AccountObjectType {
          id
          lastLogin
          username
          mobile
          email
          isEmailVerified
          isMobileVerified
          isCompleteProfile
          fullName
          dob
          gender
          currentLat
          currentLon
          twoFaViaEmail
          twoFaViaMobile
          twoFaViaTotp
          setting
          avatar
          socials {
            uid
            provider
            created
            extraData
          }
          address {
            address
            zipCode
            city
            state
            country
          }
          accountType
        }
        ... on OTPAccountObjectType {
          id
          isEmailVerified
          isMobileVerified
          isCompleteProfile
          otpToken
          accountType
        }
      }
    }
  `,
};
const GET_USER_INFO_SOCIAL_CONNECTION_QUERY = {
  label: `${flagName}/GET_USER_INFO_SOCIAL_CONNECTION_QUERY`,
  query: gql`
    query UserInfo {
      userInfo {
        __typename
        ... on AccountObjectType {
          socials {
            uid
            provider
            extraData
            created
          }
        }
      }
    }
  `,
};

const GET_USER_INFO_SUBSCRIPTION_QUERY = {
  label: `${flagName}/GET_USER_INFO_SUBSCRIPTION_QUERY`,
  query: gql`
    query {
      userInfo {
        __typename
        ... on AccountObjectType {
          id
          accountType
          availblePlans {
            id
            planType
            code
            name
            label
            description
            price
            maxProject
            maxMonitor
            status
            notificationSms
            notificationWhatsap
            notificationZalo
            notificationMsteam
            notificationEmail
            notificationSlack
            notificationSlack
            notificationTelegram
            notificationSkype
            notificationViber
            monitorTypes
            intervalCredit
            intervalUnit
            paypalPlanId
          }
          subscription {
            billCount
            postBillingDate
            startDate
            nextBillingDate
            postPaymentSubscriptionId
            currentPaymentSubscriptionId
            nextPaymentSubscriptionId
            postPlan {
              id
              planType
              code
              name
              label
              description
              price
              maxProject
              maxMonitor
              status
              notificationSms
              notificationWhatsap
              notificationZalo
              notificationMsteam
              notificationEmail
              notificationSlack
              notificationSlack
              notificationTelegram
              notificationSkype
              notificationViber
              monitorTypes
              intervalCredit
              intervalUnit
              paypalPlanId
            }
            currentPlan {
              id
              planType
              code
              name
              label
              description
              price
              maxProject
              maxMonitor
              status
              notificationSms
              notificationWhatsap
              notificationZalo
              notificationMsteam
              notificationEmail
              notificationSlack
              notificationSlack
              notificationTelegram
              notificationSkype
              notificationViber
              monitorTypes
              intervalCredit
              intervalUnit
              paypalPlanId
            }
            nextPlan {
              id
              planType
              code
              name
              label
              description
              price
              maxProject
              maxMonitor
              status
              notificationSms
              notificationWhatsap
              notificationZalo
              notificationMsteam
              notificationEmail
              notificationSlack
              notificationSlack
              notificationTelegram
              notificationSkype
              notificationViber
              monitorTypes
              intervalCredit
              intervalUnit
              paypalPlanId
            }
          }
        }
      }
    }
  `,
};

const GET_USER_INFO_BILLING_QUERY = {
  label: `${flagName}/GET_USER_INFO_BILLING_QUERY`,
  query: gql`
    {
      userInfo {
        __typename
        ... on AccountObjectType {
          id
          billing {
            address
            city
            country
            name
            phone
            state
            zipCode
            taxId
          }
        }
      }
    }
  `,
};

const CREATE_ACCOUNT_MUTATION = {
  label: `${flagName}/CREATE_ACCOUNT_MUTATION`,
  query: gql`
    mutation ($user: CreateAccountInput) {
      createAccount(user: $user) {
        ok
        message
        user {
          __typename
          ... on OTPAccountObjectType {
            id
            isEmailVerified
            isMobileVerified
            isCompleteProfile
            otpToken
            otpTokenExpriesAt
            accountType
          }
        }
        payload
        token
        refreshToken
      }
    }
  `,
};

const SEND_OTP_EMAIL_MUTATION = {
  label: `${flagName}/SEND_OTP_EMAIL_MUTATION`,
  query: gql`
    mutation ($send: SendOTPEmailInput) {
      sendOtpEmail(send: $send) {
        ok
        message
        token {
          token
          expriesAt
        }
      }
    }
  `,
};

const VERIFY_OTP_EMAIL_MUTATION = {
  label: `${flagName}/VERIFY_OTP_EMAIL_MUTATION`,
  query: gql`
    mutation ($token: VerifyOTPInput) {
      verifyOtpEmail(token: $token) {
        ok
        message
        user {
          __typename
          ... on OTPAccountObjectType {
            id
            isEmailVerified
            isMobileVerified
            isCompleteProfile
            otpToken
            otpTokenExpriesAt
            accountType
          }
        }
      }
    }
  `,
};

const UPDATE_ACCOUNT_MUTATION = {
  label: `${flagName}/UPDATE_ACCOUNT_MUTATION`,
  query: gql`
    mutation ($user: AccountInput) {
      updateAccount(user: $user) {
        ok
        user {
          __typename
          ... on AccountObjectType {
            id
            lastLogin
            username
            fullName
            dob
            gender
            mobile
            email
            accountType
            currentLat
            currentLon
            isCompleteProfile
            isEmailVerified
            isMobileVerified
            twoFaViaEmail
            twoFaViaMobile
            twoFaViaTotp
            address {
              address
              zipCode
              city
              state
              country
              lat
              lon
            }
            billing {
              name
              address
              zipCode
              city
              state
              country
              phone
              taxId
            }
            setting
          }
        }
        message
      }
    }
  `,
};

const KEY_AUTH_MUTATION = {
  label: `${flagName}/SEND_2FA`,
  query: gql`
    mutation ($credential: KeyAuthInput!) {
      keyAuth(credential: $credential) {
        ok
        user {
          __typename
          ... on AccountObjectType {
            id
            lastLogin
            username
            mobile
            email
            accountType
            isCompleteProfile
            isEmailVerified
            isMobileVerified
            fullName
            dob
            gender
            currentLat
            currentLon
            address {
              id
              address
              zipCode
              city
              state
              lat
              lon
              country
            }
            twoFaViaEmail
            twoFaViaMobile
            twoFaViaTotp
            setting
          }
          ... on OTPAccountObjectType {
            id
            isMobileVerified
            isEmailVerified
            isCompleteProfile
            otpToken
            otpTokenExpriesAt
            accountType
          }

          ... on TwoFAAccountObjectType {
            id
            isMobileVerified
            isEmailVerified
            isCompleteProfile
            twoFaViaEmail
            twoFaViaMobile
            twoFaViaTotp
            faToken
            faTokenExpriesAt
            accountType
          }
        }
        message
        payload
        token
        refreshToken
      }
    }
  `,
};

const SEND_2FA_MUTATION = {
  label: `${flagName}/SEND_2FA`,
  query: gql`
    mutation ($send: Send2FAInput!) {
      send2fa(send: $send) {
        ok
        message
        token {
          token
          expriesAt
        }
      }
    }
  `,
};

const VERIFY_2FA_MUTATION = {
  label: `${flagName}/SEND_2FA`,
  query: gql`
    mutation ($token: Verify2FAInput!) {
      verify2fa(token: $token) {
        ok
        message
        user {
          __typename
          ... on AccountObjectType {
            id
            lastLogin
            username
            mobile
            email
            accountType
            isCompleteProfile
            isEmailVerified
            isMobileVerified
            fullName
            dob
            gender
            currentLat
            currentLon
            address {
              id
              address
              zipCode
              city
              state
              lat
              lon
              country
            }
            twoFaViaEmail
            twoFaViaMobile
            twoFaViaTotp
            setting
          }
          ... on OTPAccountObjectType {
            id
            isMobileVerified
            isEmailVerified
            isCompleteProfile
            otpToken
            otpTokenExpriesAt
            accountType
          }
          ... on TwoFAAccountObjectType {
            id
            isMobileVerified
            isEmailVerified
            isCompleteProfile
            twoFaViaEmail
            twoFaViaMobile
            twoFaViaTotp
            faToken
            faTokenExpriesAt
            accountType
          }
        }
        payload
        token
        refreshToken
      }
    }
  `,
};

const REQUEST_OTP_MUTATION = {
  label: `${flagName}/REQUEST_OTP_MUTATION`,
  query: gql`
    mutation ($credential: RequestOtpInput!) {
      requestOtp(credential: $credential) {
        ok
        message
        user {
          ... on OTPAccountObjectType {
            id
            isEmailVerified
            isMobileVerified
            isCompleteProfile
            otpToken
            otpTokenExpriesAt
            accountType
          }
        }
      }
    }
  `,
};

const ACTIVATE_TOTP_MUTATION = {
  label: `${flagName}/ACTIVATE_TOTP_MUTATION`,
  query: gql`
    mutation ($send: RequestTOTPInput) {
      activateTotp(send: $send) {
        ok
        message
        token {
          token
          expriesAt
          secret
          otpauth
        }
      }
    }
  `,
};

const VERIFY_TOTP_MUTATION = {
  label: `${flagName}/VERIFY_TOTP_MUTATION`,
  query: gql`
    mutation ($token: VerifyOTPInput) {
      verifyTotp(token: $token) {
        ok
        message
        user {
          __typename
          ... on OTPAccountObjectType {
            id
            isEmailVerified
            isMobileVerified
            isCompleteProfile
            otpToken
            otpTokenExpriesAt
            accountType
          }
        }
      }
    }
  `,
};

const SEND_OTP_MOBILE_MUTATION = {
  label: `${flagName}/SEND_OTP_MOBILE_MUTATION`,
  query: gql`
    mutation ($send: SendOTPMobileInput) {
      sendOtpMobile(send: $send) {
        ok
        message
        token {
          token
          expriesAt
        }
      }
    }
  `,
};

const VERIFY_OTP_MOBILE_MUTATION = {
  label: `${flagName}/VERIFY_OTP_MOBILE_MUTATION`,
  query: gql`
    mutation ($token: VerifyOTPInput) {
      verifyOtpMobile(token: $token) {
        ok
        message
        user {
          __typename
          ... on OTPAccountObjectType {
            id
            isEmailVerified
            isMobileVerified
            isCompleteProfile
            otpToken
            otpTokenExpriesAt
            accountType
          }
        }
      }
    }
  `,
};

const SOCIAL_AUTH_MUTATION = {
  label: `${flagName}/SOCIAL_AUTH`,
  query: gql`
    mutation ($token: SocialAuthInput!) {
      socialAuth(token: $token) {
        ok
        user {
          __typename
          ... on AccountObjectType {
            id
            lastLogin
            username
            mobile
            email
            accountType
            isCompleteProfile
            isEmailVerified
            isMobileVerified
            fullName
            dob
            gender
            currentLat
            currentLon
            address {
              id
              address
              zipCode
              city
              state
              lat
              lon
              country
            }
            twoFaViaEmail
            twoFaViaMobile
            twoFaViaTotp
            setting
          }
          ... on OTPAccountObjectType {
            id
            isMobileVerified
            isEmailVerified
            isCompleteProfile
            otpToken
            accountType
          }
          ... on TwoFAAccountObjectType {
            id
            isMobileVerified
            isEmailVerified
            isCompleteProfile
            twoFaViaMobile
            twoFaViaEmail
            twoFaViaTotp
            faToken
            accountType
            faTokenExpriesAt
          }
          ... on NonePassAccountObjectType {
            id
            isEmailVerified
            isMobileVerified
            isCompleteProfile
            accountType
            email
            hasPassword
          }
        }
        message
        payload
        token
        refreshToken
      }
    }
  `,
};

const REQUEST_PASSWORD_MUTATION = {
  label: `${flagName}/REQUEST_PASSWORD_MUTATION`,
  query: gql`
    mutation ($forgot: RequestPasswordResetInput!) {
      requestPassword(forgot: $forgot) {
        ok
        message
        user {
          ... on RequestPasswordResetType {
            id
            isEmailVerified
            isMobileVerified
            fpToken
            accountType
          }
        }
      }
    }
  `,
};

const SEND_PASSWORD_CODE_MUTATION = {
  label: `${flagName}/SEND_PASSWORD_CODE_MUTATION`,
  query: gql`
    mutation ($send: PasswordResetTokenInputType!) {
      sendPasswordCode(send: $send) {
        ok
        message
        token {
          token
          expriesAt
        }
      }
    }
  `,
};

const VERIFY_PASSWORD_CODE_AND_UPDATE_MUTATION = {
  label: `${flagName}/VERIFY_PASSWORD_CODE_AND_UPDATE_MUTATION`,
  query: gql`
    mutation ($token: VerifyPasswordResetCodeAndUpdateInput!) {
      verifyPasswordCodeAndUpdate(token: $token) {
        ok
        message
      }
    }
  `,
};

const SUBSCRIBE_MUTATION = {
  label: `${flagName}/SUBSCRIBE_MUTATION`,
  query: gql`
    mutation ($subscribe: SubscriptionInput!) {
      subscribe(subscribe: $subscribe) {
        ok
        message
        paymentUrl
      }
    }
  `,
};

const VERIFY_PAYPAL_SUBSCRIPTION_MUTATION = {
  label: `${flagName}/VERIFY_PAYPAL_SUBSCRIPTION_MUTATION`,
  query: gql`
    mutation ($subscribe: VerifySubscriptionInput!) {
      verifyPaypalSubscription(subscribe: $subscribe) {
        ok
        message
      }
    }
  `,
};

const SOCIAL_CONNECTION_MUTATION = {
  label: `${flagName}/SOCIAL_CONNECTION_MUTATION`,
  query: gql`
    mutation SocialAuth($token: SocialAuthInput!) {
      socialAuth(token: $token) {
        ok
        message
        payload
        token
        refreshToken
      }
    }
  `,
};

const REMOVE_SOCIAL_MUTATION = {
  label: `${flagName}/REMOVE_SOCIAL_MUTATION`,
  query: gql`
    mutation RemoveSocial($remove: RemoveSocialInput!) {
      removeSocial(remove: $remove) {
        ok
        message
      }
    }
  `,
};

const GET_SYSTEM_INFO_QUERY = {
  label: `${flagName}/GET_SYSTEM_INFO_QUERY`,
  query: gql`
    query Query {
      systemInfo
    }
  `,
};

export {
  GET_COUNTRY_LIST_QUERY,
  GET_USER_INFO_QUERY,
  GET_USER_INFO_SOCIAL_CONNECTION_QUERY,
  GET_USER_INFO_SUBSCRIPTION_QUERY,
  GET_USER_INFO_BILLING_QUERY,
  CREATE_ACCOUNT_MUTATION,
  SEND_OTP_EMAIL_MUTATION,
  VERIFY_OTP_EMAIL_MUTATION,
  UPDATE_ACCOUNT_MUTATION,
  KEY_AUTH_MUTATION,
  SEND_2FA_MUTATION,
  VERIFY_2FA_MUTATION,
  REQUEST_OTP_MUTATION,
  ACTIVATE_TOTP_MUTATION,
  VERIFY_TOTP_MUTATION,
  SEND_OTP_MOBILE_MUTATION,
  VERIFY_OTP_MOBILE_MUTATION,
  SOCIAL_AUTH_MUTATION,
  REQUEST_PASSWORD_MUTATION,
  SEND_PASSWORD_CODE_MUTATION,
  VERIFY_PASSWORD_CODE_AND_UPDATE_MUTATION,
  SUBSCRIBE_MUTATION,
  VERIFY_PAYPAL_SUBSCRIPTION_MUTATION,
  SOCIAL_CONNECTION_MUTATION,
  REMOVE_SOCIAL_MUTATION,
  GET_SYSTEM_INFO_QUERY,
};
