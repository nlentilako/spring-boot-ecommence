package com.company.smartecommerce.modules.order.service;

import com.company.smartecommerce.modules.order.dto.OrderRequestDto;
import com.company.smartecommerce.modules.order.dto.OrderResponseDto;

import java.util.List;

public interface OrderService {
    OrderResponseDto createOrder(Long userId, OrderRequestDto requestDto);
    OrderResponseDto getOrderById(Long orderId);
    List<OrderResponseDto> getOrdersByUserId(Long userId);
    List<OrderResponseDto> getAllOrders();
    OrderResponseDto updateOrderStatus(Long orderId, String status);
    OrderResponseDto cancelOrder(Long orderId);
}