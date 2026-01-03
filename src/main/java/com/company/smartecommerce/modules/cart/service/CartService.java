package com.company.smartecommerce.modules.cart.service;

import com.company.smartecommerce.modules.cart.dto.CartRequestDto;
import com.company.smartecommerce.modules.cart.dto.CartResponseDto;

public interface CartService {
    CartResponseDto getCartByUserId(Long userId);
    CartResponseDto addItemToCart(Long userId, CartRequestDto requestDto);
    CartResponseDto updateItemQuantity(Long userId, Long productId, Integer quantity);
    void removeItemFromCart(Long userId, Long productId);
    void clearCart(Long userId);
    CartResponseDto updateCart(Long userId, CartRequestDto requestDto);
}