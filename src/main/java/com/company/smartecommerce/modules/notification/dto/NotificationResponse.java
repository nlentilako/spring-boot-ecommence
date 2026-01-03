package com.company.smartecommerce.modules.notification.dto;

import com.company.smartecommerce.modules.notification.domain.entity.NotificationType;
import com.company.smartecommerce.modules.user.dto.UserResponse;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class NotificationResponse {
    private Long id;
    private UserResponse user;
    private String title;
    private String message;
    private NotificationType type;
    private Boolean isRead;
    private Boolean isActive;
    private LocalDateTime createdAt;
    private LocalDateTime readAt;
}