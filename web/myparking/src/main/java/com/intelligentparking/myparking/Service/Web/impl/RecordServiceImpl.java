package com.intelligentparking.myparking.Service.Web.impl;

import com.github.pagehelper.PageHelper;
import com.intelligentparking.myparking.DAO.RechargeDao;
import com.intelligentparking.myparking.Service.Web.RecordService;
import com.intelligentparking.myparking.pojo.ParkingRecord;
import com.intelligentparking.myparking.pojo.RechargeRecord;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.time.LocalDateTime;
import java.util.List;

@Service("WebRecordServiceImpl")
public class RecordServiceImpl implements RecordService {

    @Resource
    private RechargeDao rechargeDao;

    @Override
    public List<RechargeRecord> getRechargeRecord(int page, String username, String phone, String startTime, String endTime, String remark) {
        System.out.println(startTime);
        System.out.println(endTime);
        LocalDateTime[] time = getLocalDateTime(startTime,endTime);
        PageHelper.startPage(page, 10);
        List<RechargeRecord> list = rechargeDao.getRechargeRecord(username,phone,time[0],time[1],remark);
        return list;
    }


    @Override
    public int getCount(String startTime, String endTime, String remark) {
        LocalDateTime[] time = getLocalDateTime(startTime,endTime);
        return rechargeDao.getCount(time[0],time[1],remark);
    }


    @Override
    public List<ParkingRecord> getParkingRecord(int page, String startTime, String endTime) {
        LocalDateTime[] time = getLocalDateTime(startTime,endTime);
        PageHelper.startPage(page, 10);
        List<ParkingRecord> list = rechargeDao.getParkingRecord(time[0],time[1]);
        return list;
    }


    @Override
    public int getParkingCount(String startTime, String endTime) {
        LocalDateTime[] time = getLocalDateTime(startTime,endTime);
        return rechargeDao.getParkingCount(time[0],time[1]);
    }


    @Override
    public String deleteRechargeRecord(int id) {
        rechargeDao.deleteRechargeRecord(id);
        return "success";
    }

    private LocalDateTime[] getLocalDateTime(String startTime, String endTime){

        LocalDateTime[] time = new LocalDateTime[2];
        if(!startTime.equals("")){
            startTime = startTime.substring(0,23);
            endTime = endTime.substring(0,23);
            time[0] = LocalDateTime.parse(startTime).plusDays(1);
            time[1] = LocalDateTime.parse(endTime).plusDays(1);
        }
        return time;
    }
}
