package com.nexverify.service;

import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
@Slf4j
public class OTPService {

    private final Map<String, OTPData> otpStore = new ConcurrentHashMap<>();

    private static class OTPData {
        String otp;
        LocalDateTime createdAt;
        int attempts;
        boolean verified;

        OTPData(String otp) {
            this.otp = otp;
            this.createdAt = LocalDateTime.now();
            this.attempts = 0;
            this.verified = false;
        }
    }

    public String generateOTP(String phoneNumber) {
        String cleanedPhone = cleanPhoneNumber(phoneNumber);
        log.debug("Generating OTP for cleaned phone: {}", cleanedPhone);

        String otp = RandomStringUtils.randomNumeric(6);
        log.info("Generated OTP {} for phone: {}", otp, cleanedPhone);

        otpStore.put(cleanedPhone, new OTPData(otp));
        log.debug("OTP stored. Current store size: {}", otpStore.size());

        System.out.println("[DEBUG] OTP for " + cleanedPhone + " is: " + otp);
        System.out.println("[MOCK SMS] To: " + cleanedPhone + " | OTP: " + otp);

        return otp;
    }

    public boolean verifyOTP(String phoneNumber, String userOtp) {
        String cleanedPhone = cleanPhoneNumber(phoneNumber);
        log.debug("Verifying OTP for cleaned phone: {}, OTP provided: {}", cleanedPhone, userOtp);

        OTPData otpData = otpStore.get(cleanedPhone);

        if (otpData == null) {
            log.error("No OTP found for phone: {}. Available phones: {}", cleanedPhone, otpStore.keySet());
            return false;
        }

        log.debug("Found OTP data: {}", otpData.otp);

        if (otpData.createdAt.plusMinutes(5).isBefore(LocalDateTime.now())) {
            otpStore.remove(cleanedPhone);
            log.warn("OTP expired for phone: {}", cleanedPhone);
            return false;
        }

        if (otpData.attempts >= 3) {
            otpStore.remove(cleanedPhone);
            log.warn("Max attempts reached for phone: {}", cleanedPhone);
            return false;
        }

        otpData.attempts++;
        log.debug("Attempt #{} for phone: {}", otpData.attempts, cleanedPhone);

        boolean isValid = otpData.otp.equals(userOtp);
        if (isValid) {
            otpData.verified = true;
            log.info("OTP verified successfully for phone: {}", cleanedPhone);
        } else {
            log.warn("OTP mismatch. Expected: {}, Got: {}", otpData.otp, userOtp);
        }

        return isValid;
    }

    public void clearOTP(String phoneNumber) {
        String cleanedPhone = cleanPhoneNumber(phoneNumber);
        otpStore.remove(cleanedPhone);
        log.debug("Cleared OTP for phone: {}", cleanedPhone);
    }

    public boolean isOTPVerified(String phoneNumber) {
        String cleanedPhone = cleanPhoneNumber(phoneNumber);
        OTPData otpData = otpStore.get(cleanedPhone);
        boolean verified = otpData != null && otpData.verified;
        log.debug("Is OTP verified for {}: {}", cleanedPhone, verified);
        return verified;
    }

    private String cleanPhoneNumber(String phoneNumber) {
        String cleaned = phoneNumber.replaceAll("[^0-9]", "");
        log.debug("Cleaned phone: {} -> {}", phoneNumber, cleaned);
        return cleaned;
    }

    public void debugOTPStore() {
        log.info("=== OTP Store Debug ===");
        log.info("Total OTPs stored: {}", otpStore.size());
        otpStore.forEach((phone, data) -> {
            log.info("Phone: {}, OTP: {}, Created: {}, Attempts: {}, Verified: {}",
                    phone, data.otp, data.createdAt, data.attempts, data.verified);
        });
        log.info("======================");
    }
}