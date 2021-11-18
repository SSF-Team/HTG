package com.chuhelan.htg.service;

import com.chuhelan.htg.beans.Work;

public interface WorkService {
    void new_work(Work work);
    Work[] get_works(int id);
    void reply_work(int id, String back, int uid);
}
