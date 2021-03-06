package com.chuhelan.htg.service.impl;


import com.chuhelan.htg.beans.User;
import com.chuhelan.htg.beans.UserInfo;
import com.chuhelan.htg.dao.UserDao;
import com.chuhelan.htg.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

/**
 * @author chuhelan
 * @version 1.0
 * @date 2021/11/2 10:50
 */

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserDao userDao;

    @Override
    public int register_user_by_userinfo(User u) {
        // 获取所有用户信息
        User[] users = userDao.get_all_user();
        for (User user: users) {
            if(user.getUser_email().equals(u.getUser_email())) {
                return 302;
            }
        }
        userDao.register_user_by_userinfo(u);
        // 获取用户 ID
        u = userDao.get_userinfo_by_mail(u.getUser_email());
        // 初始化 info 表
        userDao.new_user_info_by_user_id(u.getUser_id());
        return 200;
    }

    @Override
    public String login_user_by_mail(String mail, String password) {
        // 获取用户信息
        User info = userDao.get_userinfo_by_mail(mail);
        if(info == null) return "404";        // 账户或密码不存在
        // 验证用户密码
        if(info.getUser_password().equals(password)) {
            // 创建 token
            String uuid = UUID.randomUUID().toString();
            uuid = uuid.replace("-", "");
            // 写入数据库
            Date date = new Date();
            Calendar calendar = new GregorianCalendar();
            calendar.setTime(date);
            calendar.add(Calendar.DATE,5);
            date = calendar.getTime();
            userDao.save_user_token_by_id(info.getUser_id(), uuid);
            userDao.save_user_token_die_time_by_id(info.getUser_id(), date);
            // 返回 token
            return uuid;
        } else {
            return "302";     // 账户或密码错误
        }
    }

    @Override
    public boolean verify_token_by_id(int id, String token) {
        System.out.println("操作 > verify_token_by_id > 验证登陆 > " + id + " / " + token);
        // 获取用户信息
        User info = userDao.get_userinfo_by_id(id);
        //验证 token
        return info.getUser_session().equals(token) && new Date().before(info.getUser_died_session());
    }

    @Override
    public User get_user_by_mail(String mail) {
        return userDao.get_userinfo_by_mail(mail);
    }

    @Override
    public User get_user_by_id(int id) {
        return userDao.get_userinfo_by_id(id);
    }

    @Override
    public UserInfo get_userinfo_by_id(int id) {
        return userDao.get_user_more_by_id(id);
    }
}