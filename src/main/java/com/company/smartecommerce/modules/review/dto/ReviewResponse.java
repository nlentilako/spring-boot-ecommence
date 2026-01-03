package com.company.smartecommerce.modules.review.dto;

import com.company.smartecommerce.modules.user.dto.UserResponse;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReviewResponse {
    private Long id;
    private UserResponse user;
    private Long productId;
    private Integer rating;
    private String comment;
    private Boolean isVerifiedPurchase;
    private Boolean isActive;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}