package com.chuhelan.htg.service.impl;

import com.chuhelan.htg.beans.UserInfo;
import com.chuhelan.htg.beans.Work;
import com.chuhelan.htg.dao.UserDao;
import com.chuhelan.htg.dao.WorkDao;
import com.chuhelan.htg.service.WorkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @Version: 1.0
 * @Date: 2021/11/17 23:21
 * @ClassName: WorkServiceImpl
 * @Author: Stapxs
 * @Description TO DO
 **/

@Service
public class WorkServiceImpl implements WorkService {

    @Autowired
    WorkDao workDao;
    @Autowired
    UserDao userDao;

    @Override
    public void new_work(Work work) {
        workDao.new_work(work);
    }

    @Override
    public Work[] get_works(int id) {
        // 验证用户信息
        UserInfo info = userDao.get_user_more_by_id(id);
        if(info.getUser_type().equals("客服用户")) {
            return workDao.get_all_works();
        } else {
            return workDao.get_works(id);
        }
    }

    @Override
    public void reply_work(int id, String back, int uid) {
        workDao.reply_work(id, back, uid);
    }
}
