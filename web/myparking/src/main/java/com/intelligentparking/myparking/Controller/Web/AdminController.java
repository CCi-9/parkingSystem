package com.intelligentparking.myparking.Controller.Web;

import com.intelligentparking.myparking.Service.Web.AdminService;
import com.intelligentparking.myparking.model.ResponseStatus;
import com.intelligentparking.myparking.model.ResponseWrapper;
import com.intelligentparking.myparking.pojo.Admin;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

@RequestMapping("web")
@RestController
public class AdminController {

    @Resource(name = "adminServiceImpl")
    private AdminService adminService;

    @RequestMapping(value = "hello",method = RequestMethod.POST)
    public String hell(){
        System.out.println("123132");
        return null;
    }

    @RequestMapping(value = "login",method = RequestMethod.POST)
    public ResponseWrapper<Admin> login(@RequestBody Admin admin){
        String result = adminService.getUser(admin);
        return new ResponseWrapper<Admin>(ResponseStatus.OK,result);
    }
}
