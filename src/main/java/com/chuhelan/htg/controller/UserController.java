package com.chuhelan.htg.controller;

import com.chuhelan.htg.model.BaseInfo;
import com.chuhelan.htg.model.BaseMsg;
import com.chuhelan.htg.beans.User;
import com.chuhelan.htg.beans.UserInfo;
import com.chuhelan.htg.service.UserService;
import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

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
                // TODO 初始化信息表

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
                    back = login_statue + "|" + userService.get_user_by_mail(mail).getUser_id();
                }
        }
        return gson.toJson(new BaseMsg(code, back));
    }

    /**
     * @Author Stapxs
     * @Description 获取用户基础信息（头像，昵称），无需验证 token
     * @Date 08:37 2021/11/09
     * @Param [id]
     * @return java.lang.String
    **/
    @GetMapping("/info/base")
    public String get_user_base_info(int id) {
        User user = userService.get_user_by_id(id);
        UserInfo info = userService.get_userinfo_by_id(id);
        BaseInfo base = new BaseInfo(info.getUser_profile(), user.getUser_first_name(), user.getUser_last_name());
        return gson.toJson(base);
    }
    @GetMapping("/info/base/{id}")
    public String get_user_base_info_id(@PathVariable int id) {
        User user = userService.get_user_by_id(id);
        UserInfo info = userService.get_userinfo_by_id(id);
        BaseInfo base = new BaseInfo(info.getUser_profile(), user.getUser_first_name(), user.getUser_last_name());
        return gson.toJson(base);
    }

    @PostMapping("/verify")
    public String verify_user_by_id(int id, String token) {
        System.out.println("验证登录：" + id + " / " + token);
        boolean is_pass = userService.verify_token_by_id(id, token);
        if(is_pass) {
            return gson.toJson(new BaseMsg(200, "OK"));
        } else {
            return gson.toJson(new BaseMsg(302, "ERR"));
        }
    }
}
