package com.intelligentparking.myparking.Service.Web.impl;

import com.intelligentparking.myparking.DAO.AdminDao;
import com.intelligentparking.myparking.Service.Web.AdminService;
import com.intelligentparking.myparking.pojo.Admin;
import com.intelligentparking.myparking.utils.Configuration.DesUtil;
import org.springframework.stereotype.Service;


import javax.annotation.Resource;

@Service("adminServiceImpl")
public class AdminServiceImpl implements AdminService {

    @Resource
    private AdminDao adminDao;

//    private Jedis jedis = new Jedis("localhost",6379);

    @Override
    public String getUser(Admin admin) {
        Admin admin1 = adminDao.getUser(admin.getUsername());
        if (admin1 == null) {
            return "用户不存在";
        }
        byte[] password = null;
        System.out.println(admin1.getPassword());
        try {
            password = DesUtil.encrypt(admin.getPassword().getBytes());
            if (!new String(password).equals(admin1.getPassword())) {
                return "密码错误";
            }
        } catch (Exception e) {
            e.printStackTrace();
            return "fail";
        }
        /*
            jedis.append("password",admin1.getPassword());
            jedis.close();
        */
        return "success";
    }
}
