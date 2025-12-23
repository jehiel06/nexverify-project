package com.nexverify.repo;

import com.nexverify.model.UserWallet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface UserWalletRepository extends JpaRepository<UserWallet, UUID> {
    @Modifying
    @Query("UPDATE UserWallet w SET w.balance = w.balance + :points WHERE w.userId = :userId")
    int addPoints(@Param("userId") UUID userId, @Param("points") Integer points);

    @Modifying
    @Query("UPDATE UserWallet w SET w.tier = :tier WHERE w.userId = :userId")
    int updateTier(@Param("userId") UUID userId, @Param("tier") UserWallet.Tier tier);
}
