package com.chuhelan.htg.dao.impl;

import com.chuhelan.htg.beans.Order;
import com.chuhelan.htg.dao.OrderDao;

import java.util.Date;

/**
 * @Version: 1.0
 * @Date: 2021/11/11 09:06
 * @ClassName: OrderDaoImpl
 * @Author: Stapxs
 * @Description TO DO
 **/
public class OrderDaoImpl implements OrderDao {
    @Override
    public Order get_order_by_id(String id) {
        return null;
    }

    @Override
    public Order[] get_orders_today() {
        return new Order[0];
    }

    @Override
    public String[] get_orders_id_by_user_id(int id) {
        return new String[0];
    }

    @Override
    public int save_order(Order order) {
        return 0;
    }

    @Override
    public int delete_order(String id) {
        return 0;
    }

    @Override
    public int receive_order(String id) {
        return 0;
    }

    @Override
    public int change_order_state_by_order_id(String id, String state) {
        return 0;
    }
}
