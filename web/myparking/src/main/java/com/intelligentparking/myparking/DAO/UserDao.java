package com.intelligentparking.myparking.DAO;

import com.intelligentparking.myparking.pojo.User;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

public interface UserDao {
    @Select("select * from user where ${type} = #{message}")
    User getUser(String type, String message);

    void addUser(User user);

    void changMsg(User user);

    void recharge(@Param("id") int id, @Param("money") double money);
}
