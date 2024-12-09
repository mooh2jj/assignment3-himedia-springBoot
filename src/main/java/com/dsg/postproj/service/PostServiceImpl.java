package com.dsg.postproj.service;

import com.dsg.postproj.dto.PostDto;
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
    public List<PostDto> list() {
        List<Post> posts = postRepository.findAll();
        return posts.stream().map(this::toDto).toList();
    }
}
