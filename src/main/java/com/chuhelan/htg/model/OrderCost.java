package com.chuhelan.htg.model;

import lombok.Builder;
import lombok.Data;

/**
 * @Version: 1.0
 * @Date: 2021/11/11 14:22
 * @ClassName: OrderCost
 * @Author: Stapxs
 * @Description TO DO
 **/

@Data
public class OrderCost {
    String start;
    String end;
    double distance;
    double cost;
}
