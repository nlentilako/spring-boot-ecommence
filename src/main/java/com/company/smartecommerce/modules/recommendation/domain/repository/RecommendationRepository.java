package com.company.smartecommerce.modules.recommendation.domain.repository;

import com.company.smartecommerce.modules.recommendation.domain.entity.Recommendation;
import com.company.smartecommerce.modules.user.domain.entity.User;
import com.company.smartecommerce.modules.product.domain.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecommendationRepository extends JpaRepository<Recommendation, Long> {
    
    List<Recommendation> findByUser_Id(Long userId);
    
    List<Recommendation> findByProduct_Id(Long productId);
    
    @Query("SELECT r FROM Recommendation r WHERE r.user.id = :userId ORDER BY r.recommendationScore DESC")
    List<Recommendation> findByUserIdOrderByScoreDesc(Long userId);
}