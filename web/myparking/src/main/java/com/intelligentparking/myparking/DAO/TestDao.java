package com.intelligentparking.myparking.DAO;

import com.intelligentparking.myparking.pojo.Admin;
import org.apache.ibatis.annotations.Select;


public interface TestDao {
    @Select("select * from admin")
    public Admin getAdmin();
}
