package com.diploma.model;

public class Customer {
    private static final long serialVersionUID = 1L;
    int id;
    String name;

    public Customer() {
    }

    public Customer(int id, String name) {
        this.id = id;
        this.name = name;
    }

    public int getCustId() {
        return id;
    }

    public void setCustId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "Customer [id=" + id + ", name=" + name + "]";
    }
}


//package com.diploma.model;
//
//public class Customer {
//    private static final long serialVersionUID = 1L;
//    long custId;
//    String name;
//    int age;
//
//    public Customer() {
//    }
//
//    public Customer(long custId, String name, int age) {
//        this.custId = custId;
//        this.name = name;
//        this.age = age;
//    }
//
//    public long getCustId() {
//        return custId;
//    }
//
//    public void setCustId(long custId) {
//        this.custId = custId;
//    }
//
//    public String getName() {
//        return name;
//    }
//
//    public void setName(String name) {
//        this.name = name;
//    }
//
//    public int getAge() {
//        return age;
//    }
//
//    public void setAge(int age) {
//        this.age = age;
//    }
//
//    @Override
//    public String toString() {
//        return "Customer [age=" + age + ", custId=" + custId + ", name=" + name
//                + "]";
//    }
//}