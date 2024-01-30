// Define a type for the primary address object
export type PrimaryAddress = {
    address_line_1: string;
    city: string;
    state: string;
    zip_code: string;
  };
  
  // Define a type for the customer object
  export type Customer = {
    customer_number: number;
    first_name: string;
    last_name: string;
    date_birth: string; // Or Date if you want to convert the string to a Date object
    ssn: string;
    email: string;
    primary_address: PrimaryAddress;
    mobile_phone_number: string;
    join_date: string; // Or Date if you want to convert the string to a Date object
  };
