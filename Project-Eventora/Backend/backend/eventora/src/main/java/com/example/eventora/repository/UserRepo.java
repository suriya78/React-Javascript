package com.example.eventora.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.eventora.model.Users;

@Repository
public interface UserRepo extends JpaRepository<Users,Long>{
    
    Users findByUserNameAndPassword(String userName, String password);
    
}
