package com.chuhelan.htg.model;

import lombok.Data;

/**
 * @Version: 1.0
 * @Date: 2021/11/09 08:53
 * @ClassName: BaseInfo
 * @Author: Stapxs
 * @Description TO DO
 **/

@Data
public class BaseInfo {
    String pic_link;
    String first_name;
    String last_name;

    public BaseInfo(String user_profile, String s, String s1) {
        pic_link = user_profile;
        first_name = s;
        last_name = s1;
    }
}
