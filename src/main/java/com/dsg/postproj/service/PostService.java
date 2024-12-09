package com.dsg.postproj.service;

import com.dsg.postproj.dto.PostDto;
import com.dsg.postproj.entity.Post;
import jakarta.validation.Valid;

import java.util.List;

public interface PostService {

    List<PostDto> list();

    // entity -> dto로 변환하는 메서드
    default PostDto toDto(Post post) {
        return PostDto.builder()
                .id(post.getId())
                .title(post.getTitle())
                .content(post.getContent())
                .author(post.getMember().getEmail())
//                .createdDate(post.get)
                .build();
    }

    PostDto getOne(Long id);

    void create(PostDto postDto);

    void update(Long id, @Valid PostDto postDto);

    void delete(Long id);
}
