package com.dsg.postproj.controller;

import com.dsg.postproj.dto.PostDTO;
import com.dsg.postproj.service.PostService;


import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RequestMapping("/api/post")
@RequiredArgsConstructor
@RestController
public class PostController {

    private final PostService postService;

    @GetMapping
    public ResponseEntity<List<PostDTO>> list() {
        return ResponseEntity.ok(postService.list());
    }

    @GetMapping("/{id}")
    public ResponseEntity<PostDTO> getOne(@PathVariable Long id) {
        return ResponseEntity.ok(postService.getOne(id));
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> create(@Valid @RequestBody PostDTO postDto) {
        postService.create(postDto);
        return ResponseEntity.ok(Map.of("message", "created"));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Map<String, Object>> update(@PathVariable Long id, @Valid @RequestBody PostDTO postDto) {
        postService.update(id, postDto);
        return ResponseEntity.ok(Map.of("message", "updated"));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> delete(@PathVariable Long id) {
        postService.delete(id);
        return ResponseEntity.ok(Map.of("message", "deleted"));
    }
}
