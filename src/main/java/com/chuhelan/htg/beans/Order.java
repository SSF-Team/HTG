package com.chuhelan.htg.beans;

import lombok.Builder;
import lombok.Data;

import java.util.Date;

/**
 * @Version: 1.0
 * @Date: 2021/11/11 09:39
 * @ClassName: Order
 * @Author: Stapxs
 * @Description TO DO
 **/

@Data
public class Order {
    String order_id;
    int order_user_id;
    int order_sender_id;
    Date order_create_date;
    Date order_send_date;
    Date order_end_date;
    Date order_close_date;
    String order_name;
    String order_country;
    String order_address;
    String order_email;
    String order_phone;
    String order_status;
}
