package com.company.smartecommerce.modules.auth.service.impl;

import com.company.smartecommerce.common.enums.Role;
import com.company.smartecommerce.common.utils.JwtUtil;
import com.company.smartecommerce.exception.BadRequestException;
import com.company.smartecommerce.modules.auth.dto.AuthResponse;
import com.company.smartecommerce.modules.auth.dto.LoginRequest;
import com.company.smartecommerce.modules.auth.dto.RegisterRequest;
import com.company.smartecommerce.modules.auth.dto.UserDto;
import com.company.smartecommerce.modules.auth.mapper.AuthMapper;
import com.company.smartecommerce.modules.auth.service.AuthService;
import com.company.smartecommerce.modules.user.domain.entity.User;
import com.company.smartecommerce.modules.user.domain.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;
    private final AuthMapper authMapper;

    @Override
    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new BadRequestException("Email already exists");
        }

        User user = User.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .role(Role.CUSTOMER) // Default role for registration
                .enabled(true)
                .build();

        User savedUser = userRepository.save(user);

        String accessToken = jwtUtil.generateToken(savedUser.getEmail());
        String refreshToken = jwtUtil.generateRefreshToken(savedUser.getEmail());

        UserDto userDto = authMapper.toUserDto(savedUser);

        return AuthResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .expiresIn(jwtUtil.extractExpiration(accessToken).getTime())
                .user(userDto)
                .build();
    }

    @Override
    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        String accessToken = jwtUtil.generateToken(user.getEmail());
        String refreshToken = jwtUtil.generateRefreshToken(user.getEmail());

        UserDto userDto = authMapper.toUserDto(user);

        return AuthResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .expiresIn(jwtUtil.extractExpiration(accessToken).getTime())
                .user(userDto)
                .build();
    }

    @Override
    public AuthResponse refreshToken(String refreshToken) {
        String username = jwtUtil.extractUsername(refreshToken);

        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        if (jwtUtil.validateToken(refreshToken, username)) {
            String newAccessToken = jwtUtil.generateToken(username);
            String newRefreshToken = jwtUtil.generateRefreshToken(username);

            UserDto userDto = authMapper.toUserDto(user);

            return AuthResponse.builder()
                    .accessToken(newAccessToken)
                    .refreshToken(newRefreshToken)
                    .expiresIn(jwtUtil.extractExpiration(newAccessToken).getTime())
                    .user(userDto)
                    .build();
        }

        throw new BadRequestException("Invalid refresh token");
    }
}