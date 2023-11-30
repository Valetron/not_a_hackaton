package com.backend.model.role;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends JpaRepository<Role,Long> {

    boolean existsByName(String name);
    Role findByName(String name);
}
