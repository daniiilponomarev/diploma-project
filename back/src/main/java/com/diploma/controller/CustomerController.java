package com.diploma.controller;

import javax.servlet.http.HttpServletRequest;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
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
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpHeaders;

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
    public ResponseEntity<List<Customer>> getMethod(@RequestParam("id") int id) {
//        return custStores.get(id);
//        return customerService.loadAllCustomer();
        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.set("Access-Control-Allow-Origin", "*");

//        return custStores.get(custId);

        return ResponseEntity.ok()
                .headers(responseHeaders)
                .body(customerService.loadAllCustomer());
    }

    @GetMapping("/get-all")
    public ResponseEntity<List<Customer>> getAllMethod() {
        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.set("Access-Control-Allow-Origin", "*");

        return ResponseEntity.ok()
                .headers(responseHeaders)
                .body(customerService.loadAllCustomer());
    }

    @PostMapping("/post")
    public Customer postMethod(@RequestBody Customer customer) {
        Random r = new Random();
        customer.setCustId(r.nextInt());

        // POST processing
        custStores.put(customer.getCustId(), customer);

        // Log out custStores after POST
        System.out.println("Customer Stores after POST:");
        custStores.forEach((custId, cust) -> System.out.println(cust.toString()));

        return customer;
    }

    @PutMapping("/put/{id}")
    public Customer putMethod(@PathVariable int id, @RequestBody Customer customer) {
        // PUT processing
        try {
            custStores.remove(id);
            customer.setCustId(id);
            custStores.put(id, customer);
        } catch (Exception e) {
            System.out.println(e.getStackTrace());
            return null;
        }

        // Log out custStores after PUT
        System.out.println("Customer Stores after PUT");
        custStores.forEach((custId, cust) -> System.out.println(cust.toString()));

        return customer;
    }

    @DeleteMapping("/delete/{id}")
    public String deleteMethod(@PathVariable int id) {
        try {
            // DELETE processing
            custStores.remove(id);
        } catch (Exception e) {
            return "Error";
        }

        // Log out custStores after DELETE
        System.out.println("Customer Stores after DELETE");
        custStores.forEach((custId, cust) -> System.out.println(cust.toString()));

        return "Done";
    }
}
