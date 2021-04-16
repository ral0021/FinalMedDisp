/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getMedication = /* GraphQL */ `
  query GetMedication($id: ID!) {
    getMedication(id: $id) {
      id
      name
      start
      end
      slot1
      slot2
      slot3
      userid
      createdAt
      updatedAt
    }
  }
`;
export const listMedications = /* GraphQL */ `
  query ListMedications(
    $filter: ModelMedicationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMedications(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        start
        end
        slot1
        slot2
        slot3
        userid
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getCaregiverPatientMatcher = /* GraphQL */ `
  query GetCaregiverPatientMatcher($id: ID!) {
    getCaregiverPatientMatcher(id: $id) {
      id
      patientUsername
      caregiverUsername
      createdAt
      updatedAt
    }
  }
`;
export const listCaregiverPatientMatchers = /* GraphQL */ `
  query ListCaregiverPatientMatchers(
    $filter: ModelCaregiverPatientMatcherFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCaregiverPatientMatchers(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        patientUsername
        caregiverUsername
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getVerification = /* GraphQL */ `
  query GetVerification($id: ID!) {
    getVerification(id: $id) {
      id
      title
      description
      image
      userid
      createdAt
      updatedAt
    }
  }
`;
export const listVerifications = /* GraphQL */ `
  query ListVerifications(
    $filter: ModelVerificationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listVerifications(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        description
        image
        userid
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getDispense = /* GraphQL */ `
  query GetDispense($id: ID!) {
    getDispense(id: $id) {
      id
      date
      time
      took
      discription
      userid
      createdAt
      updatedAt
    }
  }
`;
export const listDispenses = /* GraphQL */ `
  query ListDispenses(
    $filter: ModelDispenseFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDispenses(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        date
        time
        took
        discription
        userid
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getTimeSlots = /* GraphQL */ `
  query GetTimeSlots($id: ID!) {
    getTimeSlots(id: $id) {
      id
      userid
      slot1
      slot2
      slot3
      createdAt
      updatedAt
    }
  }
`;
export const listTimeSlotss = /* GraphQL */ `
  query ListTimeSlotss(
    $filter: ModelTimeSlotsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTimeSlotss(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userid
        slot1
        slot2
        slot3
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getTestTableZach = /* GraphQL */ `
  query GetTestTableZach($id: ID!) {
    getTestTableZach(id: $id) {
      id
      patientUsername
      caregiverUsername
      createdAt
      updatedAt
    }
  }
`;
export const listTestTableZachs = /* GraphQL */ `
  query ListTestTableZachs(
    $filter: ModeltestTableZachFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTestTableZachs(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        patientUsername
        caregiverUsername
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getUsernameEmailMatcher = /* GraphQL */ `
  query GetUsernameEmailMatcher($id: ID!) {
    getUsernameEmailMatcher(id: $id) {
      id
      patientUsername
      patientEmail
      createdAt
      updatedAt
    }
  }
`;
export const listUsernameEmailMatchers = /* GraphQL */ `
  query ListUsernameEmailMatchers(
    $filter: ModelusernameEmailMatcherFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsernameEmailMatchers(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        patientUsername
        patientEmail
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getUsernameMachineMatcher = /* GraphQL */ `
  query GetUsernameMachineMatcher($id: ID!) {
    getUsernameMachineMatcher(id: $id) {
      id
      patientUsername
      machineCode
      createdAt
      updatedAt
    }
  }
`;
export const listUsernameMachineMatchers = /* GraphQL */ `
  query ListUsernameMachineMatchers(
    $filter: ModelUsernameMachineMatcherFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsernameMachineMatchers(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        patientUsername
        machineCode
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
