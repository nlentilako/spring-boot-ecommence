package com.company.smartecommerce.modules.analytics.controller;

import com.company.smartecommerce.modules.analytics.dto.AnalyticsRequest;
import com.company.smartecommerce.modules.analytics.dto.AnalyticsResponse;
import com.company.smartecommerce.modules.analytics.service.AnalyticsService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/v1/analytics")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AnalyticsController {

    private final AnalyticsService analyticsService;

    @GetMapping
    public ResponseEntity<Page<AnalyticsResponse>> getAllAnalytics(Pageable pageable) {
        Page<AnalyticsResponse> analytics = analyticsService.getAllAnalytics(pageable);
        return ResponseEntity.ok(analytics);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AnalyticsResponse> getAnalyticsById(@PathVariable Long id) {
        AnalyticsResponse analytics = analyticsService.getAnalyticsById(id);
        return ResponseEntity.ok(analytics);
    }

    @PostMapping
    public ResponseEntity<AnalyticsResponse> createAnalytics(@Valid @RequestBody AnalyticsRequest request) {
        AnalyticsResponse analytics = analyticsService.createAnalytics(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(analytics);
    }

    @PutMapping("/{id}")
    public ResponseEntity<AnalyticsResponse> updateAnalytics(
            @PathVariable Long id,
            @Valid @RequestBody AnalyticsRequest request) {
        AnalyticsResponse analytics = analyticsService.updateAnalytics(id, request);
        return ResponseEntity.ok(analytics);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAnalytics(@PathVariable Long id) {
        analyticsService.deleteAnalytics(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/date-range")
    public ResponseEntity<List<AnalyticsResponse>> getAnalyticsByDateRange(
            @RequestParam LocalDateTime startDate,
            @RequestParam LocalDateTime endDate) {
        List<AnalyticsResponse> analytics = analyticsService.getAnalyticsByDateRange(startDate, endDate);
        return ResponseEntity.ok(analytics);
    }

    @GetMapping("/metric/{metricName}")
    public ResponseEntity<List<AnalyticsResponse>> getAnalyticsByMetricName(
            @PathVariable String metricName) {
        List<AnalyticsResponse> analytics = analyticsService.getAnalyticsByMetricName(metricName);
        return ResponseEntity.ok(analytics);
    }
}