<script setup lang="ts">
import { ref, reactive, watchEffect } from 'vue';
import { Toast } from 'bootstrap';
import { useRouter } from 'vue-router';

import type { PrimaryAddress, Customer } from '@/types/Customer';
import { createCustomer } from '@/services/customerService';
import { isValidISODateString, isNotFutureDate, ssnRegex, emailRegex, phoneRegex, stateRegex, zipRegex } from '@/utilities/index';

const router = useRouter();

const states = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
  'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
  'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
  'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
];

const customerPrimaryAddress = reactive<PrimaryAddress>({
  address_line_1: "",
  city: "",
  state: "",
  zip_code: "",
});

const customer = reactive<Customer>({
  customer_number: 0,
  first_name: "",
  last_name: "",
  date_birth: "",
  ssn: "",
  email: "",
  primary_address: customerPrimaryAddress,
  mobile_phone_number: "",
  join_date: "",
});

const customerValidation = reactive({
  customer_number: false,
  first_name: false,
  last_name: false,
  date_birth: false,
  ssn: false,
  email: false,
  mobile_phone_number: false,
});

const customerPrimaryAddressValidation = reactive({
  address_line_1: false,
  city: false,
  state: false,
  zip_code: false,
})

const customerInputTouched = reactive({
  customer_number: false,
  first_name: false,
  last_name: false,
  date_birth: false,
  ssn: false,
  email: false,
  mobile_phone_number: false,
});

const customerPrimaryAddressInputTouched = reactive({
  address_line_1: false,
  city: false,
  state: false,
  zip_code: false,
});

const formSubmitted = ref(false);

// Validation functions
const validateCustomerNumber = (number: number) => {
  return number >= 10000 && number <= 50000;
};

const validateFirstName = (name: string) => {
  return name !== "";
};

const validateLastName = (name: string) => {
  return name !== "";
};

const validateDateOfBirth = (date: string) => {
  return isValidISODateString(date) && isNotFutureDate(date);
};

const validateSSN = (ssn: string) => {
  return ssnRegex.test(ssn);
};

const validateEmail = (email: string) => {
  return emailRegex.test(email);
};

const validateMobilePhoneNumber = (phone: string) => {
  return phoneRegex.test(phone);
};

const validateAddressLine1 = (address: string) => {
  return address !== "";
};

const validateCity = (city: string) => {
  return city !== "";
};

const validateState = (state: string) => {
  return stateRegex.test(state);
};

const validateZipCode = (zip: string) => {
  return zipRegex.test(zip);
};

watchEffect(() => {
  customerValidation.customer_number = validateCustomerNumber(customer.customer_number);
  customerValidation.first_name = validateFirstName(customer.first_name);
  customerValidation.last_name = validateLastName(customer.last_name);
  customerValidation.date_birth = validateDateOfBirth(customer.date_birth);
  customerValidation.ssn = validateSSN(customer.ssn);
  customerValidation.email = validateEmail(customer.email);
  customerValidation.mobile_phone_number = validateMobilePhoneNumber(customer.mobile_phone_number);

  customerPrimaryAddressValidation.address_line_1 = validateAddressLine1(customerPrimaryAddress.address_line_1);
  customerPrimaryAddressValidation.city = validateCity(customerPrimaryAddress.city);
  customerPrimaryAddressValidation.state = validateState(customerPrimaryAddress.state);
  customerPrimaryAddressValidation.zip_code = validateZipCode(customerPrimaryAddress.zip_code);
});

const validateCustomer = (customer: Customer) => {
  customerValidation.customer_number = validateCustomerNumber(customer.customer_number);
  customerValidation.first_name = validateFirstName(customer.first_name);
  customerValidation.last_name = validateLastName(customer.last_name);
  customerValidation.date_birth = validateDateOfBirth(customer.date_birth);
  customerValidation.ssn = validateSSN(customer.ssn);
  customerValidation.email = validateEmail(customer.email);
  customerValidation.mobile_phone_number = validateMobilePhoneNumber(customer.mobile_phone_number);

  customerPrimaryAddressValidation.address_line_1 = validateAddressLine1(customerPrimaryAddress.address_line_1);
  customerPrimaryAddressValidation.city = validateCity(customerPrimaryAddress.city);
  customerPrimaryAddressValidation.state = validateState(customerPrimaryAddress.state);
  customerPrimaryAddressValidation.zip_code = validateZipCode(customerPrimaryAddress.zip_code);

  const isCustomerValid = Object.values(customerValidation).every(value => value === true)
  const isPrimaryAddressValid = Object.values(customerPrimaryAddressValidation).every(value => value === true);

  return isCustomerValid && isPrimaryAddressValid;
}

