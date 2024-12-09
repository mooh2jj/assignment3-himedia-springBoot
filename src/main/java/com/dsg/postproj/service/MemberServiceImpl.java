package com.dsg.postproj.service;

import com.dsg.postproj.dto.JoinDTO;
import com.dsg.postproj.dto.MemberDTO;
import com.dsg.postproj.entity.Member;
import com.dsg.postproj.enums.MemberRole;
import com.dsg.postproj.props.JwtProps;
import com.dsg.postproj.repository.MemberRepository;
import com.dsg.postproj.util.JWTUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;

@Slf4j
@Transactional
@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;

    private final JWTUtil jwtUtil;
    private final JwtProps jwtProps;

    @Override
    public void join(JoinDTO joinDTO) {

        memberRepository.findByEmail(joinDTO.getEmail())
                .ifPresent(member -> {
                    throw new IllegalArgumentException("이미 존재하는 회원입니다!");
                });

        Member member = Member.builder()
                .email(joinDTO.getEmail())
                .password(passwordEncoder.encode(joinDTO.getPassword()))
                .name(joinDTO.getName())
                .build();

        member.addRole(MemberRole.USER);

        memberRepository.save(member);

    }

    @Override
    public Map<String, Object> login(String email, String password) {

        Member member = memberRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 회원입니다."));

        if (!passwordEncoder.matches(password, member.getPassword())) {
            throw new IllegalArgumentException("비밀번호가 일치하지 않습니다.");
        }

        MemberDTO memberDTO = new MemberDTO(member.getEmail(), member.getPassword(), member.getName(),
                member.getMemberRoleList().stream().map(Enum::name).toList());

        Map<String, Object> claims = memberDTO.getClaims();
        claims.put("email", member.getEmail());
        claims.put("name", member.getName());
        claims.put("password", member.getPassword());

        // access token, refreshToken 생성
        claims.put("accessToken", jwtUtil.generateToken(claims, jwtProps.getAccessTokenExpirationPeriod()));
        claims.put("refreshToken", jwtUtil.generateToken(claims, jwtProps.getRefreshTokenExpirationPeriod()));

        return claims;
    }
}
