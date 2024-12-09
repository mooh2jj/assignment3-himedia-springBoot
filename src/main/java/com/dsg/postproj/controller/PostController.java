package com.dsg.postproj.controller;

import com.dsg.postproj.dto.PostDto;
import com.dsg.postproj.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequestMapping("/api/post")
@RequiredArgsConstructor
@RestController
public class PostController {

    private final PostService postService;

    @GetMapping
    public List<PostDto> list() {
        return postService.list();
    }
}
