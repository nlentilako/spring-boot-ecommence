package com.company.smartecommerce.modules.notification.mapper;

import com.company.smartecommerce.modules.notification.domain.entity.Notification;
import com.company.smartecommerce.modules.notification.dto.NotificationRequest;
import com.company.smartecommerce.modules.notification.dto.NotificationResponse;
import com.company.smartecommerce.modules.user.mapper.UserMapper;
import org.springframework.stereotype.Component;

@Component
public class NotificationMapper {
    private final UserMapper userMapper;

    public NotificationMapper(UserMapper userMapper) {
        this.userMapper = userMapper;
    }

    public Notification toEntity(NotificationRequest request) {
        return Notification.builder()
                .title(request.getTitle())
                .message(request.getMessage())
                .type(request.getType())
                .isRead(false)
                .isActive(true)
                .build();
    }

    public NotificationResponse toResponse(Notification notification) {
        return NotificationResponse.builder()
                .id(notification.getId())
                .user(userMapper.toResponse(notification.getUser()))
                .title(notification.getTitle())
                .message(notification.getMessage())
                .type(notification.getType())
                .isRead(notification.getIsRead())
                .isActive(notification.getIsActive())
                .createdAt(notification.getCreatedAt())
                .readAt(notification.getReadAt())
                .build();
    }
}