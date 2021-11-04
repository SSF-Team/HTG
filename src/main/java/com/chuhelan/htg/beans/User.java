package com.chuhelan.htg.beans;

import lombok.Data;

import java.util.Date;

/**
 * @author chuhelan
 * @version 1.0
 * @date 2021/11/2 8:48
 */

@Data
public class User {
    private Integer user_id;
    //姓
    private String user_last_name;
    //名
    private String user_first_name;
    private String user_email;
    private String user_password;
    private String user_phone;
    private String user_session;
    private Date user_died_session;

}
