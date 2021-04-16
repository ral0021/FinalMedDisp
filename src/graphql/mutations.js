/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createMedication = /* GraphQL */ `
  mutation CreateMedication(
    $input: CreateMedicationInput!
    $condition: ModelMedicationConditionInput
  ) {
    createMedication(input: $input, condition: $condition) {
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
export const updateMedication = /* GraphQL */ `
  mutation UpdateMedication(
    $input: UpdateMedicationInput!
    $condition: ModelMedicationConditionInput
  ) {
    updateMedication(input: $input, condition: $condition) {
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
export const deleteMedication = /* GraphQL */ `
  mutation DeleteMedication(
    $input: DeleteMedicationInput!
    $condition: ModelMedicationConditionInput
  ) {
    deleteMedication(input: $input, condition: $condition) {
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
export const createCaregiverPatientMatcher = /* GraphQL */ `
  mutation CreateCaregiverPatientMatcher(
    $input: CreateCaregiverPatientMatcherInput!
    $condition: ModelCaregiverPatientMatcherConditionInput
  ) {
    createCaregiverPatientMatcher(input: $input, condition: $condition) {
      id
      patientUsername
      caregiverUsername
      createdAt
      updatedAt
    }
  }
`;
export const updateCaregiverPatientMatcher = /* GraphQL */ `
  mutation UpdateCaregiverPatientMatcher(
    $input: UpdateCaregiverPatientMatcherInput!
    $condition: ModelCaregiverPatientMatcherConditionInput
  ) {
    updateCaregiverPatientMatcher(input: $input, condition: $condition) {
      id
      patientUsername
      caregiverUsername
      createdAt
      updatedAt
    }
  }
`;
export const deleteCaregiverPatientMatcher = /* GraphQL */ `
  mutation DeleteCaregiverPatientMatcher(
    $input: DeleteCaregiverPatientMatcherInput!
    $condition: ModelCaregiverPatientMatcherConditionInput
  ) {
    deleteCaregiverPatientMatcher(input: $input, condition: $condition) {
      id
      patientUsername
      caregiverUsername
      createdAt
      updatedAt
    }
  }
`;
export const createVerification = /* GraphQL */ `
  mutation CreateVerification(
    $input: CreateVerificationInput!
    $condition: ModelVerificationConditionInput
  ) {
    createVerification(input: $input, condition: $condition) {
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
export const updateVerification = /* GraphQL */ `
  mutation UpdateVerification(
    $input: UpdateVerificationInput!
    $condition: ModelVerificationConditionInput
  ) {
    updateVerification(input: $input, condition: $condition) {
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
export const deleteVerification = /* GraphQL */ `
  mutation DeleteVerification(
    $input: DeleteVerificationInput!
    $condition: ModelVerificationConditionInput
  ) {
    deleteVerification(input: $input, condition: $condition) {
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
export const createDispense = /* GraphQL */ `
  mutation CreateDispense(
    $input: CreateDispenseInput!
    $condition: ModelDispenseConditionInput
  ) {
    createDispense(input: $input, condition: $condition) {
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
export const updateDispense = /* GraphQL */ `
  mutation UpdateDispense(
    $input: UpdateDispenseInput!
    $condition: ModelDispenseConditionInput
  ) {
    updateDispense(input: $input, condition: $condition) {
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
export const deleteDispense = /* GraphQL */ `
  mutation DeleteDispense(
    $input: DeleteDispenseInput!
    $condition: ModelDispenseConditionInput
  ) {
    deleteDispense(input: $input, condition: $condition) {
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
export const createTimeSlots = /* GraphQL */ `
  mutation CreateTimeSlots(
    $input: CreateTimeSlotsInput!
    $condition: ModelTimeSlotsConditionInput
  ) {
    createTimeSlots(input: $input, condition: $condition) {
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
export const updateTimeSlots = /* GraphQL */ `
  mutation UpdateTimeSlots(
    $input: UpdateTimeSlotsInput!
    $condition: ModelTimeSlotsConditionInput
  ) {
    updateTimeSlots(input: $input, condition: $condition) {
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
export const deleteTimeSlots = /* GraphQL */ `
  mutation DeleteTimeSlots(
    $input: DeleteTimeSlotsInput!
    $condition: ModelTimeSlotsConditionInput
  ) {
    deleteTimeSlots(input: $input, condition: $condition) {
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
export const createTestTableZach = /* GraphQL */ `
  mutation CreateTestTableZach(
    $input: CreateTestTableZachInput!
    $condition: ModeltestTableZachConditionInput
  ) {
    createTestTableZach(input: $input, condition: $condition) {
      id
      patientUsername
      caregiverUsername
      createdAt
      updatedAt
    }
  }
`;
export const updateTestTableZach = /* GraphQL */ `
  mutation UpdateTestTableZach(
    $input: UpdateTestTableZachInput!
    $condition: ModeltestTableZachConditionInput
  ) {
    updateTestTableZach(input: $input, condition: $condition) {
      id
      patientUsername
      caregiverUsername
      createdAt
      updatedAt
    }
  }
`;
export const deleteTestTableZach = /* GraphQL */ `
  mutation DeleteTestTableZach(
    $input: DeleteTestTableZachInput!
    $condition: ModeltestTableZachConditionInput
  ) {
    deleteTestTableZach(input: $input, condition: $condition) {
      id
      patientUsername
      caregiverUsername
      createdAt
      updatedAt
    }
  }
`;
export const createUsernameEmailMatcher = /* GraphQL */ `
  mutation CreateUsernameEmailMatcher(
    $input: CreateUsernameEmailMatcherInput!
    $condition: ModelusernameEmailMatcherConditionInput
  ) {
    createUsernameEmailMatcher(input: $input, condition: $condition) {
      id
      patientUsername
      patientEmail
      createdAt
      updatedAt
    }
  }
`;
export const updateUsernameEmailMatcher = /* GraphQL */ `
  mutation UpdateUsernameEmailMatcher(
    $input: UpdateUsernameEmailMatcherInput!
    $condition: ModelusernameEmailMatcherConditionInput
  ) {
    updateUsernameEmailMatcher(input: $input, condition: $condition) {
      id
      patientUsername
      patientEmail
      createdAt
      updatedAt
    }
  }
`;
export const deleteUsernameEmailMatcher = /* GraphQL */ `
  mutation DeleteUsernameEmailMatcher(
    $input: DeleteUsernameEmailMatcherInput!
    $condition: ModelusernameEmailMatcherConditionInput
  ) {
    deleteUsernameEmailMatcher(input: $input, condition: $condition) {
      id
      patientUsername
      patientEmail
      createdAt
      updatedAt
    }
  }
`;
export const createUsernameMachineMatcher = /* GraphQL */ `
  mutation CreateUsernameMachineMatcher(
    $input: CreateUsernameMachineMatcherInput!
    $condition: ModelUsernameMachineMatcherConditionInput
  ) {
    createUsernameMachineMatcher(input: $input, condition: $condition) {
      id
      patientUsername
      machineCode
      createdAt
      updatedAt
    }
  }
`;
export const updateUsernameMachineMatcher = /* GraphQL */ `
  mutation UpdateUsernameMachineMatcher(
    $input: UpdateUsernameMachineMatcherInput!
    $condition: ModelUsernameMachineMatcherConditionInput
  ) {
    updateUsernameMachineMatcher(input: $input, condition: $condition) {
      id
      patientUsername
      machineCode
      createdAt
      updatedAt
    }
  }
`;
export const deleteUsernameMachineMatcher = /* GraphQL */ `
  mutation DeleteUsernameMachineMatcher(
    $input: DeleteUsernameMachineMatcherInput!
    $condition: ModelUsernameMachineMatcherConditionInput
  ) {
    deleteUsernameMachineMatcher(input: $input, condition: $condition) {
      id
      patientUsername
      machineCode
      createdAt
      updatedAt
    }
  }
`;
