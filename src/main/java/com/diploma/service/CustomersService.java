package com.diploma.service;

import com.diploma.model.Customer;

import java.util.List;

public interface CustomersService {
	void insertBatch(List<Customer> customers);
	List<Customer> loadAllCustomer();
	int getTotalNumberCustomer();
}
