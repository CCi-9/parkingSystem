package com.intelligentparking.myparking.DAO;

import org.apache.ibatis.annotations.Param;

import java.time.LocalDateTime;

public interface ParkingRecordDao {
    void addParkingRecord(
            @Param("carLicence") String carLicence, @Param("startTime")LocalDateTime startTime,
            @Param("endTime") LocalDateTime endTime, @Param("fee") double fee, @Param("uid") String id
    );
}
