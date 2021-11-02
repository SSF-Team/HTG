package com.chuhelan.htg.beans;

import lombok.Data;

/**
 * @author chuhelan
 * @version 1.0
 * @date 2021/11/2 8:48
 */

@Data
public class User {
    private Integer user_id;
    private String user_name;
    private String user_gender;
    private String user_profile;
    private String user_email;
    private String user_password;
    private String user_phone;
    private Integer user_point;
    private String user_token;
    private String user_dtime;
}
