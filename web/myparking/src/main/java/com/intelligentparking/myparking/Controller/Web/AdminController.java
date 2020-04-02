package com.intelligentparking.myparking.Controller.Web;

import com.intelligentparking.myparking.DAO.ParkingRecordDao;
import com.intelligentparking.myparking.Service.Web.AdminService;
import com.intelligentparking.myparking.model.ResponseStatus;
import com.intelligentparking.myparking.model.ResponseWrapper;
import com.intelligentparking.myparking.pojo.Admin;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.time.LocalDateTime;
import java.time.ZoneId;

@RequestMapping("web")
@RestController
public class AdminController {

    @Resource(name = "adminServiceImpl")
    private AdminService adminService;
@Resource
private ParkingRecordDao parkingRecordDao;

    @RequestMapping(value = "hello")
    public ResponseWrapper<String> hello(){
        LocalDateTime startTime = LocalDateTime.now();
        LocalDateTime endTime = startTime.plusDays(1);
        System.out.println("s:" + startTime);
        System.out.println("w:" + endTime);
        parkingRecordDao.addParkingRecord("1231",startTime,endTime,3.0,String.valueOf(6));
        System.out.println("123132");
        return new ResponseWrapper<>(ResponseStatus.OK,"result");
    }

    @RequestMapping(value = "login",method = RequestMethod.POST)
    public ResponseWrapper<Admin> login(@RequestBody Admin admin){
        String result = adminService.getUser(admin);
        return new ResponseWrapper<Admin>(ResponseStatus.OK,result);
    }
}
