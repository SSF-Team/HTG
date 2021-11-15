package com.chuhelan.htg.service;


import com.chuhelan.htg.beans.Order;

import java.util.Date;

public interface OrderService {
    Order get_order_by_id(String id);
    Order[] get_orders_today();
    String[] get_orders_id_by_user_id(int id);

    int save_order(Order order);
    int change_state(String id, String state);

    double[] calc_distance(String way1, String way2);

    boolean is_its_order(String id, int user_id);
}