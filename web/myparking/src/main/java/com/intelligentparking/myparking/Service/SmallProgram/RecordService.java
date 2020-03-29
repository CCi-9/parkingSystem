package com.intelligentparking.myparking.Service.SmallProgram;

import com.intelligentparking.myparking.pojo.ParkingRecord;
import com.intelligentparking.myparking.pojo.RechargeRecord;

import java.util.List;

public interface RecordService {
    List<ParkingRecord> getParkingRecordById(int id);
    List<RechargeRecord> getRechargeRecordByID(int id, char all);

    void addRechargeRecord(double fee, int id);

}
