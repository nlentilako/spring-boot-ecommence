package com.company.smartecommerce.modules.notification.domain.repository;

import com.company.smartecommerce.modules.notification.domain.entity.Notification;
import com.company.smartecommerce.modules.notification.domain.entity.NotificationType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {
    Page<Notification> findByUserId(Long userId, Pageable pageable);
    
    List<Notification> findByUserIdAndIsReadFalse(Long userId);
    
    List<Notification> findByUserIdAndType(Long userId, NotificationType type);
    
    long countByUserIdAndIsReadFalse(Long userId);
}