package com.nexverify.service;

import com.nexverify.dto.AuthRequestDTO;
import com.nexverify.dto.AuthResponseDTO;
import com.nexverify.model.User;
import com.nexverify.model.UserWallet;
import com.nexverify.repo.UserRepository;
import com.nexverify.repo.UserWalletRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthService {

    private final UserRepository userRepository;
    private final UserWalletRepository userWalletRepository;
    private final OTPService otpService;
    private final JWTService jwtService;

    @Transactional
    public void sendOTP(String phoneNumber) {
        String cleanedPhone = cleanPhoneNumber(phoneNumber);
        log.info("Sending OTP to phone: {} (cleaned: {})", phoneNumber, cleanedPhone);

        otpService.generateOTP(phoneNumber);
        otpService.debugOTPStore(); // Debug

        log.info("OTP sent to: {}", cleanedPhone);
    }

    @Transactional
    public AuthResponseDTO verifyOTP(AuthRequestDTO request) {
        String phoneNumber = request.getPhoneNumber();
        String otp = request.getOtp();

        log.info("Verifying OTP for phone: {}, OTP: {}", phoneNumber, otp);

        // Debug before verification
        otpService.debugOTPStore();

        // Verify OTP
        boolean isValid = otpService.verifyOTP(phoneNumber, otp);

        log.info("OTP verification result for {}: {}", phoneNumber, isValid);

        if (!isValid) {
            throw new RuntimeException("Invalid OTP or OTP expired. Please request a new OTP.");
        }

        // Check if user exists
        String cleanedPhone = cleanPhoneNumber(phoneNumber);
        Optional<User> existingUser = userRepository.findByPhoneNumber(cleanedPhone);
        User user;

        if (existingUser.isPresent()) {
            // Existing user - login
            user = existingUser.get();
            log.info("User logged in: {}", cleanedPhone);
        } else {
            log.info("Creating new user for phone: {}", cleanedPhone);
            user = createNewUser(cleanedPhone);
        }

        // Generate tokens
        String accessToken = jwtService.generateToken(user.getId(), cleanedPhone);
        String refreshToken = jwtService.generateRefreshToken(user.getId(), cleanedPhone);

        // Clear OTP after successful verification
        otpService.clearOTP(phoneNumber);

        log.info("Authentication successful for user: {}", user.getId());

        return AuthResponseDTO.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .userId(user.getId())
                .phoneNumber(user.getPhoneNumber())
                .isNewUser(!existingUser.isPresent())
                .message("Authentication successful")
                .build();
    }

    private User createNewUser(String phoneNumber) {
        User user = User.builder()
                .phoneNumber(phoneNumber)
                .fullName("User_" + phoneNumber.substring(phoneNumber.length() - 4))
                .build();

        user = userRepository.save(user);
        log.info("New user created with ID: {}", user.getId());

        // Create wallet for new user
        UserWallet wallet = UserWallet.builder()
                .user(user)
                .balance(0)
                .tier(UserWallet.Tier.BRONZE)
                .build();

        userWalletRepository.save(wallet);
        log.info("Wallet created for user: {}", user.getId());

        return user;
    }

    private String cleanPhoneNumber(String phoneNumber) {
        return phoneNumber.replaceAll("[^0-9]", "");
    }
}