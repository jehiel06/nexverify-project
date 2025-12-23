package com.nexverify.repo;

import com.nexverify.model.ProductItem;
import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface ProductItemRepository extends JpaRepository<ProductItem, UUID> {
    List<ProductItem> findByBatchId(String batchId);
    List<ProductItem> findByStatus(ProductItem.ItemStatus status);
    List<ProductItem> findByClaimedById(UUID userID);

    @Query("SELECT p FROM ProductItem p WHERE p.id = :id AND p.status = 'ACTIVE'")
    Optional<ProductItem> findActiveById(@Param("id") UUID id);

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT p FROM ProductItem p WHERE p.id = :id AND p.status = 'ACTIVE'")
    Optional<ProductItem> findActiveByIdForUpdate(@Param("id") UUID id);

    @Modifying
    @Query("UPDATE ProductItem p SET p.status = :status WHERE p.id = :id")
    int updateStatus(@Param("id") UUID id, @Param("status") ProductItem.ItemStatus status);

    @Query("SELECT COUNT(p) FROM ProductItem p WHERE p.status = :status")
    long countByStatus(@Param("status") ProductItem.ItemStatus status);

    @Modifying
    @Query("UPDATE ProductItem p SET p.status = :status WHERE p.batchId = :batchId")
    int updateBatchStatus(@Param("batchId") String batchId, @Param("status") ProductItem.ItemStatus status);
}
