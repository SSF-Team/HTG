package com.chuhelan.htg.service;

import com.chuhelan.htg.beans.User;
import com.chuhelan.htg.beans.UserInfo;

/**
 * @author chuhelan
 * @version 1.0
 * @date 2021/11/2 10:50
 */
public interface UserService {
    int register_user_by_userinfo(User u);
    String login_user_by_mail(String mail, String password);
    boolean verify_token_by_id(int id, String token);
    User get_user_by_mail(String mail);
    User get_user_by_id(int id);

    UserInfo get_userinfo_by_id(int id);
}
