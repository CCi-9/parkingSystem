package com.intelligentparking.myparking.Controller.Web;

import com.intelligentparking.myparking.Service.Web.RecordService;
import com.intelligentparking.myparking.model.ResponseStatus;
import com.intelligentparking.myparking.model.ResponseWrapper;
import com.intelligentparking.myparking.pojo.ParkingRecord;
import com.intelligentparking.myparking.pojo.RechargeRecord;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.util.List;

@RestController
@RequestMapping("web")
public class WebRecordController {

    @Resource(name = "WebRecordServiceImpl")
    private RecordService recordService;

    //订单记录
    @RequestMapping("getRechargeRecord")
    public ResponseWrapper<List<RechargeRecord>> getRechargeRecord(
            @RequestParam int page,
            String username, String phone, String startTime,String endTime, String remark){

        List<RechargeRecord> list = recordService.getRechargeRecord(page,username,phone,startTime,endTime,remark);
        int count = recordService.getCount(startTime,endTime,remark);
        return new ResponseWrapper<>(ResponseStatus.OK, String.valueOf(count), list);
    }


    //停车记录
    @RequestMapping("getParkingRecord")
    public ResponseWrapper<List<ParkingRecord>> getParkingRecord(
            @RequestParam int page,
            String startTime,String endTime, String remark){

        List<ParkingRecord> list = recordService.getParkingRecord(page,startTime,endTime);
        int count = recordService.getParkingCount(startTime,endTime);
        return new ResponseWrapper<>(ResponseStatus.OK, String.valueOf(count), list);
    }

    @RequestMapping(value = "deleteRechargeRecord",method = RequestMethod.POST)
    public ResponseWrapper<String> deleteRechargeRecord(@RequestParam int id){
        System.out.println("delete id:"+id);
        String result = recordService.deleteRechargeRecord(id);
        return new ResponseWrapper<>(ResponseStatus.OK,result);
    }
}
