package com.dsg.postproj.service;

import com.dsg.postproj.dto.JoinDTO;

import java.util.Map;

public interface MemberService {

    void join(JoinDTO joinDTO);

    boolean checkEmail(String email);

    Map<String, Object> login(String email, String password);

}
