package com.company.smartecommerce.modules.review.controller;

import com.company.smartecommerce.modules.review.dto.ReviewRequest;
import com.company.smartecommerce.modules.review.dto.ReviewResponse;
import com.company.smartecommerce.modules.review.service.ReviewService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/reviews")
@RequiredArgsConstructor
public class ReviewController {
    private final ReviewService reviewService;

    @PostMapping
    public ResponseEntity<ReviewResponse> createReview(
            @Valid @RequestBody ReviewRequest request,
            Principal principal) {
        // In a real application, you would extract user ID from JWT token
        // For now, using a placeholder - this would be replaced with actual user ID from security context
        Long userId = 1L; // Placeholder - should come from security context
        ReviewResponse response = reviewService.createReview(userId, request);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/product/{productId}")
    public ResponseEntity<Page<ReviewResponse>> getReviewsByProduct(
            @PathVariable Long productId,
            Pageable pageable) {
        Page<ReviewResponse> reviews = reviewService.getReviewsByProduct(productId, pageable);
        return ResponseEntity.ok(reviews);
    }

    @GetMapping("/product/{productId}/all")
    public ResponseEntity<List<ReviewResponse>> getAllReviewsByProduct(
            @PathVariable Long productId) {
        List<ReviewResponse> reviews = reviewService.getReviewsByProduct(productId);
        return ResponseEntity.ok(reviews);
    }

    @GetMapping("/product/{productId}/average-rating")
    public ResponseEntity<Double> getAverageRatingByProduct(@PathVariable Long productId) {
        Double averageRating = reviewService.getAverageRatingByProduct(productId);
        return ResponseEntity.ok(averageRating);
    }

    @GetMapping("/product/{productId}/count")
    public ResponseEntity<Long> getReviewCountByProduct(@PathVariable Long productId) {
        Long count = reviewService.getReviewCountByProduct(productId);
        return ResponseEntity.ok(count);
    }

    @PutMapping("/{reviewId}")
    public ResponseEntity<ReviewResponse> updateReview(
            @PathVariable Long reviewId,
            @Valid @RequestBody ReviewRequest request,
            Principal principal) {
        // In a real application, you would extract user ID from JWT token
        Long userId = 1L; // Placeholder - should come from security context
        ReviewResponse response = reviewService.updateReview(reviewId, userId, request);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{reviewId}")
    public ResponseEntity<Void> deleteReview(
            @PathVariable Long reviewId,
            Principal principal) {
        // In a real application, you would extract user ID from JWT token
        Long userId = 1L; // Placeholder - should come from security context
        reviewService.deleteReview(reviewId, userId);
        return ResponseEntity.noContent().build();
    }
}