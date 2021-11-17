package com.chuhelan.htg.dao;

import com.chuhelan.htg.beans.Order;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.Date;

/**
 * @Version: 1.0
 * @Date: 2021/11/11 09:05
 * @ClassName: OrderDao
 * @Author: Stapxs
 * @Description TO DO
 **/

@Mapper
@Repository
public interface OrderDao {
    Order get_order_by_id(String id);
    Order[] get_orders_today();
    String[] get_orders_id_by_user_id(int id);

    int save_order(Order order);
    int delete_order(String id);
    int receive_order(String id);

    int change_order_state_by_order_id(String id, String state);
}
