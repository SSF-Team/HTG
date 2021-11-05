package com.chuhelan.htg.dao;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

/**
 * @Version: 1.0
 * @Date: 2021/11/04 11:35
 * @ClassName: TextDao
 * @Author: Stapxs
 * @Description TO DO
 **/

@Mapper
@Repository
public interface TextDao {
    String[] get_vip_adv_list();
    String[] get_vip_title_list();
}
