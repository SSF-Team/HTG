package com.chuhelan.htg.model;

import lombok.Data;

/**
 * @Version: 1.0
 * @Date: 2021/11/04 08:28
 * @ClassName: BaseMsg
 * @Author: Stapxs
 * @Description TO DO
 **/

@Data
public class BaseMsg {
    int code;
    String message;

    public BaseMsg(int i, String s) {
        code = i;
        message = s;
    }
}
