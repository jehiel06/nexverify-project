package com.nexverify.controller;

import com.nexverify.dto.AuthRequestDTO;
import com.nexverify.dto.AuthResponseDTO;
import com.nexverify.dto.OTPRequestDTO;
import com.nexverify.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/send-otp")
    public ResponseEntity<Map<String, String>> sendOTP(@Valid @RequestBody OTPRequestDTO request) {
        authService.sendOTP(request.getPhoneNumber());

        return ResponseEntity.ok(Map.of(
                "message", "OTP sent successfully",
                "phoneNumber", request.getPhoneNumber()
        ));
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<AuthResponseDTO> verifyOTP(@Valid @RequestBody AuthRequestDTO request) {
        AuthResponseDTO response = authService.verifyOTP(request);
        return ResponseEntity.ok(response);
    }

//    @PostMapping("/refresh-token")
//    public ResponseEntity<AuthResponseDTO> refreshToken(@RequestBody Map<String, String> request) {
//        String refreshToken = request.get("refreshToken");
//        AuthResponseDTO response = authService.refreshToken(refreshToken);
//        return ResponseEntity.ok(response);
//    }

    @PostMapping("/logout")
    public ResponseEntity<Map<String, String>> logout() {
        return ResponseEntity.ok(Map.of(
                "message", "Logged out successfully"
        ));
    }
}