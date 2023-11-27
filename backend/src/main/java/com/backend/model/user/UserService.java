package com.backend.model.user;

import com.backend.model.user.dto.UserInputDTO;
import com.backend.convert.ConvertDtoToEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {


    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ConvertDtoToEntity userConvert;

//    public UserDTO getUserById(Long id) {
//        User user = userRepository.findById(id).orElseThrow(() -> new ResponseStatusException(
//                HttpStatus.NOT_FOUND, "юзер не найден "));
//        UserDTO userDTO = userConvert.convertUserToUserDto(user);
//        return userDTO;
//    }


    public UserInputDTO createUser(UserInputDTO userDTO){
        User user = userConvert.userToEntity(userDTO);
        userRepository.save(user);
        return userDTO;
    }
}
