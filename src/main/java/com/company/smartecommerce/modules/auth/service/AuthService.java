package com.company.smartecommerce.modules.auth.service;

import com.company.smartecommerce.modules.auth.dto.AuthResponse;
import com.company.smartecommerce.modules.auth.dto.LoginRequest;
import com.company.smartecommerce.modules.auth.dto.RegisterRequest;

public interface AuthService {
    AuthResponse register(RegisterRequest request);
    AuthResponse login(LoginRequest request);
    AuthResponse refreshToken(String refreshToken);
}