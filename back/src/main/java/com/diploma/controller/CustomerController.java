package com.diploma.controller;

import javax.servlet.http.HttpServletRequest;

import javax.annotation.PostConstruct;

//import org.apache.logging.log4j.LogManager;
//import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.diploma.service.CustomerService;
import com.diploma.model.Customer;

import java.util.ArrayList;
import java.util.List;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

@RestController
@RequestMapping(value = "/customers/*")
public class CustomerController {
    @Autowired
    private CustomerService customerService;

    Map<Integer, Customer> custStores = new HashMap<Integer, Customer>();

    @PostConstruct
    public void initIt() throws Exception {
        Customer cust1 = new Customer(1, "Jack");
        Customer cust2 = new Customer(2, "Peter");

        custStores.put(cust1.getCustId(), cust1);
        custStores.put(cust2.getCustId(), cust2);
    }

    @GetMapping("/get")
    public List<Customer> getMethod(@RequestParam("id") int id) {
//        return custStores.get(id);
        return customerService.loadAllCustomer();
    }

    @RequestMapping(value = "/hmmm", method = RequestMethod.GET)
    public String getCustomers(HttpServletRequest request, Model model) {
//        /*
//         * Create Customer
//         */
//        Random r = new Random();
//
//        // Customer 1
//        Customer cus_1 = new Customer();
//        Long cus_1_id = r.nextLong();
//        cus_1.setCustId(cus_1_id);
//        cus_1.setName("demoCustomer_1");
//        cus_1.setAge(30);
//
//        // Customer 2
//        Customer cus_2 = new Customer();
//        Long cus_2_id = r.nextLong();
//        cus_2.setCustId(cus_2_id);
//        cus_2.setName("demoCustomer_2");
//        cus_2.setAge(30);
//
//        // Customer 3
//        Customer cus_3 = new Customer();
//        Long cus_3_id = r.nextLong();
//        cus_3.setCustId(cus_3_id);
//        cus_3.setName("demoCustomer_2");
//        cus_3.setAge(30);
//
//        // Insert a customer to DB
//        customerService.insert(cus_1);
//
//        // Insert a List of Customer to DB
//        List<Customer> customers = new ArrayList<Customer>();
//        customers.add(cus_2);
//        customers.add(cus_3);
//        customerService.insertBatch(customers);
//        // Load All Customer and display
//        customerService.loadAllCustomer();
//
//        // Get Customer By Id
//        System.out.println("=============Get Customer By Id");
//        customerService.getCustomerById(Long.valueOf(cus_1_id));
//
//        // Get Customer's name by Id
//        System.out.println("=============Get Customer Name by Id");
//        customerService.getCustomerNameById(cus_2_id);
//
//        // Get Total Customers in DB
//        System.out.println("=============Get Total Number Customer");
//        customerService.getTotalNumerCustomer();

        // Load All Customer and display
        customerService.loadAllCustomer();
        System.out.println("#######################################");
        System.out.println("Done!!!");
        System.out.println("#######################################");

        return "0";
    }

    @RequestMapping(value = "/add", method = RequestMethod.POST)
    public String addItem(@Validated Customer customer) {
//        customerService.addItem(customer);
//        logger.info("Item {} was added", customer);
        return "redirect:/items/";
    }
}
