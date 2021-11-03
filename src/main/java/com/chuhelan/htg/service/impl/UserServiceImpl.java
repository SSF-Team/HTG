package com.chuhelan.htg.service.impl;


import com.chuhelan.htg.beans.User;
import com.chuhelan.htg.dao.UserDao;
import com.chuhelan.htg.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
        return userDao.register_user_by_userinfo(u);
    }
}
