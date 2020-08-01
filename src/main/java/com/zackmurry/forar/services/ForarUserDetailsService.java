package com.zackmurry.forar.services;

import com.zackmurry.forar.dao.user.UserRepository;
import com.zackmurry.forar.models.ForarUserDetails;
import com.zackmurry.forar.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.Optional;

public class ForarUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> optionalUser = userRepository.findUserByName(username);
        optionalUser.orElseThrow(() -> new UsernameNotFoundException("Username not found " + username + "."));
        return optionalUser.map(ForarUserDetails::new).get();
    }


}
