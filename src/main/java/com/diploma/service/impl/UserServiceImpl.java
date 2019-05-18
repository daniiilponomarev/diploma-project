package com.diploma.service.impl;

import com.diploma.model.User;
import com.diploma.model.UserRole;
import com.diploma.service.UserService;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class UserServiceImpl implements UserService {
	private static List<User> users = Collections.synchronizedList(new ArrayList<>(
			Arrays.asList(new User("admin", "admin", UserRole.ADMIN), new User("user", "user", UserRole.USER))));

//	@Override
//	public void registerUser(User user) {
//		synchronized (users) {
//			users.add(user);
//		}
//	}

	@Override
	public User getFullUser(User incompleteUser) {
		Optional<User> fullUser = users.stream().filter(user -> user.equalsUsernameAndPasswordWith(incompleteUser))
				.findFirst();
		return fullUser.orElse(null);
	}

	@Override
	public List<User> getAllUsers() {
		List<User> unmodifiableList = null;
		synchronized (users) {
			unmodifiableList = Collections.unmodifiableList(users);
		}
		return unmodifiableList;
	}

}
