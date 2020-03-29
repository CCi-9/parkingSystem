package com.intelligentparking.myparking.Controller.SmallProgram;

import com.intelligentparking.myparking.Service.SmallProgram.UserService;
import com.intelligentparking.myparking.Service.SmallProgram.impl.RecordServiceImpl;
import com.intelligentparking.myparking.model.ResponseStatus;
import com.intelligentparking.myparking.model.ResponseWrapper;
import com.intelligentparking.myparking.pojo.ParkingRecord;
import com.intelligentparking.myparking.pojo.RechargeRecord;
import com.intelligentparking.myparking.pojo.User;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;

@RequestMapping("smallProgram")
@RestController
public class UserController {

    @Resource(name = "userServiceImpl")
    private UserService userService;

    @Resource(name = "recordServiceImpl")
    private RecordServiceImpl recordService;

/*
    @RequestMapping(value = "getUser", method = RequestMethod.GET)
    public ResponseWrapper<User> getUser(@RequestParam String openid) {
        System.out.println("method getUser-openid:" + openid);
        User user = userService.checkMessage("openid", openid);
        System.out.println(user);
        return new ResponseWrapper<>(ResponseStatus.OK, userService.checkMessage("openid", openid));
    }
*/
@RequestMapping(value = "getUser", method = RequestMethod.GET)
public ResponseWrapper<User> getUser(@RequestParam String openid) {
    System.out.println("method getUser-openid:" + openid);
    User user = userService.checkMessage("openid", openid);
    System.out.println(user);
    return new ResponseWrapper<>(ResponseStatus.OK, userService.checkMessage("openid", openid));
}

    @RequestMapping(value = "addUser", method = RequestMethod.POST)
    @Transactional
    public ResponseWrapper<User> addUser(@RequestBody User user) {
        System.out.println(user);
        if (userService.checkMessage("phone", user.getPhone()) != null ) {
            return new ResponseWrapper<>(ResponseStatus.OK, "手机号已经存在");
        }
        userService.addUser(user);
        return new ResponseWrapper<>(ResponseStatus.OK, "添加成功",userService.checkMessage("phone", user.getPhone()));
    }

    @RequestMapping(value = "changeMSG", method = RequestMethod.POST)
    public ResponseWrapper<User> changeMSG(@RequestBody User user) {
        System.out.println(user);
        User existUser  = userService.checkMessage("phone", user.getPhone());
        if ((existUser != null)  && (existUser.getId() != user.getId())) {
            return new ResponseWrapper<>(ResponseStatus.OK, "手机号已经存在");
        }
        userService.changeMSG(user);
        return new ResponseWrapper<User>(ResponseStatus.OK, "修改成功");
    }

    @RequestMapping(value = "recharge", method = RequestMethod.POST)
    @Transactional
    public ResponseWrapper<User> recharge(@RequestParam int id, @RequestParam int money) {
        System.out.println("id ==========" + id);
        System.out.println("money ==========" + money);
        userService.recharge(id, money);
        recordService.addRechargeRecord(Double.valueOf(money), id);
        return new ResponseWrapper<User>(ResponseStatus.OK, "充值成功",userService.checkMessage("id", String.valueOf(id)));
    }

    @RequestMapping(value = "getRechargeRecord", method = RequestMethod.GET)
    @Transactional
    public ResponseWrapper<List<RechargeRecord>> getRechargeRecord(@RequestParam int id, @RequestParam char all) {
        System.out.println("id ==========" + id);
        System.out.println(all);

        return new ResponseWrapper<>(ResponseStatus.OK, recordService.getRechargeRecordByID(id,all));
    }
 /*
    @RequestMapping(value = "addUser", method = RequestMethod.POST)   //一个字段一个字段提交
    public ResponseWrapper<User> addUser(
            @RequestParam(value = "openid") String openid,
            @RequestParam(value = "username") String username,
            @RequestParam(value = "phone") String phone,
            @RequestParam(value = "sex") String sex
    ) {
        return new ResponseWrapper<>(ResponseStatus.OK, "添加成功");
    }
    */
}
