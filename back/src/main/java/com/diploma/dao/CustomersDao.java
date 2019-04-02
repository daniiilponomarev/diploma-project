package com.diploma.dao;

import com.diploma.model.Customer;

import java.util.List;

public interface CustomersDao {
    void insertBatch(List<Customer> customers);

    List<Customer> loadAllCustomer();

    int getTotalNumberCustomer();
}
