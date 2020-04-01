package com.intelligentparking.myparking.Service.Web.impl;

import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.intelligentparking.myparking.DAO.UserDao;
import com.intelligentparking.myparking.Service.Web.UserService;
import com.intelligentparking.myparking.pojo.User;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service("webUserServiceImpl")
public class UserServiceImpl implements UserService {

    @Resource
    private UserDao userDao;

    @Override
    public List<User> getUserByPage(int page) {
        PageHelper.startPage(page, 4);
        List<User> list = userDao.getUserByPage(page);
        return list;
    }

    @Override
    public String deleteUser(int id) {
        userDao.deleteUser(id);
        return "删除成功";
    }
}