const showCreatedCustomerToast = () => {
  // Customer Created Toast Notification
  const submitButton = document.getElementById("submit-button");
  const customerCreatedToast = document.getElementById("create-customer-toast");

  if (submitButton && customerCreatedToast) {
    const toastBootstrap = Toast.getOrCreateInstance(customerCreatedToast);
    toastBootstrap.show();
  }
}

const submitForm = async () => {
  formSubmitted.value = true;

  if (validateCustomer(customer)) {
    try {
      const res = await createCustomer(customer);
      // HTTP 201 Created status code
      if (res == 201) {
        showCreatedCustomerToast();
        router.push('/');
      }
    } catch (error) {
      console.log(error);
    }
  }
}
</script>

<style></style>

<template>
  <div>
    <h1 class="h3 p-2 text-center">Create Customer</h1>
    <div class="form-container">
      <form id="customer-form" class="p-2 row g-3 needs-validation" @submit.prevent="submitForm" novalidate>
        <div class="col-md-4">
          <label for="customerNumber" class="form-label">Customer Number</label>
          <input type="text" id="customerNumber" class="form-control"
            :class="{ 'is-valid': customerInputTouched.customer_number && customerValidation.customer_number, 'is-invalid': customerInputTouched.customer_number && !customerValidation.customer_number }"
            placeholder="99999" v-model="customer.customer_number"
            @input="customerInputTouched.customer_number = true; validateCustomerNumber(customer.customer_number);">
          <div class="invalid-feedback">
            Please enter a valid customer number (Must be 5 digits above 10000).
          </div>
        </div>
        <div class="col-md-4">
          <label for="firstName" class="form-label">First name</label>
          <input type="text" id="firstName" class="form-control"
            :class="{ 'is-valid': customerInputTouched.first_name && customerValidation.first_name, 'is-invalid': customerInputTouched.first_name && !customerValidation.first_name }"
            placeholder="John" v-model="customer.first_name"
            @input="customerInputTouched.first_name = true; validateFirstName(customer.first_name);">
          <div class="invalid-feedback">
            Please enter a valid first name.
          </div>
        </div>
        <div class="col-md-4">
          <label for="lastName" class="form-label">Last name</label>
          <input type="text" id="lastName" class="form-control"
            :class="{ 'is-valid': customerInputTouched.last_name && customerValidation.last_name, 'is-invalid': customerInputTouched.last_name && !customerValidation.last_name }"
            placeholder="Smith" v-model="customer.last_name"
            @input="customerInputTouched.last_name = true; validateLastName(customer.last_name);">
          <div class="invalid-feedback">
            Please enter a valid last name.
          </div>
        </div>
        <div class="col-md-4">
          <label for="dateOfBirth" class="form-label">Date of Birth</label>
          <div class="input-group has-validation">
            <input type="date" class="form-control" id="dateOfBirth"
              :class="{ 'is-valid': customerInputTouched.date_birth && customerValidation.date_birth, 'is-invalid': customerInputTouched.date_birth && !customerValidation.date_birth }"
              v-model="customer.date_birth"
              @input="customerInputTouched.date_birth = true; validateDateOfBirth(customer.date_birth);">
            <div class="invalid-feedback">
              Please enter a valid date of birth.
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <label for="socialSecurityNumber" class="form-label">Social Security Number</label>
          <input type="text" class="form-control" id="socialSecurityNumber"
            :class="{ 'is-valid': customerInputTouched.ssn && customerValidation.ssn, 'is-invalid': customerInputTouched.ssn && !customerValidation.ssn }"
            placeholder="xxx-xx-xxxx" v-model="customer.ssn" @input="customerInputTouched.ssn = true; validateSSN(customer.ssn);">
          <div class="invalid-feedback">
            Please enter a valid social security number.
          </div>
        </div>
        <div class="col-md-4">
          <label for="email" class="form-label">Email</label>
          <input type="text" class="form-control" id="email"
            :class="{ 'is-valid': customerInputTouched.email && customerValidation.email, 'is-invalid': customerInputTouched.email && !customerValidation.email }"
            placeholder="email@example.com" v-model="customer.email" @input="customerInputTouched.email = true; validateEmail(customer.email);">
          <div class="invalid-feedback">
            Please enter a valid date of email.
          </div>
        </div>
        <div class="col-md-3">
          <label for="address" class="form-label">Street Address</label>
          <input type="text" class="form-control" id="address"
            :class="{ 'is-valid': customerPrimaryAddressInputTouched.address_line_1 && customerPrimaryAddressValidation.address_line_1, 'is-invalid': customerPrimaryAddressInputTouched.address_line_1 && !customerPrimaryAddressValidation.address_line_1 }"
            placeholder="123 Rainbow Road" v-model="customerPrimaryAddress.address_line_1" @input="customerPrimaryAddressInputTouched.address_line_1 = true; validateAddressLine1(customerPrimaryAddress.address_line_1);">
          <div class="invalid-feedback">
            Please enter a valid address.
          </div>
        </div>
        <div class="col-md-3">
          <label for="city" class="form-label">City</label>
          <input type="text" id="city" class="form-control"
            :class="{ 'is-valid': customerPrimaryAddressInputTouched.city && customerPrimaryAddressValidation.city, 'is-invalid': customerPrimaryAddressInputTouched.city && !customerPrimaryAddressValidation.city }"
            v-model="customerPrimaryAddress.city"
            @input="customerPrimaryAddressInputTouched.city = true; validateCity(customerPrimaryAddress.city);">
          <div class="invalid-feedback">
            Please enter a valid city.
          </div>
        </div>
        <div class="col-md-3">
          <label for="state" class="form-label">State</label>
          <select id="state" class="form-select"
            :class="{ 'is-valid': customerPrimaryAddressInputTouched.state && customerPrimaryAddressValidation.state, 'is-invalid': customerPrimaryAddressInputTouched.state && !customerPrimaryAddressValidation.state }"
            v-model="customerPrimaryAddress.state" @input="customerPrimaryAddressInputTouched.state = true; validateState(customerPrimaryAddress.state);">
            <option selected disabled value="">Choose...</option>
            <option v-for="state in states" :key="state" :value="state">{{ state }}</option>
          </select>
          <div class="invalid-feedback">
            Please select a valid state.
          </div>
        </div>
        <div class="col-md-3">
          <label for="zip" class="form-label">Zip</label>
          <input type="text" class="form-control" id="zip"
            :class="{ 'is-valid': customerPrimaryAddressInputTouched.zip_code && customerPrimaryAddressValidation.zip_code, 'is-invalid': customerPrimaryAddressInputTouched.zip_code && !customerPrimaryAddressValidation.zip_code }"
            placeholder="00000" v-model="customerPrimaryAddress.zip_code" @input="customerPrimaryAddressInputTouched.zip_code = true; validateZipCode(customerPrimaryAddress.zip_code);">
          <div class="invalid-feedback">
            Please enter a valid zip.
          </div>
        </div>
        <div class="col-md-3">
          <label for="phone" class="form-label">Mobile Phone</label>
          <input type="text" class="form-control" id="phone"
            :class="{ 'is-valid': customerInputTouched.mobile_phone_number && customerValidation.mobile_phone_number, 'is-invalid': customerInputTouched.mobile_phone_number && !customerValidation.mobile_phone_number }"
            v-model="customer.mobile_phone_number" @input="customerInputTouched.mobile_phone_number = true; validateMobilePhoneNumber(customer.mobile_phone_number);">
          <div class="invalid-feedback">
            Please enter a valid phone number.
          </div>
        </div>
        <div class="col-12 mt-4">
          <button id="submit-button" class="btn btn-primary" type="submit">Create Customer</button>
        </div>
      </form>

      <div>
        <div id="create-customer-toast" class="toast align-items-center text-bg-success border-0 mx-auto" role="alert"
          aria-live="assertive" aria-atomic="true">
          <div class="d-flex">
            <div class="toast-body">
              New Customer Created!
            </div>
          <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"
            aria-label="Close"></button>
        </div>
      </div>
    </div>
  </div>
</div></template>
