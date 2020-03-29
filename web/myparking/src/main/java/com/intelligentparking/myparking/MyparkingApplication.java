package com.intelligentparking.myparking;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@MapperScan("com.intelligentparking.myparking.DAO")
@EnableScheduling
public class MyparkingApplication {

    public static void main(String[] args) {
        SpringApplication.run(MyparkingApplication.class, args);
    }

}
