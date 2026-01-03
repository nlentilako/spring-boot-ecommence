package com.company.smartecommerce.modules.analytics.mapper;

import com.company.smartecommerce.modules.analytics.domain.entity.Analytics;
import com.company.smartecommerce.modules.analytics.dto.AnalyticsRequest;
import com.company.smartecommerce.modules.analytics.dto.AnalyticsResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface AnalyticsMapper {

    AnalyticsMapper INSTANCE = Mappers.getMapper(AnalyticsMapper.class);

    @Mapping(target = "id", ignore = true)
    Analytics toEntity(AnalyticsRequest request);

    AnalyticsResponse toResponse(Analytics entity);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    void updateEntityFromRequest(AnalyticsRequest request, @MappingTarget Analytics entity);
}