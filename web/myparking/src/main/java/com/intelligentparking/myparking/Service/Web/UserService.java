package com.intelligentparking.myparking.Service.Web;

import com.intelligentparking.myparking.pojo.User;

import java.util.List;

public interface UserService {

    List<User> getUserByPage(int page);

    String deleteUser(int id);
}
