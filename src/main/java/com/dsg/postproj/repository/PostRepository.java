package com.dsg.postproj.repository;

import com.dsg.postproj.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<Post, Long> {
}
