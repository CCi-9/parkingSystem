package com.intelligentparking.myparking.DAO;

import com.intelligentparking.myparking.pojo.Admin;
import org.apache.ibatis.annotations.Select;

public interface AdminDao {
    @Select("select * from admin")
    Admin getUser(String username);
}
