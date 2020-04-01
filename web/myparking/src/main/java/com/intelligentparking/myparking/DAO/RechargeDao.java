package com.intelligentparking.myparking.DAO;

import com.intelligentparking.myparking.pojo.ParkingRecord;
import com.intelligentparking.myparking.pojo.RechargeRecord;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;


import java.time.LocalDateTime;
import java.util.List;

public interface RechargeDao {

    void addRechargeRecord(@Param("fee") double fee, @Param("uid") int uid, @Param("remark") String remark);

    List<RechargeRecord> getRechargeRecordByID(@Param("uid") int uid, @Param("all") char all);

    @Delete("delete from rechargerecord where id = #{id}")
    void deleteRechargeRecord(int id);

    List<RechargeRecord> getRechargeRecord(
            @Param("username") String username,
            @Param("phone") String phone,
            @Param("beginTime") LocalDateTime beginTime,
            @Param("overTime") LocalDateTime overTime,
            @Param("remark") String remark);

    int getCount(LocalDateTime beginTime, LocalDateTime overTime, String remark);
    
    int getParkingCount(LocalDateTime beginTime, LocalDateTime overTime);

    List<ParkingRecord> getParkingRecord(LocalDateTime beginTime, LocalDateTime overTime);
}
