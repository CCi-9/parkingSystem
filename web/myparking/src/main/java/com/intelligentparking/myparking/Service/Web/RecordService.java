package com.intelligentparking.myparking.Service.Web;

import com.intelligentparking.myparking.pojo.ParkingRecord;
import com.intelligentparking.myparking.pojo.RechargeRecord;

import java.util.List;

public interface RecordService {
    String deleteRechargeRecord(int id);

    int getCount(String startTime, String endTime, String remark) ;

    List<RechargeRecord> getRechargeRecord(int page, String username, String phone, String startTime, String endTime, String remark);

    List<ParkingRecord> getParkingRecord(int page,String startTime, String endTime);

    /**
     * 用于获取停车记录
     * @param startTime  开始时间
     * @param endTime   结束时间
     * @return  总记录数
     */
    int getParkingCount(String startTime, String endTime) ;
}
