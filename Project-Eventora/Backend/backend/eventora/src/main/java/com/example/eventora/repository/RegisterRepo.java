package com.example.eventora.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.eventora.model.Register;

public interface RegisterRepo extends JpaRepository<Register, Long> {

    // Check if a user is already registered for a specific event
    boolean existsByEventIdAndUserId(Long eventId, Long userId);

    // Count how many users are registered for a specific event
    int countByEventId(Long eventId);
}
