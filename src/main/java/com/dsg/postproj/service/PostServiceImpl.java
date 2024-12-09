package com.dsg.postproj.service;

import com.dsg.postproj.dto.PostDTO;
import com.dsg.postproj.entity.Member;
import com.dsg.postproj.entity.Post;
import com.dsg.postproj.repository.MemberRepository;
import com.dsg.postproj.repository.PostRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class PostServiceImpl implements PostService {

    private final MemberRepository memberRepository;
    private final PostRepository postRepository;

    @Transactional(readOnly = true)
    @Override
    public List<PostDTO> list() {
        List<Post> posts = postRepository.findAll();
        return posts.stream().map(this::toDto).toList();
    }

    @Transactional(readOnly = true)
    @Override
    public PostDTO getOne(Long id) {
        return postRepository.findById(id)
                .map(this::toDto)
                .orElseThrow(() -> new EntityNotFoundException("해당 게시글이 없습니다. id=" + id));
    }

    @Override
    public void create(PostDTO postDto, String email) {

        Member member = this.getMember(email);

        Post post = Post.builder()
                .title(postDto.getTitle())
                .content(postDto.getContent())
                .member(member)
                .build();

        postRepository.save(post);
    }


    @Override
    public void update(Long id, PostDTO postDto, String email) {

        Member member = this.getMember(email);

        Post post = postRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("해당 게시글이 없습니다. id=" + id));

        post.update(postDto.getTitle(), postDto.getContent(), member);
    }

    @Override
    public void delete(Long id) {
        postRepository.deleteById(id);
    }

    private Member getMember(String email) {
        return memberRepository.findByEmail(email)
                .orElseThrow(() -> new EntityNotFoundException("해당 회원이 없습니다. email=" + email));
    }
}
