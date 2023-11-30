package com.backend.model.role;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class RoleInit implements CommandLineRunner {

    @Autowired
    private RoleRepository roleRepository;

    @Override
    public void run(String... args) throws Exception {
        if (!roleRepository.existsByName("SUPERADMIN")){
            roleRepository.save(new Role("SUPERADMIN"));
        }
        if (!roleRepository.existsByName("ADMIN")){
            roleRepository.save(new Role("ADMIN"));
        }
        if (!roleRepository.existsByName("TEACHER")){
            roleRepository.save(new Role("TEACHER"));
        }
    }
}
