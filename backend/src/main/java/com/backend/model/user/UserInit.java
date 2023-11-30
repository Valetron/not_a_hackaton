package com.backend.model.user;

import com.backend.model.role.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class UserInit implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;

    @Override
    public void run(String... args) throws Exception {
        if(!(userRepository.existsById(1L))){
            User user = new User();
            user.setEmail("superadmin");
            user.setName("SUPERADMIN");
            BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
            user.setPassword(encoder.encode("superadmin"));
            user.setRole(roleRepository.findById(1L).get());
            userRepository.save(user);
        }
    }
}
