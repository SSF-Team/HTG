package com.chuhelan.htg.controller;

import com.chuhelan.htg.beans.UserInfo;
import com.chuhelan.htg.beans.Work;
import com.chuhelan.htg.model.BaseMsg;
import com.chuhelan.htg.service.UserService;
import com.chuhelan.htg.service.WorkService;
import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

/**
 * @Version: 1.0
 * @Date: 2021/11/17 23:21
 * @ClassName: WorkController
 * @Author: Stapxs
 * @Description TO DO
 **/

@RestController
public class WorkController {

    private Gson gson = new Gson();

    @Autowired
    WorkService workService;
    @Autowired
    UserService userService;

    @GetMapping("/work/new")
    public String create_work(int user_id, String title, String content, String order_id, String user_token) {
        try {
            if (title.equals("")) {
                return gson.toJson(new BaseMsg(302, "数据无效！"));
            }
            // 初始化 work 架构
            Work work = new Work();
            work.setWork_crater_id(user_id);
            work.setWork_order_id(order_id.equals("null") ? null : order_id);
            work.setWork_title(title);
            work.setWork_content(content);
            // 验证登录
            boolean is_login = userService.verify_token_by_id(user_id, user_token);
            if (is_login) {
                workService.new_work(work);
                // 返回
                return gson.toJson(new BaseMsg(200, "创建成功！"));
            } else {
                return gson.toJson(new BaseMsg(302, "验证登陆失败！"));
            }
        } catch (Exception ex) {
            return gson.toJson(new BaseMsg(500, ex.getMessage()));
        }
    }

    @GetMapping("/work/user/{id}")
    public String get_work(@PathVariable int id) {
        return gson.toJson(workService.get_works(id));
    }

    @GetMapping("/work/back/{work_id}")
    public String back_work(@PathVariable int work_id, int user_id, String user_token, String back) {
        // 验证登录
        boolean is_login = userService.verify_token_by_id(user_id, user_token);
        UserInfo info = userService.get_userinfo_by_id(user_id);
        // 验证权限
        if(is_login && info.getUser_type().equals("客服用户")) {
            // 进行回复操作
            workService.reply_work(work_id, back, user_id);
            return gson.toJson(new BaseMsg(200, "操作成功！"));
        } else {
            return gson.toJson(new BaseMsg(302, "无权操作！"));
        }
    }
}
