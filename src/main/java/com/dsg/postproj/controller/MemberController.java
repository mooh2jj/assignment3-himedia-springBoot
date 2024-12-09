package com.dsg.postproj.controller;

import com.dsg.postproj.dto.JoinDTO;
import com.dsg.postproj.dto.LoginDTO;
import com.dsg.postproj.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/member")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;


    @PostMapping("/join")
    public ResponseEntity<Map<String, Object>> signup(@RequestBody JoinDTO joinDTO) {
        memberService.join(joinDTO);
        return ResponseEntity.ok(Map.of("result", "success"));
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody LoginDTO loginDTO) {
        Map<String, Object> loginClaims = memberService.login(loginDTO.getEmail(), loginDTO.getPassword());
        return ResponseEntity.ok(loginClaims);
    }
}
