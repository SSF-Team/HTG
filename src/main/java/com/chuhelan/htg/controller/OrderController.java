package com.chuhelan.htg.controller;

import com.chuhelan.htg.beans.Order;
import com.chuhelan.htg.model.BaseMsg;
import com.chuhelan.htg.model.OrderCost;
import com.chuhelan.htg.service.OrderService;
import com.chuhelan.htg.service.UserService;
import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpRequest;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Date;
import java.util.Enumeration;
import java.util.Optional;

/**
 * @Version: 1.0
 * @Date: 2021/11/11 09:04
 * @ClassName: OrderController
 * @Author: Stapxs
 * @Description TO DO
 **/

@RestController
public class OrderController {

    Gson gson = new Gson();

    @Autowired
    UserService userService;

    @Autowired
    OrderService orderService;

    @PostMapping("/order/new")
    public String set_new_order(int user_id, String token,
                                String data_1, String data_2, String other_set) {
        // 验证登录
        boolean login = userService.verify_token_by_id(user_id, token);
        if (login) {
            // 整理数据（顺便验证数据合法性）
            /* data 的结构
             *   0姓名 / 1国家 / 2地址 / 3电子邮箱 / 4电话
             */
            /* other_set 为附加参数，暂时没用
             *   乱写点什么东西不然空着行不好看
             */
            String[] info1 = data_1.split("/");
            String[] info2 = data_2.split("/");
            System.out.println(data_1);
            if (info1.length == 5 && info2.length == 5) {
                // 生成订单号
                StringBuilder order_id = new StringBuilder("HTG");
                SimpleDateFormat sdf = new SimpleDateFormat("yyMMdd");
                order_id.append(sdf.format(new Date()));
                Order[] orders = orderService.get_orders_today();
                order_id.append(String.format("%03d", orders == null ? 0 : orders.length + 1));
                order_id.append("A");
                // 创建订单
                Order new_order = new Order();
                new_order.setOrder_id(order_id.toString());
                new_order.setOrder_user_id(user_id);
                new_order.setOrder_create_date(new Date());
                /* 0姓名 / 1国家 / 2地址 / 3电子邮箱 / 4电话 */
                new_order.setOrder_name(info1[0] + "/" + info2[0]);
                new_order.setOrder_country(info1[1] + "/" + info2[1]);
                new_order.setOrder_address(info1[2] + "/" + info2[2]);
                new_order.setOrder_email(info1[3] + "/" + info2[3]);
                new_order.setOrder_phone(info1[4] + "/" + info2[4]);
                // 写入数据库
                orderService.save_order(new_order);
                // 返回订单信息用于下一步操作
                return gson.toJson(new BaseMsg(200, new_order.getOrder_id()));
            }
            return gson.toJson(new BaseMsg(403, "参数错误！"));
        }
        return gson.toJson(new BaseMsg(403, "验证登录失败！"));
    }

    @GetMapping("/order/get/{id}")
    public String get_order(@PathVariable String id, HttpServletRequest request) {
        // 尝试获取登录信息
        int user_id = -1;
        String user_token = "";
        boolean is_login = false;
        Enumeration names = request.getParameterNames();
        while (names.hasMoreElements()) {
            String name = (String) names.nextElement();
            String value = request.getParameter(name);
            if (name.equals("id")) {
                user_id = Integer.parseInt(value);
            }
            if (name.equals("token")) {
                user_token = value;
            }
        }
        // 验证登陆
        if (user_id != -1) {
            is_login = userService.verify_token_by_id(user_id, user_token);
        }
        Order order = orderService.get_order_by_id(id);
        if (order != null) {
            if (!is_login || order.getOrder_user_id() != user_id) {
                // 去除详细地址
                StringBuilder address = new StringBuilder();
                String[] add_list = order.getOrder_address().split("/");
                for (String add : add_list) {
                    address.append(add.substring(0, add.indexOf("市") + 1));
                    address.append("/");
                }
                order.setOrder_address(address.substring(0, address.length() - 1));
                // 去除个人信息
                order.setOrder_email("隐藏/隐藏");
                order.setOrder_phone("隐藏/隐藏");
            }
            return gson.toJson(order);
        } else {
            return gson.toJson(new BaseMsg(404, "运单不存在！"));
        }
    }

    @GetMapping("/order/user/{id}")
    public String get_orders_by_id(@PathVariable int id) {
        String[] orders = orderService.get_orders_id_by_user_id(id);
        return gson.toJson(orders);
    }

    /*
     * @Author Stapxs
     * @Description 获取两点的距离和费用
     * @Date 14:00 2021/11/11
     * @Param []
     * @return java.lang.String
     **/
    @GetMapping("/order/cost/{start}/{end}")
    public String get_address_way(@PathVariable String end, @PathVariable String start) {
        // 构建类
        OrderCost info = new OrderCost();
        // 获取坐标以及距离
        double[] distance = orderService.calc_distance(start, end);
        info.setDistance(distance[0]);
        // 计算费用
        double cost = Math.round(distance[0]) * 2 + Math.round(distance[0]) * 0.2;
        info.setCost(cost);
        info.setStartPoint(new double[]{distance[1], distance[2]});
        info.setEndPoint(new double[]{distance[3], distance[4]});
        return gson.toJson(info);
    }

    @GetMapping("/order/confirm")
    public String confirm_order(String order_id, int user_id, String user_token) {
        // 验证登录
        boolean is_login = userService.verify_token_by_id(user_id, user_token);
        if (is_login) {
            if (orderService.is_its_order(order_id, user_id)) {
                // 进行确认订单操作
                Order order = orderService.get_order_by_id(order_id);
                if(order.getOrder_status().equals("未确认")) {
                    orderService.change_state(order_id, "未发货");
                    return gson.toJson(new BaseMsg(200, "确认成功！"));
                } else {
                    return gson.toJson(new BaseMsg(500, "运单无需确认！"));
                }
            } else {
                return gson.toJson(new BaseMsg(302, "无权操作！"));
            }
        }
        return gson.toJson(new BaseMsg(302, "验证登陆失败！"));
    }
}