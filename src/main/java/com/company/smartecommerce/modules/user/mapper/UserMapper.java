package com.company.smartecommerce.modules.user.mapper;

import com.company.smartecommerce.modules.user.domain.entity.User;
import com.company.smartecommerce.modules.user.dto.UserRequest;
import com.company.smartecommerce.modules.user.dto.UserResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface UserMapper {

    UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "password", expression = "java(org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder().encode(request.getPassword()))")
    User toEntity(UserRequest request);

    UserResponse toResponse(User user);
}