package com.backend.model.user;

import com.backend.convert.ConvertEntityToDto;
import com.backend.model.role.RoleRepository;
import com.backend.model.university.University;
import com.backend.model.university.UniversityRepository;
import com.backend.model.user.dto.UserAuthDTO;
import com.backend.model.user.dto.UserInputDTO;
import com.backend.convert.ConvertDtoToEntity;
import com.backend.model.user.dto.UserOutputDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class UserService {


    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UniversityRepository universityRepository;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private ConvertDtoToEntity convertDtoToEntity;
    @Autowired
    private ConvertEntityToDto convertEntityToDto;

    public List<UserOutputDTO> getAllTeacher(Long universityId) {
        List<User> users = userRepository.findByUniversityId(universityId);
        return users.stream().map(convertEntityToDto::userToDto).toList();
    }

    public UserOutputDTO getUserInfo(Long userId) {
        User user = userRepository.findById(userId).get();
        return convertEntityToDto.userToDto(user);
    }

    public ResponseEntity<Void> createUser(UserInputDTO userDTO){
        User user = convertDtoToEntity.userToEntity(userDTO);
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        user.setPassword(encoder.encode(user.getPassword()));
        University university = universityRepository.findById(userDTO.getUniversityId()).get();
        user.setUniversity(university);
        user.setRole(roleRepository.findByName(userDTO.getRole()));
        userRepository.save(user);
        return new ResponseEntity<>(HttpStatusCode.valueOf(200));
    }

    public UserOutputDTO authUser(UserAuthDTO userAuthDTO){
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        User user = userRepository.findByEmail(userAuthDTO.getEmail());

        if (encoder.matches(userAuthDTO.getPassword(), user.getPassword())){
            UserOutputDTO userOutputDTO = convertEntityToDto.userToDto(user);
            userOutputDTO.setRole(user.getRole().getName());
            if(userAuthDTO.getPassword().equals("superadmin")){
                return userOutputDTO;
            }
            userOutputDTO.setUniversityId(user.getUniversity().getId());
            return userOutputDTO;
        } else {
            throw new ResponseStatusException(HttpStatusCode.valueOf(403), "пароль не верный");
        }
    }
}
