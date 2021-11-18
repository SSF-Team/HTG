package com.chuhelan.htg.beans;

import lombok.Data;

/**
 * @Version: 1.0
 * @Date: 2021/11/17 23:15
 * @ClassName: Work
 * @Author: Stapxs
 * @Description TO DO
 **/

@Data
public class Work {
    int work_id;
    int work_crater_id;
    int work_server_id;
    String work_order_id;
    String work_title;
    String work_content;
    String work_back;
}
