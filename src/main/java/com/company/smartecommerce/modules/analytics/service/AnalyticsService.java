package com.company.smartecommerce.modules.analytics.service;

import com.company.smartecommerce.modules.analytics.domain.entity.Analytics;
import com.company.smartecommerce.modules.analytics.domain.repository.AnalyticsRepository;
import com.company.smartecommerce.modules.analytics.dto.AnalyticsRequest;
import com.company.smartecommerce.modules.analytics.dto.AnalyticsResponse;
import com.company.smartecommerce.modules.analytics.mapper.AnalyticsMapper;
import com.company.smartecommerce.common.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AnalyticsService {

    private final AnalyticsRepository analyticsRepository;
    private final AnalyticsMapper analyticsMapper;

    @Transactional(readOnly = true)
    public Page<AnalyticsResponse> getAllAnalytics(Pageable pageable) {
        Page<Analytics> analytics = analyticsRepository.findAll(pageable);
        return analytics.map(analyticsMapper::toResponse);
    }

    @Transactional(readOnly = true)
    public AnalyticsResponse getAnalyticsById(Long id) {
        Analytics analytics = findAnalyticsById(id);
        return analyticsMapper.toResponse(analytics);
    }

    @Transactional
    public AnalyticsResponse createAnalytics(AnalyticsRequest request) {
        Analytics analytics = analyticsMapper.toEntity(request);
        Analytics savedAnalytics = analyticsRepository.save(analytics);
        return analyticsMapper.toResponse(savedAnalytics);
    }

    @Transactional
    public AnalyticsResponse updateAnalytics(Long id, AnalyticsRequest request) {
        Analytics analytics = findAnalyticsById(id);
        analyticsMapper.updateEntityFromRequest(request, analytics);
        Analytics updatedAnalytics = analyticsRepository.save(analytics);
        return analyticsMapper.toResponse(updatedAnalytics);
    }

    @Transactional
    public void deleteAnalytics(Long id) {
        Analytics analytics = findAnalyticsById(id);
        analyticsRepository.delete(analytics);
    }

    @Transactional(readOnly = true)
    public List<AnalyticsResponse> getAnalyticsByDateRange(LocalDateTime startDate, LocalDateTime endDate) {
        List<Analytics> analytics = analyticsRepository.findByMetricDateBetween(startDate, endDate);
        return analytics.stream()
                .map(analyticsMapper::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<AnalyticsResponse> getAnalyticsByMetricName(String metricName) {
        List<Analytics> analytics = analyticsRepository.findByMetricNameOrderByDateDesc(metricName);
        return analytics.stream()
                .map(analyticsMapper::toResponse)
                .toList();
    }

    private Analytics findAnalyticsById(Long id) {
        return analyticsRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Analytics not found with id: " + id));
    }
}