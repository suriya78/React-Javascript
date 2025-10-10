package com.example.eventora.service;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.eventora.model.Users;
import com.example.eventora.repository.UserRepo;

@Service
public class UserService {

    @Autowired
    private UserRepo userRepo;

    public Users addUser(Users user) {
        return userRepo.save(user);
    }

    public Users getUser(String userName, String password) {
        return userRepo.findByUserNameAndPassword(userName, password);
    
    }

    public Users getUserById(Long id) {
        return userRepo.findById(id).orElse(null);
    }

   

    public Users saveUser(Users user) {
        return userRepo.save(user);
    }
    
    

    public List<Users> getAllUsers() {
        return userRepo.findAll();
    }

    
    public void deleteUserById(Long id) {
        try {
            if (userRepo.existsById(id)) {
                userRepo.deleteById(id);
            } else {
                throw new RuntimeException("User with ID " + id + " does not exist.");
            }
        } catch (Exception e) {
           
            throw new RuntimeException("Failed to delete user with ID: " + id, e);
        }
    }


}