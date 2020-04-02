package com.intelligentparking.myparking.Controller.Web;

import com.intelligentparking.myparking.Service.SmallProgram.ParkingService;
import com.intelligentparking.myparking.model.ResponseStatus;
import com.intelligentparking.myparking.model.ResponseWrapper;
import com.intelligentparking.myparking.pojo.ParkingBook;
import com.intelligentparking.myparking.pojo.ParkingCar;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.List;

@RestController
@RequestMapping("web")
public class WebParkingController {

    @Resource(name = "parkingServiceImpl")
    private ParkingService parkingService;

    @RequestMapping(value = "getParkingCar",method = RequestMethod.GET)
    public ResponseWrapper<List<ParkingCar>> getParkingCar(){
        List<ParkingCar> list = parkingService.getAllParkingCar();
        return new ResponseWrapper<>(ResponseStatus.OK,list);
    }

    @RequestMapping(value = "getCurrentBook",method = RequestMethod.GET)
    public ResponseWrapper<List<ParkingBook>> getCurrentBook(){
        System.out.println("getCurrentBook");
        List<ParkingBook> list = parkingService.getCurrentBook();
        return new ResponseWrapper<>(ResponseStatus.OK,list);
    }

    @RequestMapping(value = "getWaitQueue",method = RequestMethod.GET)
    public ResponseWrapper<List<ParkingBook>> getWaitQueue(){
        System.out.println("getWaitQueue");
        List<ParkingBook> list = parkingService.getWaitQueue();
        return new ResponseWrapper<>(ResponseStatus.OK,list);
    }
}
