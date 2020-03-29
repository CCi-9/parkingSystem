package com.intelligentparking.myparking.Service.SmallProgram.impl;

import com.intelligentparking.myparking.DAO.CarDao;

import com.intelligentparking.myparking.DAO.RechargeDao;
import com.intelligentparking.myparking.Service.SmallProgram.RecordService;
import com.intelligentparking.myparking.pojo.Car;
import com.intelligentparking.myparking.pojo.ParkingRecord;
import com.intelligentparking.myparking.pojo.RechargeRecord;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service("recordServiceImpl")
public class RecordServiceImpl implements RecordService {
    @Resource
    private CarDao carDao;

    @Resource
    private RechargeDao rechargeDao;

    @Override
    public List<ParkingRecord> getParkingRecordById(int id){
        return carDao.getParkingRecordById(id);
    }


    public List<RechargeRecord> getRechargeRecordByID(int id,char all) {
        return rechargeDao.getRechargeRecordByID(id, all);
    }

    public void addRechargeRecord(double fee, int id){
        rechargeDao.addRechargeRecord(fee,id);
    }
}
