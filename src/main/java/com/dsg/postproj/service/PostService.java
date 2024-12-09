package com.dsg.postproj.service;

import com.dsg.postproj.dto.PostDTO;
import com.dsg.postproj.entity.Post;
import jakarta.validation.Valid;

import java.util.List;

public interface PostService {

    List<PostDTO> list();

    // entity -> dto로 변환하는 메서드
    default PostDTO toDto(Post post) {
        return PostDTO.builder()
                .id(post.getId())
                .title(post.getTitle())
                .content(post.getContent())
                .author(post.getMember().getEmail())
//                .createdDate(post.get)
                .build();
    }

    PostDTO getOne(Long id);

    void create(PostDTO postDto, String email);

    void update(Long id, @Valid PostDTO postDto);

    void delete(Long id);
}
