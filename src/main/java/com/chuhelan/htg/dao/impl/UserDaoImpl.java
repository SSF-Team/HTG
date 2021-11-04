package com.chuhelan.htg.dao.impl;

import com.chuhelan.htg.beans.User;
import com.chuhelan.htg.dao.UserDao;

import java.util.Date;

/**
 * @author chuhelan
 * @version 1.0
 * @date 2021/11/2 10:49
 */
public class UserDaoImpl implements UserDao {
    @Override
    public int register_user_by_userinfo(User u) {
        return 0;
    }

    @Override
    public User get_userinfo_by_mail(String mail) {
        return null;
    }

    @Override
    public User get_userinfo_by_id(int id) {
        return null;
    }

    @Override
    public User[] get_all_user() {
        return new User[0];
    }

    @Override
    public int save_user_token_by_id(int id, String token) {
        return 0;
    }

    @Override
    public int save_user_token_die_time_by_id(int id, Date date) {
        return 0;
    }
}
