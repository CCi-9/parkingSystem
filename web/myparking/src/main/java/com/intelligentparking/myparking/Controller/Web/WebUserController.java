package com.intelligentparking.myparking.Controller.Web;

import com.intelligentparking.myparking.Service.Web.UserService;
import com.intelligentparking.myparking.model.ResponseStatus;
import com.intelligentparking.myparking.model.ResponseWrapper;
import com.intelligentparking.myparking.pojo.User;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;

@RequestMapping("web")
@RestController
public class WebUserController {

    @Resource(name = "webUserServiceImpl")
    private UserService userService;

    @RequestMapping(value = "getUserByPage",method = RequestMethod.GET)
    public ResponseWrapper<List<User>> getUserByPage(@RequestParam int page){
        System.out.println("page:"+page);
        List<User> list = userService.getUserByPage(page);
        return new ResponseWrapper<>(ResponseStatus.OK, "success", list);
    }
    @RequestMapping(value = "deleteUser",method = RequestMethod.POST)
    public ResponseWrapper<String> deleteUser(@RequestParam int id){
        String result =  userService.deleteUser(id);
        return new ResponseWrapper<>(ResponseStatus.OK, result);
    }
}
