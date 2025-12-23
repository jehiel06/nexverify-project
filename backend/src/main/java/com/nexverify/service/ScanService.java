package com.nexverify.service;

import com.nexverify.dto.ScanRequestDTO;
import com.nexverify.dto.ScanResponseDTO;
import com.nexverify.model.FraudLog;
import com.nexverify.model.ProductItem;
import com.nexverify.model.User;
import com.nexverify.model.UserWallet;
import com.nexverify.repo.FraudLogRepository;
import com.nexverify.repo.ProductItemRepository;
import com.nexverify.repo.UserRepository;
import com.nexverify.repo.UserWalletRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class ScanService {
    private final ProductItemRepository productItemRepository;
    private final UserRepository userRepository;
    private final UserWalletRepository userWalletRepository;
    private final FraudLogRepository fraudLogRepository;

    @Value("${app.qr.points.success:50}")
    private Integer points;

    @Transactional
    public ScanResponseDTO processScan(ScanRequestDTO request) {
        UUID productId  = UUID.fromString(request.getQrCodeId());
        UUID userId = UUID.fromString(request.getUserId());

        ProductItem productItem = productItemRepository.findActiveByIdForUpdate(productId)
                .orElse(null);

        if(productItem == null) {
            ProductItem claimedProd = productItemRepository.findById(productId).orElse(null);

            if(claimedProd != null && claimedProd.getStatus() == ProductItem.ItemStatus.CLAIMED) {
                logFraudAttempt(productId, userId, request.getLocation(), "Already claimed");
                return ScanResponseDTO.builder()
                        .success(false)
                        .message("This product was already scanned by another user")
                        .pointsAwarded(0)
                .build();
            }
            return ScanResponseDTO.builder()
                    .success(false)
                    .message("Invalid")
                    .pointsAwarded(0)
                    .build();
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User Not Found!"));

        productItem.setStatus(ProductItem.ItemStatus.CLAIMED);
        productItem.setClaimedBy(user);
        productItem.setClaimedAt(LocalDateTime.now());
        productItem.setScanLocation(request.getLocation());
        productItemRepository.save(productItem);

        UserWallet wallet = user.getWallet();
        if(wallet == null) {
            wallet = UserWallet.builder()
                    .user(user)
                    .balance(points)
                    .tier(UserWallet.Tier.BRONZE)
                    .build();
        } else {
            wallet.setBalance(wallet.getBalance() + points);
            updateUserTier(wallet);
        }

        userWalletRepository.save(wallet);

        log.info("Successfully processed scan. Product: {}, User: {}, Points: {}",
                productId, userId, points);

        return ScanResponseDTO.builder()
                .success(true)
                .message("Product Verified!" + points + " POints added.")
                .pointsAwarded(points)
                .totalBalance(wallet.getBalance())
                .scannedAt(LocalDateTime.now().toString())
                .productId(productId.toString())
                .build();
    }

    private void logFraudAttempt(UUID productId, UUID userId, Object location, String reason) {
        FraudLog fraudLog = FraudLog.builder()
                .productItem(productItemRepository.findById(productId).orElse(null))
                .user(userRepository.findById(userId).orElse(null))
                .location((java.util.Map<String, Object>) location)
                .reason(reason)
                .build();

        fraudLogRepository.save(fraudLog);
        log.warn("Fraud attempt detected. Product: {}, User: {}, Reason: {}",
                productId, userId, reason);
    }

    private void updateUserTier(UserWallet wallet) {
        int balance = wallet.getBalance();

        if(balance >= 1000) {
            wallet.setTier(UserWallet.Tier.GOLD);
        } else if (balance >= 500) {
            wallet.setTier(UserWallet.Tier.SILVER);
        } else {
            wallet.setTier(UserWallet.Tier.BRONZE);
        }
    }
}
