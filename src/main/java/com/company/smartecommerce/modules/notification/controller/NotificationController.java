package com.company.smartecommerce.modules.notification.controller;

import com.company.smartecommerce.modules.notification.dto.NotificationRequest;
import com.company.smartecommerce.modules.notification.dto.NotificationResponse;
import com.company.smartecommerce.modules.notification.service.NotificationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
public class NotificationController {
    private final NotificationService notificationService;

    @PostMapping
    public ResponseEntity<NotificationResponse> createNotification(
            @Valid @RequestBody NotificationRequest request,
            Principal principal) {
        // Only admin or system should be able to create notifications
        // For now, using a placeholder - in real app, check for admin role
        NotificationResponse response = notificationService.createNotification(request);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/user")
    public ResponseEntity<Page<NotificationResponse>> getUserNotifications(
            Pageable pageable,
            Principal principal) {
        // In a real application, you would extract user ID from JWT token
        Long userId = 1L; // Placeholder - should come from security context
        Page<NotificationResponse> notifications = notificationService.getUserNotifications(userId, pageable);
        return ResponseEntity.ok(notifications);
    }

    @GetMapping("/user/unread")
    public ResponseEntity<List<NotificationResponse>> getUnreadNotifications(
            Principal principal) {
        // In a real application, you would extract user ID from JWT token
        Long userId = 1L; // Placeholder - should come from security context
        List<NotificationResponse> notifications = notificationService.getUnreadNotifications(userId);
        return ResponseEntity.ok(notifications);
    }

    @GetMapping("/user/unread/count")
    public ResponseEntity<Long> getUnreadNotificationCount(
            Principal principal) {
        // In a real application, you would extract user ID from JWT token
        Long userId = 1L; // Placeholder - should come from security context
        Long count = notificationService.getUnreadNotificationCount(userId);
        return ResponseEntity.ok(count);
    }

    @GetMapping("/user/type/{type}")
    public ResponseEntity<List<NotificationResponse>> getNotificationsByType(
            @PathVariable String type,
            Principal principal) {
        // In a real application, you would extract user ID from JWT token
        Long userId = 1L; // Placeholder - should come from security context
        com.company.smartecommerce.modules.notification.domain.entity.NotificationType notificationType = 
            com.company.smartecommerce.modules.notification.domain.entity.NotificationType.valueOf(type.toUpperCase());
        List<NotificationResponse> notifications = notificationService.getNotificationsByType(userId, notificationType);
        return ResponseEntity.ok(notifications);
    }

    @PutMapping("/{notificationId}/read")
    public ResponseEntity<NotificationResponse> markNotificationAsRead(
            @PathVariable Long notificationId,
            Principal principal) {
        // In a real application, you would extract user ID from JWT token
        Long userId = 1L; // Placeholder - should come from security context
        NotificationResponse response = notificationService.markAsRead(notificationId, userId);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/read-all")
    public ResponseEntity<Void> markAllNotificationsAsRead(
            Principal principal) {
        // In a real application, you would extract user ID from JWT token
        Long userId = 1L; // Placeholder - should come from security context
        notificationService.markAllAsRead(userId);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{notificationId}")
    public ResponseEntity<Void> deleteNotification(
            @PathVariable Long notificationId,
            Principal principal) {
        // In a real application, you would extract user ID from JWT token
        Long userId = 1L; // Placeholder - should come from security context
        notificationService.deleteNotification(notificationId, userId);
        return ResponseEntity.noContent().build();
    }
}