package com.imperialm.imimserservices.services;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import com.imperialm.imimserservices.entities.User;

public interface UserService {
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException;
	public User getByUsername(String username) throws UsernameNotFoundException;
}
