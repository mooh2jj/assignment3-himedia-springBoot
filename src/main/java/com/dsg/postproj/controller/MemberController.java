package com.dsg.postproj.controller;

import com.dsg.postproj.dto.JoinDTO;
import com.dsg.postproj.dto.LoginDTO;
import com.dsg.postproj.props.JwtProps;
import com.dsg.postproj.service.MemberService;
import com.dsg.postproj.util.CookieUtil;
import com.dsg.postproj.util.JWTUtil;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.Map;
@Slf4j
@RestController
@RequestMapping("/api/member")
@RequiredArgsConstructor
public class MemberController {

    private final JWTUtil jwtUtil;
    private final JwtProps jwtProps;
    private final MemberService memberService;


    @PostMapping("/join")
    public ResponseEntity<Map<String, Object>> signup(@Valid @RequestBody JoinDTO joinDTO) {
        memberService.join(joinDTO);
        return ResponseEntity.ok(Map.of("result", "success"));
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@Valid @RequestBody LoginDTO loginDTO, HttpServletResponse response) {
        Map<String, Object> loginClaims = memberService.login(loginDTO.getEmail(), loginDTO.getPassword());

        CookieUtil.setTokenCookie(response, "refreshToken", (String)loginClaims.get("refreshToken"), jwtProps.getRefreshTokenExpirationPeriod()); // 1day
        return ResponseEntity.ok(loginClaims);
    }

    @PostMapping("/logout")
    public ResponseEntity<Map<String, Object>> logout(HttpServletResponse response) {
        CookieUtil.removeTokenCookie(response, "refreshToken");
        return ResponseEntity.ok(Map.of("result", "success"));
    }


    // refresh token으로 access token 재발급
    @GetMapping("/refresh")
    public Map<String, Object> refresh(
            @CookieValue(value = "refreshToken") String refreshToken,
            HttpServletResponse response) {

        log.info("refresh refreshToken: {}", refreshToken);

        // RefreshToken 검증
        Map<String, Object> claims = jwtUtil.validateToken(refreshToken);
        log.info("RefreshToken claims: {}", claims);

        String newAccessToken = jwtUtil.generateToken(claims, jwtProps.getAccessTokenExpirationPeriod());
        String newRefreshToken = jwtUtil.generateToken(claims, jwtProps.getRefreshTokenExpirationPeriod());

        // refreshToken 만료시간이 1시간 이하로 남았다면, 새로 발급
        if (checkTime((Integer) claims.get("exp"))) {
            // 새로 발급
            CookieUtil.setTokenCookie(response, "refreshToken", newRefreshToken, jwtProps.getRefreshTokenExpirationPeriod()); // 1day
        } else {
            // 만료시간이 1시간 이상이면, 기존 refreshToken 그대로
            CookieUtil.setNewRefreshTokenCookie(response, "refreshToken", refreshToken);
        }

        return Map.of("newAccessToken", newAccessToken);
    }


    /**
     * (refreshToken) 시간이 1시간 미만으로 남았는지 체크
     *
     * @param exp 만료시간
     * @return 1시간 미만이면 true, 아니면 false
     */
    private boolean checkTime(Integer exp) {

        // JWT exp를 날짜로 변환
        Date expDate = new Date((long) exp * 1000);
        // 현재 시간과의 차이 계산 - 밀리세컨즈
        long gap = expDate.getTime() - System.currentTimeMillis();
        // 분단위 계산
        long leftMin = gap / (1000 * 60);
        return leftMin < 60;
    }
}
