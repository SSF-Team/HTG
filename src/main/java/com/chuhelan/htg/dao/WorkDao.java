package com.chuhelan.htg.dao;

import com.chuhelan.htg.beans.Work;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Mapper
@Repository
public interface WorkDao {
    int new_work(Work work);
    Work[] get_works(int id);
    Work[] get_all_works();
    int reply_work(int id, String str, int uid);
}
