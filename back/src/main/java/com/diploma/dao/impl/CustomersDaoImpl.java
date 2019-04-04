package com.diploma.dao.impl;

import com.diploma.dao.CustomersDao;
import com.diploma.model.Customer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BatchPreparedStatementSetter;
import org.springframework.jdbc.core.support.JdbcDaoSupport;
import org.springframework.stereotype.Repository;

import javax.annotation.PostConstruct;
import javax.sql.DataSource;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Repository
public class CustomersDaoImpl extends JdbcDaoSupport implements CustomersDao {
    @Autowired
    DataSource dataSource;

    @PostConstruct
    private void initialize() {
        setDataSource(dataSource);
    }

    @Override
    public void insertBatch(List<Customer> customers) {
        String sql = "INSERT INTO \"testTable\" " + "(id, name) responseHeaders VALUES (?, ?)";
        getJdbcTemplate().batchUpdate(sql, new BatchPreparedStatementSetter() {
            public void setValues(PreparedStatement ps, int i) throws SQLException {
                Customer customer = customers.get(i);
                ps.setLong(1, customer.getCustomerId());
                ps.setString(2, customer.getName());
            }

            public int getBatchSize() {
                return customers.size();
            }
        });
    }

    public List<Customer> loadAllCustomer() {
        String sql = "SELECT * FROM \"testTable\";";
        List<Map<String, Object>> rows = getJdbcTemplate().queryForList(sql);

        List<Customer> result = new ArrayList<Customer>();

        for (Map<String, Object> row : rows) {
            Customer customer = new Customer();
            customer.setCustomerId((Integer) row.get("id"));
            customer.setName((String) row.get("name"));
            result.add(customer);
        }

        return result;
    }

    @Override
    public int getTotalNumberCustomer() {
        String sql = "SELECT Count(*) FROM customer";

        return getJdbcTemplate().queryForObject(sql, Integer.class);
    }
}

