package com.intelligentparking.myparking.Controller.SmallProgram;

import com.intelligentparking.myparking.Service.SmallProgram.ParkingService;
import com.intelligentparking.myparking.Service.SmallProgram.UserService;
import com.intelligentparking.myparking.model.ResponseStatus;
import com.intelligentparking.myparking.model.ResponseWrapper;
import com.intelligentparking.myparking.pojo.User;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;


@RestController
@RequestMapping("smallProgram")
public class ParkingController {
    @Resource(name = "parkingServiceImpl")
    private ParkingService parkingService;

    @Resource(name = "userServiceImpl")
    private UserService userService;

    @RequestMapping(value = "reservedParking",method = RequestMethod.POST)  //预定车位
    public ResponseWrapper<User> reservedParking(@RequestParam int id, @RequestParam String phone, @RequestParam double fee){
        System.out.println("reservedParking:" + fee);
        String result = parkingService.reservedParking(id,phone, fee);
        return new ResponseWrapper<>(ResponseStatus.OK,result,userService.checkMessage("id",String.valueOf(id)));
    }

    @RequestMapping(value = "getParkingCount",method = RequestMethod.GET)  //获得当前车位剩余数量
    public ResponseWrapper<Integer> getParkingCount(){
        System.out.println("getParkingCount");
        return new ResponseWrapper<>(ResponseStatus.OK,"success",parkingService.getParkingCount());
    }

    @RequestMapping(value = "parking",method = RequestMethod.GET) //停车
    public ResponseWrapper<Integer> parking(@RequestParam String licence){
        parkingService.parking(licence);
        return null;
    }

    @RequestMapping(value = "getParkingCar",method = RequestMethod.GET)  //获取当前正在停的车
    public ResponseWrapper<String> getParkingCar(@RequestParam String phone){
        String licence = parkingService.getParkingCar(phone);
        if(licence ==null) {
            return new ResponseWrapper<String>(ResponseStatus.OK,"success","无");
        }
        return new ResponseWrapper<String>(ResponseStatus.OK,"success",licence);
    }

    @RequestMapping(value = "timeExpand",method = RequestMethod.POST)  //停车延时
    public ResponseWrapper<User> timeExpand(@RequestParam int id, @RequestParam String phone, @RequestParam double fee){
        System.out.println(id);
        System.out.println(phone);
        System.out.println(fee);
        parkingService.timeExpand(id, phone, fee);
        return new ResponseWrapper<>(ResponseStatus.OK,"success",userService.checkMessage("id",String.valueOf(id)));
    }


}
