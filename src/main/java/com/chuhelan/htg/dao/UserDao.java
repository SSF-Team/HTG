package com.chuhelan.htg.dao;

import com.chuhelan.htg.beans.User;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

/**
 * @author chuhelan
 * @version 1.0
 * @date 2021/11/2 10:49
 */

@Mapper
@Repository
public interface UserDao {
    int register_user_by_userinfo(User u);
}
