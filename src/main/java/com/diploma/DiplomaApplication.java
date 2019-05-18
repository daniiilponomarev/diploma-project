package com.diploma;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;

@SpringBootApplication
public class DiplomaApplication {

    public static void main(String[] args) {
        SpringApplication.run(DiplomaApplication.class, args);
    }

    @Configuration
    public class WebConfiguration extends WebMvcConfigurerAdapter {

        @Override
        public void addViewControllers(ViewControllerRegistry registry) {
            registry.addViewController("/{spring:\\w+}")
                    .setViewName("forward:/");
            registry.addViewController("/**/{spring:\\w+}")
                    .setViewName("forward:/");
            registry.addViewController("/{spring:\\w+}/**{spring:?!(\\.js|\\.css)$}")
                    .setViewName("forward:/");
        }
    }
}
