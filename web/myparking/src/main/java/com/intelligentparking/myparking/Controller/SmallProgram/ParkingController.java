package com.intelligentparking.myparking.Controller.SmallProgram;

import com.intelligentparking.myparking.Service.SmallProgram.ParkingService;
import com.intelligentparking.myparking.Service.SmallProgram.UserService;
import com.intelligentparking.myparking.model.ResponseStatus;
import com.intelligentparking.myparking.model.ResponseWrapper;
import com.intelligentparking.myparking.pojo.Car;
import com.intelligentparking.myparking.pojo.User;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.HashMap;

@RestController
@RequestMapping("smallProgram")
public class ParkingController {
    @Resource(name = "parkingServiceImpl")
    private ParkingService parkingService;

    @Resource(name = "userServiceImpl")
    private UserService userService;

    @RequestMapping(value = "reservedParking",method = RequestMethod.POST)
    public ResponseWrapper<User> reservedParking(@RequestParam int id, @RequestParam String phone, @RequestParam double fee){
        System.out.println("reservedParking:" + fee);
        String result = parkingService.reservedParking(id,phone, fee);
        return new ResponseWrapper<>(ResponseStatus.OK,result,userService.checkMessage("id",String.valueOf(id)));
    }

    @RequestMapping(value = "getParkingCount",method = RequestMethod.GET)
    public ResponseWrapper<Integer> getParkingCount(){
        System.out.println("getParkingCount");
        return new ResponseWrapper<>(ResponseStatus.OK,"success",parkingService.getParkingCount());
    }

    @RequestMapping(value = "parking",method = RequestMethod.POST)
    public ResponseWrapper<Integer> parking(@RequestParam String licence){
        parkingService.parking(licence);
        return null;
    }



}
