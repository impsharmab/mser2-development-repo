package com.imperialm.imimserservices.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.imperialm.imimserservices.dto.UserDetailsImpl;
import com.imperialm.imimserservices.entities.User;
import com.imperialm.imimserservices.repositories.UserRepository;

//@Service("userService")
@Component("UserServiceImpl")
@Transactional(propagation=Propagation.SUPPORTS, readOnly=true)
public class UserServiceImpl implements UserDetailsService {
	private UserRepository userRepository;
	private PasswordEncoder passwordEncoder;
	
	
	@Autowired
	public UserServiceImpl (UserRepository userRepository, PasswordEncoder passwordEncoder){
		this.userRepository = userRepository;
		this.passwordEncoder = passwordEncoder;
	}
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException{
		User user = userRepository.findByUserId(username);
		if(user == null) throw new UsernameNotFoundException(username);
		//Optional<User> user;
        //       user = userRepository.findByUserId(username);
		//if(!user.isPresent()) throw new UsernameNotFoundException(username);
		return new UserDetailsImpl(user);
	}
	
	public User getByUsername(String username) throws UsernameNotFoundException{
		User user = userRepository.findByUserId(username);
		if(user == null) throw new UsernameNotFoundException(username);
		return user;
	}
}
