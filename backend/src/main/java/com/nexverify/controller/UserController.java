package com.nexverify.controller;

import com.nexverify.dto.ProfileResponseDTO;
import com.nexverify.model.User;
import com.nexverify.model.UserWallet;
import com.nexverify.repo.UserRepository;
import com.nexverify.service.JWTService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserRepository userRepository;
    private final JWTService jwtService;

    @GetMapping("/profile")
    public ResponseEntity<ProfileResponseDTO> getProfile(@RequestHeader("Authorization") String authHeader) {
        String token = extractToken(authHeader);
        UUID userId = jwtService.extractUserId(token);

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        UserWallet wallet = user.getWallet();

        ProfileResponseDTO response = ProfileResponseDTO.builder()
                .userId(user.getId())
                .phoneNumber(user.getPhoneNumber())
                .email(user.getEmail())
                .fullName(user.getFullName())
                .walletBalance(wallet != null ? wallet.getBalance() : 0)
                .tier(wallet != null ? wallet.getTier().toString() : "BRONZE")
                .createdAt(user.getCreatedAt().toString())
                .build();

        return ResponseEntity.ok(response);
    }

    @GetMapping("/wallet")
    public ResponseEntity<Map<String, Object>> getWallet(@RequestHeader("Authorization") String authHeader) {
        String token = extractToken(authHeader);
        UUID userId = jwtService.extractUserId(token);

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        UserWallet wallet = user.getWallet();

        return ResponseEntity.ok(Map.of(
                "balance", wallet != null ? wallet.getBalance() : 0,
                "tier", wallet != null ? wallet.getTier().toString() : "BRONZE",
                "userId", userId.toString(),
                "lastUpdated", wallet != null ? wallet.getUpdatedAt().toString() : ""
        ));
    }

    @PutMapping("/profile")
    public ResponseEntity<User> updateProfile(
            @RequestHeader("Authorization") String authHeader,
            @RequestBody Map<String, String> updates) {

        String token = extractToken(authHeader);
        UUID userId = jwtService.extractUserId(token);

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Update fields if provided
        if (updates.containsKey("fullName")) {
            user.setFullName(updates.get("fullName"));
        }
        if (updates.containsKey("email")) {
            user.setEmail(updates.get("email"));
        }

        User updatedUser = userRepository.save(user);
        return ResponseEntity.ok(updatedUser);
    }

    private String extractToken(String authHeader) {
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            return authHeader.substring(7);
        }
        throw new RuntimeException("Invalid authorization header");
    }
}