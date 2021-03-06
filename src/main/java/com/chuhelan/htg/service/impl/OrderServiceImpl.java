package com.chuhelan.htg.service.impl;

import com.chuhelan.htg.beans.Order;
import com.chuhelan.htg.beans.UserInfo;
import com.chuhelan.htg.dao.OrderDao;
import com.chuhelan.htg.dao.UserDao;
import com.chuhelan.htg.service.OrderService;
import com.chuhelan.htg.util.http;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.Date;

/**
 * @Version: 1.0
 * @Date: 2021/11/11 09:38
 * @ClassName: OrderServiceImpl
 * @Author: Stapxs
 * @Description TO DO
 **/

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    OrderDao orderDao;

    @Autowired
    UserDao userDao;


    @Override
    public Order get_order_by_id(String id) {
        return orderDao.get_order_by_id(id);
    }

    @Override
    public Order[] get_orders_today() {
        return orderDao.get_orders_today();
    }

    @Override
    public String[] get_orders_id_by_user_id(int id) {
        // 判断用户类型
        UserInfo info = userDao.get_user_more_by_id(id);
        if(info.getUser_type().equals("快递员用户")) {
            return orderDao.get_orders_id_for_user_id(id);
        } else {
            return orderDao.get_orders_id_by_user_id(id);
        }
    }

    @Override
    public void save_order(Order order) {
        orderDao.save_order(order);
    }

    @Override
    public void delete_order(String id) {
        orderDao.delete_order(id);
    }

    @Override
    public void change_state(String id, String state) {
        orderDao.change_order_state_by_order_id(id, state);
    }

    @Override
    public void receive_order(String id) {
        orderDao.receive_order(id);
    }

    @Override
    public void next_order(String id) {
        Order order = orderDao.get_order_by_id(id);
        switch (order.getOrder_status()) {
            case "未发货": {
                order.setOrder_status("运输中");
                order.setOrder_send_date(new Date());
                break;
            }
            case "运输中": {
                order.setOrder_status("未签收");
                order.setOrder_end_date(new Date());
                break;
            }
        }
        orderDao.update_order_all(order);
    }

    @Override
    public double[] calc_distance(String way1, String way2) {
        // 计算距离
        System.out.println("操作 > createOrder > 计算订单距离 > " + way1 + " / " + way2);
        String[][] info = new String[][]{
                new String[]{"address", way1},
                new String[]{"output", "json"},
                new String[]{"ak", "62WAvGClEExBObY1zU4ZuMMEYxVRmWdF"}
        };
        String get = http.result("http://api.map.baidu.com/geocoding/v3/", info);
        String[] startPoint = new String[]{
                get.substring(get.indexOf("\"lng\":") + 6, get.indexOf(",\"lat\":")),
                get.substring(get.indexOf("\"lat\":") + 6, get.indexOf("},\"precise\":"))
        };
        info = new String[][]{
                new String[]{"address", way2},
                new String[]{"output", "json"},
                new String[]{"ak", "62WAvGClEExBObY1zU4ZuMMEYxVRmWdF"}
        };
        get = http.result("http://api.map.baidu.com/geocoding/v3/", info);
        String[] endPoint = new String[]{
                get.substring(get.indexOf("\"lng\":") + 6, get.indexOf(",\"lat\":")),
                get.substring(get.indexOf("\"lat\":") + 6, get.indexOf("},\"precise\":"))
        };
        System.out.println("操作 > createOrder > 计算订单距离 > " + Arrays.toString(startPoint) + " / " + Arrays.toString(endPoint));
        // 计算两点直线距离 √((x2-x1)^2 + (y2-y1)^2)
        double all = Math.pow(Double.parseDouble(endPoint[0]) - Double.parseDouble(startPoint[0]), 2) +
                Math.pow(Double.parseDouble(endPoint[1]) - Double.parseDouble(startPoint[1]), 2);
        double distance = Math.sqrt(all);

        System.out.println("操作 > createOrder > 计算订单距离 > " + distance);
        return new double[] {
                Math.round(distance),
                Double.parseDouble(startPoint[0]),
                Double.parseDouble(startPoint[1]),
                Double.parseDouble(endPoint[0]),
                Double.parseDouble(endPoint[1])
        };
    }

    @Override
    public boolean is_its_order(String id, int user_id) {
        Order info = orderDao.get_order_by_id(id);
        return info.getOrder_user_id() == user_id || info.getOrder_sender_id() == user_id;
    }
}
