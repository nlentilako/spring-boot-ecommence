package com.company.smartecommerce.modules.recommendation.service;

import com.company.smartecommerce.modules.recommendation.domain.entity.Recommendation;
import com.company.smartecommerce.modules.recommendation.domain.repository.RecommendationRepository;
import com.company.smartecommerce.modules.recommendation.dto.RecommendationRequest;
import com.company.smartecommerce.modules.recommendation.dto.RecommendationResponse;
import com.company.smartecommerce.modules.recommendation.mapper.RecommendationMapper;
import com.company.smartecommerce.common.exception.ResourceNotFoundException;
import com.company.smartecommerce.modules.user.domain.entity.User;
import com.company.smartecommerce.modules.user.domain.repository.UserRepository;
import com.company.smartecommerce.modules.product.domain.entity.Product;
import com.company.smartecommerce.modules.product.domain.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RecommendationService {

    private final RecommendationRepository recommendationRepository;
    private final RecommendationMapper recommendationMapper;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    @Transactional(readOnly = true)
    public Page<RecommendationResponse> getAllRecommendations(Pageable pageable) {
        Page<Recommendation> recommendations = recommendationRepository.findAll(pageable);
        return recommendations.map(recommendationMapper::toResponse);
    }

    @Transactional(readOnly = true)
    public RecommendationResponse getRecommendationById(Long id) {
        Recommendation recommendation = findRecommendationById(id);
        return recommendationMapper.toResponse(recommendation);
    }

    @Transactional
    public RecommendationResponse createRecommendation(RecommendationRequest request) {
        User user = findUserById(request.getUserId());
        Product product = findProductById(request.getProductId());

        Recommendation recommendation = recommendationMapper.toEntity(request);
        recommendation.setUser(user);
        recommendation.setProduct(product);

        Recommendation savedRecommendation = recommendationRepository.save(recommendation);
        return recommendationMapper.toResponse(savedRecommendation);
    }

    @Transactional
    public RecommendationResponse updateRecommendation(Long id, RecommendationRequest request) {
        Recommendation recommendation = findRecommendationById(id);
        
        User user = findUserById(request.getUserId());
        Product product = findProductById(request.getProductId());

        recommendationMapper.updateEntityFromRequest(request, recommendation);
        recommendation.setUser(user);
        recommendation.setProduct(product);

        Recommendation updatedRecommendation = recommendationRepository.save(recommendation);
        return recommendationMapper.toResponse(updatedRecommendation);
    }

    @Transactional
    public void deleteRecommendation(Long id) {
        Recommendation recommendation = findRecommendationById(id);
        recommendationRepository.delete(recommendation);
    }

    @Transactional(readOnly = true)
    public List<RecommendationResponse> getRecommendationsByUserId(Long userId) {
        List<Recommendation> recommendations = recommendationRepository.findByUserIdOrderByScoreDesc(userId);
        return recommendations.stream()
                .map(recommendationMapper::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<RecommendationResponse> getRecommendationsByProductId(Long productId) {
        List<Recommendation> recommendations = recommendationRepository.findByProduct_Id(productId);
        return recommendations.stream()
                .map(recommendationMapper::toResponse)
                .toList();
    }

    private Recommendation findRecommendationById(Long id) {
        return recommendationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Recommendation not found with id: " + id));
    }

    private User findUserById(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));
    }

    private Product findProductById(Long productId) {
        return productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + productId));
    }
}