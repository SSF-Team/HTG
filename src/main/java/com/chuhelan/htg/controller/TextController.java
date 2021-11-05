package com.chuhelan.htg.controller;

import com.chuhelan.htg.dao.TextDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Random;

/**
 * @Version: 1.0
 * @Date: 2021/11/04 10:32
 * @ClassName: TextController
 * @Author: Stapxs
 * @Description TO DO
 **/

@RestController
public class TextController {

    @Autowired
    TextDao textDao;

    @GetMapping("/vip/advertise")
    public String get_vip_ad(int id) {
        //TODO 检索节日
        return "还没写完。";
    }

    @GetMapping("/vip/title")
    public String get_vip_title() {
        String[] list = textDao.get_vip_title_list();
        int min = 0;
        int max = list.length - 1;
        int num = min + (int)(Math.random() * (max-min+1));
        return list[num];
    }
}
