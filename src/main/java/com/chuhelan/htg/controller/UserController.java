package com.chuhelan.htg.controller;

import com.chuhelan.htg.beans.BaseMsg;
import com.chuhelan.htg.beans.User;
import com.chuhelan.htg.service.UserService;
import com.google.gson.Gson;
import jdk.nashorn.internal.objects.annotations.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
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

    Gson gson = new Gson();

    @Autowired
    UserService userService;

    @GetMapping("/register")
    public String register_user_by_userinfo(User user) {
        int code = userService.register_user_by_userinfo(user);
        switch (code){
            case 302:
                return gson.toJson(new BaseMsg(302, "账号已存在!"));
            case 200:
                return gson.toJson(new BaseMsg(200, "注册成功！"));
        }
        return gson.toJson(new BaseMsg(500, "未知错误！"));
    }

    @GetMapping("/login")
    public String login_user_by_mail(String mail, String password) {
        String back = "未知错误";
        int code = 500;
        // 验证登录
        String login_statue = userService.login_user_by_mail(mail, password);
        switch (login_statue){
            case "404":
                code = Integer.parseInt(login_statue);
                back = "账号不存在";
                break;
            case "302":
                code = Integer.parseInt(login_statue);
                back = "账号或密码错误";
                break;
            default:
                if(login_statue.length() > 3) {
                    code = 200;
                    back = login_statue;
                }
        }
        return gson.toJson(new BaseMsg(code, back));
    }
}
