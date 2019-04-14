package com.diploma.controller;

import com.diploma.model.Customer;
import com.diploma.service.CustomersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.annotation.PostConstruct;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(value = "/customers/*")
public class CustomersController {
    @Autowired
    private CustomersService customersService;

    Map<Integer, Customer> customerHashMap = new HashMap<Integer, Customer>();

    @PostConstruct
    public void initIt() throws Exception {
//        Customer cust1 = new Customer(1, "Jack");
//        Customer cust2 = new Customer(2, "Peter");
//
//        customerHashMap.put(cust1.getCustomerId(), cust1);
//        customerHashMap.put(cust2.getCustomerId(), cust2);
    }

    @GetMapping("/get")
    public ResponseEntity<List<Customer>> getMethod() {
        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.set("Access-Control-Allow-Origin", "*");

        return ResponseEntity.ok()
                .headers(responseHeaders)
                .body(customersService.loadAllCustomer());
    }

    @PostMapping("/post")
    public void postMethod(@RequestBody List<Customer> customers) {
        customersService.insertBatch(customers);
    }
}
