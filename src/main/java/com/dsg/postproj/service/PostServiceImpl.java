package com.dsg.postproj.service;

import com.dsg.postproj.dto.PostDTO;
import com.dsg.postproj.entity.Post;
import com.dsg.postproj.repository.PostRepository;
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
                .orElseThrow(() -> new IllegalArgumentException("해당 게시글이 없습니다. id=" + id));
    }

    @Override
    public void create(PostDTO postDto) {
        Post post = Post.builder()
                .title(postDto.getTitle())
                .content(postDto.getContent())
                .build();

        postRepository.save(post);
    }

    @Override
    public void update(Long id, PostDTO postDto) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 게시글이 없습니다. id=" + id));

        post.update(postDto.getTitle(), postDto.getContent());
    }

    @Override
    public void delete(Long id) {
        postRepository.deleteById(id);
    }
}
