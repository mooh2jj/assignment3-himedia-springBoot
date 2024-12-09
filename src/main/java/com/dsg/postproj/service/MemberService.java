package com.dsg.postproj.service;

import com.dsg.postproj.dto.JoinDTO;

import java.util.Map;

public interface MemberService {
    void join(JoinDTO joinDTO);

    Map<String, Object> login(String email, String password);


    // joinDto -> entity로 변환하는 메서드

}
