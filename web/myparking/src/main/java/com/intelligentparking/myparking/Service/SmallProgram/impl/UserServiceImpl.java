package com.intelligentparking.myparking.Service.SmallProgram.impl;

import com.intelligentparking.myparking.DAO.UserDao;
import com.intelligentparking.myparking.Service.SmallProgram.UserService;
import com.intelligentparking.myparking.pojo.User;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service("userServiceImpl")
public class UserServiceImpl implements UserService {

    @Resource
    private UserDao userDao;

    @Override
    public User checkMessage(String type, String message) {
        return userDao.getUser(type,message);
    }

    @Override
    public void addUser(User user) {
        userDao.addUser(user);
    }

    @Override
    public void changeMSG(User user) {
        userDao.changMsg(user);
    }

    @Override
    public void recharge(int id, int money) {
        userDao.recharge(id, Double.valueOf(money));
    }
}
