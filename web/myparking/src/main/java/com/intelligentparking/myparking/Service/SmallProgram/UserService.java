package com.intelligentparking.myparking.Service.SmallProgram;

import com.intelligentparking.myparking.pojo.User;

public interface UserService {
    User checkMessage(String type,String message);

    void addUser(User user);

    void changeMSG(User user);

    void recharge(int id, int money);
}
