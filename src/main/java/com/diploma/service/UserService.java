package com.diploma.service;

import com.diploma.model.User;

import java.util.List;

public interface UserService {
    User getFullUser(User incompleteUser);

    List<User> getAllUsers();
}
