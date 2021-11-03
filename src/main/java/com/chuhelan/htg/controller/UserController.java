package com.chuhelan.htg.controller;

import com.chuhelan.htg.beans.User;
import com.chuhelan.htg.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

/**
 * @author chuhelan
 * @version 1.0
 * @date 2021/11/2 11:23
 */

@RestController
public class UserController {

    @Autowired
    UserService userService;

    @RequestMapping("/register")
    public String register_user_by_userinfo(User user) {
        userService.register_user_by_userinfo(user);
        return "注册成功！";
    }
}
