package com.nexverify.repo;

import com.nexverify.model.FraudLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface FraudLogRepository extends JpaRepository<FraudLog, UUID> {
}
