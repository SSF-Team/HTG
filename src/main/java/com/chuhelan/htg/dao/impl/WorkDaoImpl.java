package com.chuhelan.htg.dao.impl;

import com.chuhelan.htg.beans.Work;
import com.chuhelan.htg.dao.WorkDao;

/**
 * @Version: 1.0
 * @Date: 2021/11/17 23:19
 * @ClassName: WorkDaoImpl
 * @Author: Stapxs
 * @Description TO DO
 **/
public class WorkDaoImpl implements WorkDao {
    @Override
    public int new_work(Work work) {
        return 0;
    }

    @Override
    public Work[] get_works(int id) {
        return new Work[0];
    }

    @Override
    public Work[] get_all_works() {
        return new Work[0];
    }

    @Override
    public int reply_work(int id, String str, int uid) {
        return 0;
    }
}
