package com.zackmurry.forar.services;

import com.zackmurry.forar.dao.user.UserRepository;
import com.zackmurry.forar.models.ForarUserDetails;
import com.zackmurry.forar.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ForarUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        System.out.println(username);
        Optional<User> optionalUser = userRepository.findUserByUsername(username);
        optionalUser.orElseThrow(() -> new UsernameNotFoundException("Username not found " + username + "."));
        return optionalUser.map(ForarUserDetails::new).get();
    }


}
