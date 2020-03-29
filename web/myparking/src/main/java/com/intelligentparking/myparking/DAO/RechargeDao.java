package com.intelligentparking.myparking.DAO;

import com.intelligentparking.myparking.pojo.RechargeRecord;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface RechargeDao {

    void addRechargeRecord(@Param("fee") double fee, @Param("uid") int uid);

    List<RechargeRecord> getRechargeRecordByID(@Param("uid") int uid, @Param("all") char all);
}
