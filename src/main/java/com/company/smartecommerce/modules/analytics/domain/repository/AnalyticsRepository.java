package com.company.smartecommerce.modules.analytics.domain.repository;

import com.company.smartecommerce.modules.analytics.domain.entity.Analytics;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface AnalyticsRepository extends JpaRepository<Analytics, Long> {
    
    @Query("SELECT a FROM Analytics a WHERE a.metricDate BETWEEN :startDate AND :endDate")
    List<Analytics> findByMetricDateBetween(LocalDateTime startDate, LocalDateTime endDate);
    
    @Query("SELECT a FROM Analytics a WHERE a.metricName = :metricName ORDER BY a.metricDate DESC")
    List<Analytics> findByMetricNameOrderByDateDesc(String metricName);
}