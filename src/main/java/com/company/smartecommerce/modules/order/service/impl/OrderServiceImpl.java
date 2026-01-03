package com.company.smartecommerce.modules.order.service.impl;

import com.company.smartecommerce.exception.ResourceNotFoundException;
import com.company.smartecommerce.modules.order.domain.Order;
import com.company.smartecommerce.modules.order.domain.OrderItem;
import com.company.smartecommerce.modules.order.domain.OrderStatus;
import com.company.smartecommerce.modules.order.dto.OrderRequestDto;
import com.company.smartecommerce.modules.order.dto.OrderResponseDto;
import com.company.smartecommerce.modules.order.mapper.OrderMapper;
import com.company.smartecommerce.modules.order.service.OrderService;
import com.company.smartecommerce.modules.product.domain.Product;
import com.company.smartecommerce.modules.product.service.ProductService;
import com.company.smartecommerce.modules.user.domain.User;
import com.company.smartecommerce.modules.user.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class OrderServiceImpl implements OrderService {

    private final OrderMapper orderMapper;
    private final UserService userService;
    private final ProductService productService;

    @Override
    @Transactional
    public OrderResponseDto createOrder(Long userId, OrderRequestDto requestDto) {
        User user = userService.findById(userId);

        // Calculate total amount
        BigDecimal totalAmount = requestDto.getItems().stream()
                .map(item -> item.getPrice().multiply(BigDecimal.valueOf(item.getQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        // Generate unique order number
        String orderNumber = generateOrderNumber();

        // Create order
        Order order = Order.builder()
                .user(user)
                .orderNumber(orderNumber)
                .status(OrderStatus.PENDING)
                .totalAmount(totalAmount)
                .shippingAddress(requestDto.getShippingAddress())
                .billingAddress(requestDto.getBillingAddress())
                .paymentMethod(requestDto.getPaymentMethod())
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        // Create order items
        List<OrderItem> orderItems = requestDto.getItems().stream()
                .map(item -> createOrderItem(order, item))
                .toList();

        order.setOrderItems(orderItems);

        // For now, just return the mapped response - in a real app, we'd save to DB
        return orderMapper.toResponseDto(order);
    }

    @Override
    @Transactional(readOnly = true)
    public OrderResponseDto getOrderById(Long orderId) {
        // In a real app, this would fetch from DB
        // For now, we'll throw an exception as we don't have a DB implementation
        throw new ResourceNotFoundException("Order not found: " + orderId);
    }

    @Override
    @Transactional(readOnly = true)
    public List<OrderResponseDto> getOrdersByUserId(Long userId) {
        // In a real app, this would fetch from DB
        throw new ResourceNotFoundException("Orders not found for user: " + userId);
    }

    @Override
    @Transactional(readOnly = true)
    public List<OrderResponseDto> getAllOrders() {
        // In a real app, this would fetch from DB
        throw new ResourceNotFoundException("No orders found");
    }

    @Override
    @Transactional
    public OrderResponseDto updateOrderStatus(Long orderId, String status) {
        // In a real app, this would update in DB
        throw new ResourceNotFoundException("Order not found: " + orderId);
    }

    @Override
    @Transactional
    public OrderResponseDto cancelOrder(Long orderId) {
        // In a real app, this would update in DB
        throw new ResourceNotFoundException("Order not found: " + orderId);
    }

    private OrderItem createOrderItem(Order order, com.company.smartecommerce.modules.order.dto.OrderItemRequestDto itemRequest) {
        Product product = productService.findById(itemRequest.getProductId());

        return OrderItem.builder()
                .order(order)
                .product(product)
                .quantity(itemRequest.getQuantity())
                .price(itemRequest.getPrice())
                .totalPrice(itemRequest.getPrice().multiply(BigDecimal.valueOf(itemRequest.getQuantity())))
                .build();
    }

    private String generateOrderNumber() {
        return "ORD-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
    }
}