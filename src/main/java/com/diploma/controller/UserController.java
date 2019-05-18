package com.diploma.controller;

import com.diploma.model.User;
import com.diploma.service.UserService;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletRequest;

@Controller
@RequestMapping(value = "/api/user/*")
public class UserController {
    private static final Logger logger = LogManager.getRootLogger();

    @Autowired
    private UserService userService;

    @RequestMapping(value = "/login", method = RequestMethod.POST)
//	@GetMapping("/get")
    public ResponseEntity<User> login(@Validated User user, HttpServletRequest request) {
        logger.info("User {} tries to login", user);
        User registeredUser = userService.getFullUser(user);

        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.set("Access-Control-Allow-Origin", "*");

        if (registeredUser != null) {
            logger.info("Successful login");
            request.getSession().setAttribute("user", registeredUser);

            return ResponseEntity.ok()
                    .headers(responseHeaders)
                    .body((User) request.getSession().getAttribute("user"));
        } else {
            logger.info("Login error");
            return ResponseEntity.ok()
                    .headers(responseHeaders)
                    .body((User) new User());
        }
    }
}