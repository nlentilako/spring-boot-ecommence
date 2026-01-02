package com.company.smartecommerce.security;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthFilter;
    private final UserDetailsService userDetailsService;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService);
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf(csrf -> csrf.disable())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(authz -> authz
                        // Public endpoints
                        .requestMatchers("/api/v1/auth/**").permitAll()
                        .requestMatchers("/swagger-ui/**", "/v3/api-docs/**").permitAll()
                        
                        // Admin only endpoints
                        .requestMatchers("/api/v1/admin/**").hasRole("ADMIN")
                        
                        // User endpoints (authenticated users)
                        .requestMatchers("/api/v1/users/**").hasAnyRole("ADMIN", "CUSTOMER", "SELLER")
                        .requestMatchers("/api/v1/products/**").hasAnyRole("ADMIN", "SELLER", "CUSTOMER")
                        .requestMatchers("/api/v1/categories/**").hasAnyRole("ADMIN", "SELLER", "CUSTOMER")
                        .requestMatchers("/api/v1/cart/**").hasAnyRole("CUSTOMER")
                        .requestMatchers("/api/v1/orders/**").hasAnyRole("ADMIN", "CUSTOMER")
                        .requestMatchers("/api/v1/payments/**").hasAnyRole("ADMIN", "CUSTOMER")
                        .requestMatchers("/api/v1/inventory/**").hasAnyRole("ADMIN", "SELLER")
                        .requestMatchers("/api/v1/shipping/**").hasAnyRole("ADMIN", "CUSTOMER")
                        .requestMatchers("/api/v1/reviews/**").hasAnyRole("ADMIN", "CUSTOMER")
                        .requestMatchers("/api/v1/recommendations/**").hasAnyRole("ADMIN", "CUSTOMER")
                        .requestMatchers("/api/v1/notifications/**").hasAnyRole("ADMIN", "CUSTOMER")
                        .requestMatchers("/api/v1/analytics/**").hasAnyRole("ADMIN")
                        
                        // All other requests require authentication
                        .anyRequest().authenticated()
                );

        http.authenticationProvider(authenticationProvider());
        http.addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}