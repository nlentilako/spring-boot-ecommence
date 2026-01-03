package com.company.smartecommerce.modules.recommendation.mapper;

import com.company.smartecommerce.modules.recommendation.domain.entity.Recommendation;
import com.company.smartecommerce.modules.recommendation.dto.RecommendationRequest;
import com.company.smartecommerce.modules.recommendation.dto.RecommendationResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface RecommendationMapper {

    RecommendationMapper INSTANCE = Mappers.getMapper(RecommendationMapper.class);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "user", ignore = true)
    @Mapping(target = "product", ignore = true)
    Recommendation toEntity(RecommendationRequest request);

    @Mapping(source = "user.id", target = "userId")
    @Mapping(source = "product.id", target = "productId")
    RecommendationResponse toResponse(Recommendation entity);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "user", ignore = true)
    @Mapping(target = "product", ignore = true)
    void updateEntityFromRequest(RecommendationRequest request, @MappingTarget Recommendation entity);
}