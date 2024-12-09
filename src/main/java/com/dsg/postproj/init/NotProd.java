package com.dsg.postproj.init;

import com.dsg.postproj.entity.Member;
import com.dsg.postproj.entity.Post;
import com.dsg.postproj.enums.MemberRole;
import com.dsg.postproj.repository.MemberRepository;
import com.dsg.postproj.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDate;
import java.util.stream.LongStream;

@Slf4j
@Configuration
@RequiredArgsConstructor
public class NotProd {

    private final MemberRepository memberRepository;
    private final PostRepository postRepository;

    @Bean
    CommandLineRunner initData(
    ) {
        return (args) -> {
            log.info("init data start...");

            if(memberRepository.count() > 0 || postRepository.count() > 0) {
                log.info("init data already exists.");
                return;
            }
            LongStream.rangeClosed(1, 5).forEach(i -> {
                // member data
                Member member = Member.builder()
                        .email("user" + i + "@aaa.com")
                        .name("nick_" + i)
                        .password("1111")
                        .build();

                member.addRole(MemberRole.ADMIN);

                memberRepository.save(member);

            });

            LongStream.rangeClosed(6, 10).forEach(i -> {

                Member member = Member.builder()
                        .email("user" + i + "@aaa.com")
                        .name("nick_" + i)
                        .password("1111")
                        .build();

                member.addRole(MemberRole.USER);

                memberRepository.save(member);
            });

            LongStream.rangeClosed(1, 10).forEach(i -> {

                Post post = Post.builder()
                        .member(memberRepository.findByEmail("user" + (i % 10 + 1) + "@aaa.com").get())
                        .title("Title..." + i)
                        .content("Content..." + i)
                        .build();

                postRepository.save(post);
            });
        };
    }

}
