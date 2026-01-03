package com.company.smartecommerce.modules.recommendation.controller;

import com.company.smartecommerce.modules.recommendation.dto.RecommendationRequest;
import com.company.smartecommerce.modules.recommendation.dto.RecommendationResponse;
import com.company.smartecommerce.modules.recommendation.service.RecommendationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/recommendations")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class RecommendationController {

    private final RecommendationService recommendationService;

    @GetMapping
    public ResponseEntity<Page<RecommendationResponse>> getAllRecommendations(Pageable pageable) {
        Page<RecommendationResponse> recommendations = recommendationService.getAllRecommendations(pageable);
        return ResponseEntity.ok(recommendations);
    }

    @GetMapping("/{id}")
    public ResponseEntity<RecommendationResponse> getRecommendationById(@PathVariable Long id) {
        RecommendationResponse recommendation = recommendationService.getRecommendationById(id);
        return ResponseEntity.ok(recommendation);
    }

    @PostMapping
    public ResponseEntity<RecommendationResponse> createRecommendation(@Valid @RequestBody RecommendationRequest request) {
        RecommendationResponse recommendation = recommendationService.createRecommendation(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(recommendation);
    }

    @PutMapping("/{id}")
    public ResponseEntity<RecommendationResponse> updateRecommendation(
            @PathVariable Long id,
            @Valid @RequestBody RecommendationRequest request) {
        RecommendationResponse recommendation = recommendationService.updateRecommendation(id, request);
        return ResponseEntity.ok(recommendation);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRecommendation(@PathVariable Long id) {
        recommendationService.deleteRecommendation(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<RecommendationResponse>> getRecommendationsByUserId(@PathVariable Long userId) {
        List<RecommendationResponse> recommendations = recommendationService.getRecommendationsByUserId(userId);
        return ResponseEntity.ok(recommendations);
    }

    @GetMapping("/product/{productId}")
    public ResponseEntity<List<RecommendationResponse>> getRecommendationsByProductId(@PathVariable Long productId) {
        List<RecommendationResponse> recommendations = recommendationService.getRecommendationsByProductId(productId);
        return ResponseEntity.ok(recommendations);
    }
}