package com.intelligentparking.myparking.Controller.SmallProgram;

import com.intelligentparking.myparking.model.ResponseStatus;
import com.intelligentparking.myparking.model.ResponseWrapper;
import com.intelligentparking.myparking.pojo.User;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@RequestMapping("smallProgram")
@RestController
public class IndexController {
    private int i = 50;
    @RequestMapping("hello")
    public int hello(){
        System.out.println("i = " + i);
        return i--;
    }

}
