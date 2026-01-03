package com.company.smartecommerce.modules.review.service;

import com.company.smartecommerce.exception.ResourceNotFoundException;
import com.company.smartecommerce.modules.product.domain.entity.Product;
import com.company.smartecommerce.modules.product.domain.repository.ProductRepository;
import com.company.smartecommerce.modules.review.domain.entity.Review;
import com.company.smartecommerce.modules.review.domain.repository.ReviewRepository;
import com.company.smartecommerce.modules.review.dto.ReviewRequest;
import com.company.smartecommerce.modules.review.dto.ReviewResponse;
import com.company.smartecommerce.modules.review.mapper.ReviewMapper;
import com.company.smartecommerce.modules.user.domain.entity.User;
import com.company.smartecommerce.modules.user.domain.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class ReviewService {
    private final ReviewRepository reviewRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final ReviewMapper reviewMapper;

    public ReviewResponse createReview(Long userId, ReviewRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));

        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + request.getProductId()));

        // Check if user already reviewed this product
        if (reviewRepository.findByUserIdAndProductId(userId, request.getProductId()).isPresent()) {
            throw new IllegalArgumentException("User has already reviewed this product");
        }

        Review review = reviewMapper.toEntity(request);
        review.setUser(user);
        review.setProduct(product);

        Review savedReview = reviewRepository.save(review);
        return reviewMapper.toResponse(savedReview);
    }

    @Transactional(readOnly = true)
    public Page<ReviewResponse> getReviewsByProduct(Long productId, Pageable pageable) {
        return reviewRepository.findByProductId(productId, pageable)
                .map(reviewMapper::toResponse);
    }

    @Transactional(readOnly = true)
    public List<ReviewResponse> getReviewsByProduct(Long productId) {
        return reviewRepository.findByProductId(productId)
                .stream()
                .map(reviewMapper::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public Double getAverageRatingByProduct(Long productId) {
        return reviewRepository.findAverageRatingByProductId(productId);
    }

    @Transactional(readOnly = true)
    public Long getReviewCountByProduct(Long productId) {
        return reviewRepository.countByProductId(productId);
    }

    public ReviewResponse updateReview(Long reviewId, Long userId, ReviewRequest request) {
        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new ResourceNotFoundException("Review not found with id: " + reviewId));

        if (!review.getUser().getId().equals(userId)) {
            throw new SecurityException("User does not have permission to update this review");
        }

        review.setRating(request.getRating());
        review.setComment(request.getComment());
        review.setIsVerifiedPurchase(request.getIsVerifiedPurchase());

        Review updatedReview = reviewRepository.save(review);
        return reviewMapper.toResponse(updatedReview);
    }

    public void deleteReview(Long reviewId, Long userId) {
        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new ResourceNotFoundException("Review not found with id: " + reviewId));

        if (!review.getUser().getId().equals(userId) && !isAdmin()) {
            throw new SecurityException("User does not have permission to delete this review");
        }

        review.setIsActive(false); // Soft delete
        reviewRepository.save(review);
    }

    // Helper method to check admin status (implement based on your security setup)
    private boolean isAdmin() {
        // This would typically check user roles from security context
        return false;
    }
}