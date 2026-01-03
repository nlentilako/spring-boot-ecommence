package com.company.smartecommerce.modules.notification.service;

import com.company.smartecommerce.exception.ResourceNotFoundException;
import com.company.smartecommerce.modules.notification.domain.entity.Notification;
import com.company.smartecommerce.modules.notification.domain.repository.NotificationRepository;
import com.company.smartecommerce.modules.notification.dto.NotificationRequest;
import com.company.smartecommerce.modules.notification.dto.NotificationResponse;
import com.company.smartecommerce.modules.notification.mapper.NotificationMapper;
import com.company.smartecommerce.modules.user.domain.entity.User;
import com.company.smartecommerce.modules.user.domain.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class NotificationService {
    private final NotificationRepository notificationRepository;
    private final UserRepository userRepository;
    private final NotificationMapper notificationMapper;

    public NotificationResponse createNotification(NotificationRequest request) {
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + request.getUserId()));

        Notification notification = notificationMapper.toEntity(request);
        notification.setUser(user);

        Notification savedNotification = notificationRepository.save(notification);
        return notificationMapper.toResponse(savedNotification);
    }

    @Transactional(readOnly = true)
    public Page<NotificationResponse> getUserNotifications(Long userId, Pageable pageable) {
        return notificationRepository.findByUserId(userId, pageable)
                .map(notificationMapper::toResponse);
    }

    @Transactional(readOnly = true)
    public List<NotificationResponse> getUnreadNotifications(Long userId) {
        return notificationRepository.findByUserIdAndIsReadFalse(userId)
                .stream()
                .map(notificationMapper::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<NotificationResponse> getNotificationsByType(Long userId, com.company.smartecommerce.modules.notification.domain.entity.NotificationType type) {
        return notificationRepository.findByUserIdAndType(userId, type)
                .stream()
                .map(notificationMapper::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public Long getUnreadNotificationCount(Long userId) {
        return notificationRepository.countByUserIdAndIsReadFalse(userId);
    }

    public NotificationResponse markAsRead(Long notificationId, Long userId) {
        Notification notification = notificationRepository.findById(notificationId)
                .orElseThrow(() -> new ResourceNotFoundException("Notification not found with id: " + notificationId));

        if (!notification.getUser().getId().equals(userId)) {
            throw new SecurityException("User does not have permission to access this notification");
        }

        notification.setIsRead(true);
        notification.setReadAt(LocalDateTime.now());

        Notification updatedNotification = notificationRepository.save(notification);
        return notificationMapper.toResponse(updatedNotification);
    }

    public void markAllAsRead(Long userId) {
        List<Notification> unreadNotifications = notificationRepository.findByUserIdAndIsReadFalse(userId);
        unreadNotifications.forEach(notification -> {
            notification.setIsRead(true);
            notification.setReadAt(LocalDateTime.now());
        });
        notificationRepository.saveAll(unreadNotifications);
    }

    public void deleteNotification(Long notificationId, Long userId) {
        Notification notification = notificationRepository.findById(notificationId)
                .orElseThrow(() -> new ResourceNotFoundException("Notification not found with id: " + notificationId));

        if (!notification.getUser().getId().equals(userId) && !isAdmin()) {
            throw new SecurityException("User does not have permission to delete this notification");
        }

        notification.setIsActive(false); // Soft delete
        notificationRepository.save(notification);
    }

    // Helper method to check admin status (implement based on your security setup)
    private boolean isAdmin() {
        // This would typically check user roles from security context
        return false;
    }
}