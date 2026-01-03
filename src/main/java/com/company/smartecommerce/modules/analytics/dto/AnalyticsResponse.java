package com.company.smartecommerce.modules.analytics.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AnalyticsResponse {

    private Long id;
    private String metricName;
    private Double metricValue;
    private LocalDateTime metricDate;
    private LocalDateTime createdAt;
}