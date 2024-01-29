import type { Customer } from "@/types/Customer";
import axios from "axios";

const customerApiBaseUrl: string = "https://my.api.mockaroo.com/customers.json?key=03c46990";

/**
* Get up to 100 Customers data
* 
* @param amountOfCustomers
*/
export const getCustomers = async (amountOfCustomers: number = 0): Promise<Customer[]> => {
    let apiUrl: string = customerApiBaseUrl;

    if (amountOfCustomers > 0) {
        apiUrl += "&size=" + amountOfCustomers;
    }

    const res = await axios.get<Customer[]>(apiUrl);

    return res.data;
};

/**
* Create a Customer
*
* @param customer customer to create
*/
export const createCustomer = async (customer: Customer) => {

    const res = await axios.post(customerApiBaseUrl, customer);

    return res.data;
};
