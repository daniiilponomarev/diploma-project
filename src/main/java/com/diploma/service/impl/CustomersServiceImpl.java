package com.diploma.service.impl;

import com.diploma.dao.CustomersDao;
import com.diploma.model.Customer;
import com.diploma.service.CustomersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class CustomersServiceImpl implements CustomersService {
    @Autowired
    private CustomersDao customersDao;

    @Override
    public void insertBatch(List<Customer> customers) {
        customersDao.insertBatch(customers);
    }

    public List<Customer> loadAllCustomer() {
        List<Customer> customerList = customersDao.loadAllCustomer();
        for (Customer customer : customerList) {
            System.out.println(customer.toString());
        }

        return customerList;
    }

    @Override
    public int getTotalNumberCustomer() {
        int totalNumberCustomer = customersDao.getTotalNumberCustomer();
        System.out.println("Total Number Customer is: " + totalNumberCustomer);

        return totalNumberCustomer;
    }
}
