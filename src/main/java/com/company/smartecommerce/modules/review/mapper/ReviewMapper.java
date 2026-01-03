package com.company.smartecommerce.modules.review.mapper;

import com.company.smartecommerce.modules.review.domain.entity.Review;
import com.company.smartecommerce.modules.review.dto.ReviewRequest;
import com.company.smartecommerce.modules.review.dto.ReviewResponse;
import com.company.smartecommerce.modules.user.mapper.UserMapper;
import org.springframework.stereotype.Component;

@Component
public class ReviewMapper {
    private final UserMapper userMapper;

    public ReviewMapper(UserMapper userMapper) {
        this.userMapper = userMapper;
    }

    public Review toEntity(ReviewRequest request) {
        return Review.builder()
                .rating(request.getRating())
                .comment(request.getComment())
                .isVerifiedPurchase(request.getIsVerifiedPurchase())
                .isActive(true)
                .build();
    }

    public ReviewResponse toResponse(Review review) {
        return ReviewResponse.builder()
                .id(review.getId())
                .user(userMapper.toResponse(review.getUser()))
                .productId(review.getProduct().getId())
                .rating(review.getRating())
                .comment(review.getComment())
                .isVerifiedPurchase(review.getIsVerifiedPurchase())
                .isActive(review.getIsActive())
                .createdAt(review.getCreatedAt())
                .updatedAt(review.getUpdatedAt())
                .build();
    }
}