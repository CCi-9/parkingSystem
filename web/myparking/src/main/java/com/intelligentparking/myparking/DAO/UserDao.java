package com.intelligentparking.myparking.DAO;

import com.intelligentparking.myparking.pojo.User;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

public interface UserDao {
    @Select("select * from user where ${type} = #{message}")
    User getUser(String type, String message);

    void addUser(User user);

    void changMsg(User user);

    void recharge(@Param("id") int id, @Param("money") double money);

    List<User> getUserByPage(int page);

    @Delete("delete from user where id = #{id}")
    void deleteUser(int id);
}
