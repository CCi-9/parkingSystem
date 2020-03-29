package com.intelligentparking.myparking.Controller.SmallProgram;

import com.intelligentparking.myparking.Service.SmallProgram.CarService;
import com.intelligentparking.myparking.Service.SmallProgram.RecordService;
import com.intelligentparking.myparking.model.ResponseStatus;
import com.intelligentparking.myparking.model.ResponseWrapper;
import com.intelligentparking.myparking.pojo.Car;
import com.intelligentparking.myparking.pojo.ParkingRecord;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.List;

@RestController
@RequestMapping("smallProgram")
public class CarController {

    @Resource(name = "carServiceImpl")
    private CarService carService;

    @Resource(name = "recordServiceImpl")
    private RecordService recordServiceImpl;



    @RequestMapping(value = "getCarRecord",method = RequestMethod.GET)
    public ResponseWrapper<List<ParkingRecord>> getCarRecord(@RequestParam int id){
        return new ResponseWrapper<>(ResponseStatus.OK, recordServiceImpl.getParkingRecordById(id));
    }

    //下面三个是车牌操作
    @RequestMapping(value = "getCar",method = RequestMethod.GET)
    public ResponseWrapper<List<Car>> getCar(@RequestParam int id){
        return new ResponseWrapper<>(ResponseStatus.OK, carService.getCarById(id));
    }

    @RequestMapping(value = "addCar",method = RequestMethod.POST)
    public ResponseWrapper<Car> addCar(@RequestParam int id, @RequestParam String licence){
        carService.addCar(id,licence);
        return new ResponseWrapper<>(ResponseStatus.OK, "");
    }

    @RequestMapping(value = "changeCar",method = RequestMethod.POST)
    public ResponseWrapper<Car> changeCar(@RequestParam int id, @RequestParam String licence, @RequestParam String currentLicence){
        carService.changeCar(id,licence,currentLicence );
        return new ResponseWrapper<>(ResponseStatus.OK, "");
    }


}
