package com.dsg.postproj.controller;

import com.dsg.postproj.dto.MemberDTO;
import com.dsg.postproj.dto.PostDTO;
import com.dsg.postproj.service.PostService;


import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Slf4j
@RequestMapping("/api/post")
@RequiredArgsConstructor
@RestController
public class PostController {

    private final PostService postService;

    @GetMapping("/list")
    public ResponseEntity<List<PostDTO>> list() {
        return ResponseEntity.ok(postService.list());
    }

    @GetMapping("/{id}")
    public ResponseEntity<PostDTO> getOne(@PathVariable Long id) {
        return ResponseEntity.ok(postService.getOne(id));
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> create(
            @Valid @RequestBody PostDTO postDto,
            @AuthenticationPrincipal MemberDTO memberDTO
    ) {
        log.info("post create memberDTO = {}", memberDTO);
        postService.create(postDto, memberDTO.getEmail());
        return ResponseEntity.ok(Map.of("result", "created"));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Map<String, Object>> update(
            @PathVariable Long id,
            @Valid @RequestBody PostDTO postDto,
            @AuthenticationPrincipal MemberDTO memberDTO
            ) {
        log.info("post update memberDTO = {}", memberDTO);
        postService.update(id, postDto, memberDTO.getEmail());
        return ResponseEntity.ok(Map.of("result", "updated"));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> delete(@PathVariable Long id) {
        postService.delete(id);
        return ResponseEntity.ok(Map.of("message", "deleted"));
    }
}
