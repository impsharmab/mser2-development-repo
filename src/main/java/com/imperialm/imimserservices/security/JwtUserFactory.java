package com.imperialm.imimserservices.security;

import com.imperialm.imimserservices.dto.UserDetailsImpl;
import com.imperialm.imimserservices.entities.User;

public final class JwtUserFactory {

    private JwtUserFactory() {
    }

    public static UserDetailsImpl create(User user) {
        return new UserDetailsImpl(user);
    }
}
