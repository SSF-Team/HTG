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
    String name;

    public BaseInfo(String user_profile, String s) {
        pic_link = user_profile;
        name = s;
    }
}
