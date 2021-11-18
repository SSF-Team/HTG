package com.chuhelan.htg.dao;

import com.chuhelan.htg.beans.User;
import com.chuhelan.htg.beans.UserInfo;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.Date;

/**
 * @author chuhelan
 * @version 1.0
 * @date 2021/11/2 10:49
 */

@Mapper
@Repository
public interface UserDao {
    int register_user_by_userinfo(User u);

    User get_userinfo_by_mail(String mail);
    User get_userinfo_by_id(int id);
    User[] get_all_user();

    UserInfo get_user_more_by_id(int id);

    int save_user_token_by_id(int id, String token);
    int save_user_token_die_time_by_id(int id, Date date);
    int new_user_info_by_user_id(int id);
}
