<script setup lang="ts">
import { ref, reactive, onMounted, nextTick, watch } from 'vue';
import { Popover } from 'bootstrap';
import DataTable from 'datatables.net-bs5';

import type { Customer } from '@/types/Customer';
import { getCustomers } from '@/services/customerService';
import { calculateAge } from '@/utilities/index';

const customers = reactive<Customer[]>([]);
const isDataFetched = ref(false);

// Get Customers
const fetchCustomers = async () => {
  try {
    const fetchedCustomers = await getCustomers();
    customers.push(...fetchedCustomers);
    isDataFetched.value = true;
  } catch (error) {
    console.error('Error fetching customers:', error);
  }
};

fetchCustomers();

const initializeUIComponents = () => {
  // Ensure DOM is fully loaded
  nextTick(() => {
    // Initialize Popover & allow popovers to be dismissed when focus is lost after DOM is updated from api request
    const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
    const popoverList = [...popoverTriggerList].map(popoverTriggerEl =>
      new Popover(popoverTriggerEl, {
        trigger: "focus",
        html: true
      })
    );

    // Initialize DataTable, simple pagingType (pagination) for mobile responsiveness
    new DataTable("#customer-table", {
      pagingType: "simple"
    });
  });
}

const getPopoverContent = (customer: Customer) => {
  const formattedAddress = `${customer.primary_address.address_line_1}, ${customer.primary_address.city}, ${customer.primary_address.state} ${customer.primary_address.zip_code}`

  const popoverContent = `
    <p><span class="fw-bold">Email:</span> ${customer.email ? customer.email : "N/A"}</p>
    <p><span class="fw-bold">Primary Address:</span> ${formattedAddress ? formattedAddress : "N/A"}</p>
    <p><span class="fw-bold">Mobile Phone:</span> ${customer.mobile_phone_number ? customer.mobile_phone_number : "N/A"}</p>
    <p><span class="fw-bold">Join Date:</span> ${customer.join_date ? customer.join_date : "N/A"}</p>
  `;

  return popoverContent;
};

onMounted(() => {
  // If data is fetched load UI, if not wait for it and then load UI
  if (isDataFetched.value) {
    initializeUIComponents();
  }

  watch(isDataFetched, (newValue) => {
    if (newValue) {
      initializeUIComponents();
    }
  });
});
</script>

<style>
@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

.fade-in {
  animation: fadeIn 0.5s ease-in-out;
}

.loading-container {
  height: calc(100vh - 56px);
}

#customer-table_wrapper {
  width: 95%;
  margin: auto;
}

#customer-table_wrapper .col-sm-12 {
  padding-left: 0;
  padding-right: 0;
}

.dataTables_length,
.dataTables_info,
.dataTables_filter,
.dataTables_paginate {
  margin: 1rem !important;
}

/* DataTable is scrollable for responsiveness */
.col-sm-12:has(#customer-table) {
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
  overflow-x: auto;
}

.popover-header {
  text-align: center;
}
</style>

<template>
  <div>
    <h1 class="h3 p-2 text-center">View Customers</h1>
    <div v-if="customers.length > 0" class="table-container my-3">
      <table id="customer-table" class="table table-striped table-hover fade-in my-3">
        <thead>
          <tr>
            <th>Customer #</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Date of Birth</th>
            <th>Last 4 SSN</th>
            <th>Age</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="customer in customers" :key="customer.customer_number">
            <td>{{ customer.customer_number }}</td>
            <td>{{ customer.first_name }}</td>
            <td>{{ customer.last_name }}</td>
            <td>{{ customer.date_birth }}</td>
            <td>{{ customer.ssn != null ? customer.ssn.slice(-4) : "N/A" }}</td>
            <td>{{ calculateAge(customer.date_birth) }}</td>
            <td>
              <a tabindex="0" class="btn btn-sm btn-primary text-white" role="button" data-bs-toggle="popover"
                data-bs-trigger="focus" data-bs-title="Additional Details"
                :data-bs-content="getPopoverContent(customer)">Details</a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else class="d-flex justify-content-center align-items-center loading-container">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  </div>
</template>
