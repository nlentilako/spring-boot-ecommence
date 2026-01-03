package com.company.smartecommerce.modules.recommendation.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RecommendationResponse {

    private Long id;
    private Long userId;
    private Long productId;
    private Double recommendationScore;
    private String reason;
    private LocalDateTime createdAt;
}